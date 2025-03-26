const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Configuração do banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'Rafa',
  password: '2188',
  database: 'ferreiras_petshop',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// Middleware para tratamento de erros
app.use((req, res, next) => {
    console.log(`Recebida requisição: ${req.method} ${req.url}`);
    next();
});


// Função para processar preços de forma segura
function processarPreco(precoInput) {
    if (typeof precoInput === 'number') {
        return precoInput;
    }
    
    if (typeof precoInput === 'string') {
        // Remove caracteres não numéricos exceto vírgula e ponto
        const precoLimpo = precoInput
            .replace(/[^\d,.-]/g, '')
            .replace('.', '')
            .replace(',', '.');
        
        return parseFloat(precoLimpo) || 0;
    }
    
    return 0;
}




// Rota para processar vendas (modificada para incluir confirmação)
app.post('/api/vendas', async (req, res) => {
    console.log('Dados recebidos:', JSON.stringify(req.body, null, 2));
    let connection;
    try {
        if (!req.body || !req.body.itens || !Array.isArray(req.body.itens)) {
            return res.status(400).json({ 
                success: false,
                message: 'Dados inválidos: formato esperado { itens: [] }'
            });
        }

        connection = await pool.getConnection();
        await connection.beginTransaction();

        const itensProcessados = [];

        for (const item of req.body.itens) {
            if (!item || typeof item !== 'object' || !item.produto_id) {
                console.error('Item inválido:', item);
                continue;
            }

            // Verificar se o produto existe no banco
            const [produto] = await connection.execute(
                'SELECT id FROM produtos WHERE id = ?',
                [item.produto_id]
            );

            if (produto.length === 0) {
                console.error(`Produto com ID ${item.produto_id} não encontrado.`);
                return res.status(400).json({
                    success: false,
                    message: `Produto com ID ${item.produto_id} não existe no banco de dados`
                });
            }

            const preco = processarPreco(item.preco_unitario || item.preco);
            const quantidade = parseInt(item.quantidade) || 1;

            itensProcessados.push({
                produto_id: item.produto_id.toString(),
                nome: item.nome || 'Produto não especificado',
                preco_unitario: preco,
                quantidade: quantidade,
                subtotal: preco * quantidade
            });
        }

        if (itensProcessados.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Nenhum item válido no carrinho'
            });
        }

        const total = itensProcessados.reduce((sum, item) => sum + item.subtotal, 0);

        // Inserir venda principal
        const [vendaResult] = await connection.execute(
            'INSERT INTO vendas (data_venda, total, status) VALUES (NOW(), ?, "confirmado")',
            [total]
        );
        const vendaId = vendaResult.insertId;

        // Inserir itens da venda
        for (const item of itensProcessados) {
            await connection.execute(
                'INSERT INTO venda_itens (venda_id, produto_id, produto_nome, preco_unitario, quantidade, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
                [vendaId, item.produto_id, item.nome, item.preco_unitario, item.quantidade, item.subtotal]
            );
        }

        await connection.commit();
        
        res.json({
            success: true,
            message: 'Compra efetuada com sucesso!',
            numeroPedido: vendaId
        });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Erro no servidor:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno no servidor',
            error: error.message
        });
    } finally {
        if (connection) connection.release();
    }
});





// Você pode manter a rota de confirmação para consulta posterior se necessário
app.get('/api/vendas/:id', async (req, res) => {
    try {
        const [venda] = await pool.query(
            'SELECT * FROM vendas WHERE id = ?', 
            [req.params.id]
        );
        
        if (venda.length === 0) {
            return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
        }
        
        const [itens] = await pool.query(
            'SELECT * FROM venda_itens WHERE venda_id = ?',
            [req.params.id]
        );
        
        res.json({
            success: true,
            compra: {
                ...venda[0],
                itens: itens
            }
        });
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({ success: false, message: 'Erro ao buscar pedido' });
    }
});






// Health check
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).json({
            status: 'OK',
            database: 'Conectado'
        });
    } catch (error) {
        res.status(500).json({
            status: 'Erro',
            database: 'Desconectado'
        });
    }
});




// Middleware para erros 404
app.use((req, res) => {
    res.status(404).send('Rota não encontrada');
});




// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});