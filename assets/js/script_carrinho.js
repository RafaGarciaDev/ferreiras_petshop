 
    document.addEventListener('DOMContentLoaded', function() {
      const productSwiper = new Swiper('.product-swiper', {
        // Opções do Swiper
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }
      });
    });
  
  // Carrinho de compras - Versão completa com ID de produto
  document.addEventListener("DOMContentLoaded", function() {
      inicializarCarrinho();
  });





  
  
  function inicializarCarrinho() {
      atualizarBadgeCarrinho();
      
      if (window.location.href.includes("carrinho.html")) {
          atualizarCarrinho();
      }
  
      document.querySelectorAll(".card-action-btn").forEach(botao => {
          botao.addEventListener("click", adicionarProdutoAoCarrinho);
      });
  
      document.querySelectorAll(".action-btn[aria-label='carrinho']").forEach(botao => {
          botao.addEventListener("click", redirecionarParaCarrinho);
      });
  
      document.querySelector("#finalizar-compra")?.addEventListener("click", finalizarCompra);
  }
  





  function adicionarProdutoAoCarrinho() {
    // Encontra o product-card subindo na hierarquia
    let produto = this.closest('.product-card');
    
    if (!produto) {
        const li = this.closest('li');
        if (li) {
            produto = li.querySelector('.product-card');
        }
    }
    
    if (!produto) {
        console.error("Elemento do produto não encontrado");
        return;
    }

    // Captura os dados do produto - agora usando data-product-id
    const id = produto.getAttribute('data-product-id') || produto.getAttribute('data-id');
    const nomeElement = produto.querySelector('.card-title');
    const precoElement = produto.querySelector('.card-price');
    
    if (!id || id.toString().trim() === '' || id === 'null' || id === 'undefined') {
        console.error("ID do produto inválido:", id);
        mostrarFeedback("Erro: Produto sem ID válido", "error");
        return;
    }
    
    if (!nomeElement || !precoElement) {
        console.error("Dados do produto incompletos", {id, nomeElement, precoElement});
        return;
    }
    
    // Pega o primeiro título (no caso de ter múltiplos)
    const nome = nomeElement.textContent.trim();
    const precoTexto = precoElement.textContent.trim();
    const preco = parseFloatBr(precoTexto);
    
    if (isNaN(preco)) {
        console.error("Preço inválido:", precoTexto);
        return;
    }

    console.log("Produto adicionado:", {id, nome, preco});
    adicionarAoCarrinho(id, nome, preco);
}



  
  function parseFloatBr(valor) {
    // Converte string de preço brasileiro (R$ 12,34) para número (12.34)
    if (typeof valor === 'number') return valor;
    
    return parseFloat(
        valor.toString()
            .replace("R$", "")
            .replace(/\./g, "")  // Remove todos os pontos
            .replace(",", ".")
            .trim()
    ) / 100; // Divide por 100 para corrigir a multiplicação excessiva
  }





  
  function formatarMoedaBr(valor) {
    // Converte número para string no padrão brasileiro (R$ 12,34)
    if (typeof valor === 'string') {
        valor = parseFloatBr(valor);
    }
    
    // Formata com 2 casas decimais e separadores corretos
    return "R$ " + valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
  }





  
  function adicionarAoCarrinho(id, nome, preco) {
    // Garante que o ID seja uma string não vazia
    if (!id || id.toString().trim() === '') {
        console.error("ID do produto inválido:", id);
        mostrarFeedback("Erro: Produto sem ID válido", "error");
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const precoNumerico = typeof preco === 'number' ? preco : parseFloatBr(preco);
    
    // Padroniza o ID como string
    const produtoId = id.toString().trim();

    // Verifica se o produto já está no carrinho pelo ID
    const produtoExistente = carrinho.find(item => item.id.toString() === produtoId);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            id: produtoId, // Armazena o ID do produto como string
            nome: nome,
            preco: precoNumerico,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarBadgeCarrinho();
    mostrarFeedback("Produto adicionado ao carrinho!");
}



  
  function removerDoCarrinho(index) {
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      
      if (index >= 0 && index < carrinho.length) {
          if (carrinho[index].quantidade > 1) {
              carrinho[index].quantidade--;
          } else {
              carrinho.splice(index, 1);
          }
          
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          atualizarCarrinho();
          atualizarBadgeCarrinho();
      }
  }
  




  function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const listaCarrinho = document.querySelector(".itens-carrinho");
    const totalPreco = document.querySelector("#total-preco");

    if (!listaCarrinho) return;

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
        if (totalPreco) totalPreco.textContent = formatarMoedaBr(0);
        return;
    }

    let total = 0;
    carrinho.forEach((item, index) => {
        const preco = typeof item.preco === 'number' ? item.preco : 0;
        total += preco * item.quantidade;

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="cart-item">
                <span class="cart-item-name">${item.nome}</span>
                <span class="cart-item-price">${formatarMoedaBr(preco)} × ${item.quantidade}</span>
                <button class="remover-item" data-index="${index}">Remover</button>
            </div>
            <div class="cart-item-subtotal">
                Subtotal: ${formatarMoedaBr(preco * item.quantidade)}
            </div>
        `;
        listaCarrinho.appendChild(li);
    });

    if (totalPreco) {
        totalPreco.textContent = formatarMoedaBr(total);
    }

    document.querySelectorAll(".remover-item").forEach(botao => {
        botao.addEventListener("click", function() {
            const index = parseInt(this.getAttribute("data-index"));
            if (!isNaN(index)) {
                removerDoCarrinho(index);
            }
        });
    });
  }



  
  function atualizarBadgeCarrinho() {
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
      
      document.querySelectorAll(".btn-badge").forEach(badge => {
          badge.textContent = totalItens;
      });
  }


  
  async function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    if (carrinho.length === 0) {
        mostrarFeedback("Seu carrinho está vazio!", "error");
        return;
    }

    // Verificação robusta dos IDs
    const itensInvalidos = carrinho.some(item => {
        return !item.id || item.id.toString().trim() === '' || item.id === 'null' || item.id === 'undefined';
    });

    if (itensInvalidos) {
        mostrarFeedback("Erro: Alguns produtos não têm ID válido", "error");
        return;
    }

    try {
        // Prepara os dados garantindo que produto_id seja enviado
        const itensVenda = carrinho.map(item => ({
            produto_id: item.id.toString(), // Força como string
            nome: item.nome,
            preco_unitario: item.preco,
            quantidade: item.quantidade,
            subtotal: item.preco * item.quantidade
        }));

        const total = itensVenda.reduce((sum, item) => sum + item.subtotal, 0);
        
        const dadosEnvio = {
            itens: itensVenda,
            total: total,
            status: "pendente"
        };

        const response = await fetch('http://localhost:3000/api/vendas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosEnvio)
        });if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMsg = errorData?.message || `Erro ${response.status}: ${response.statusText}`;
            throw new Error(errorMsg);
        }

        const resultado = await response.json();
        
        if (resultado && resultado.success) {
            mostrarFeedback(`Compra #${resultado.numeroPedido} finalizada com sucesso!`);
            localStorage.removeItem("carrinho");
            atualizarCarrinho();
            atualizarBadgeCarrinho();
            
            if (resultado.urlConfirmacao) {
                setTimeout(() => {
                    window.location.href = resultado.urlConfirmacao;
                }, 2000);
            }
        } else {
            throw new Error(resultado?.message || 'Resposta inválida do servidor');
        }
    } catch (error) {
        console.error('Erro na finalização:', error);
        
        let mensagemErro = error.message;
        if (error.message.includes("500")) {
            mensagemErro = "Erro no servidor. Por favor, tente novamente mais tarde.";
        } else if (error.message.includes("401")) {
            mensagemErro = "Autenticação necessária. Faça login para continuar.";
        } else if (error.message.includes("400")) {
            mensagemErro = "Dados inválidos. Verifique os itens do carrinho.";
        }
        
        mostrarFeedback(mensagemErro, "error");
        
        if (!localStorage.getItem("carrinhoBackup")) {
            localStorage.setItem("carrinhoBackup", localStorage.getItem("carrinho"));
        }
    }
}

     



  
  function mostrarFeedback(mensagem, tipo = "success") {
      const feedback = document.createElement("div");
      feedback.textContent = mensagem;
      feedback.style.position = "fixed";
      feedback.style.bottom = "20px";
      feedback.style.right = "20px";
      feedback.style.backgroundColor = tipo === "success" ? "#4CAF50" : "#f44336";
      feedback.style.color = "white";
      feedback.style.padding = "10px 20px";
      feedback.style.borderRadius = "5px";
      feedback.style.zIndex = "1000";
      feedback.style.transition = "opacity 0.5s";
      document.body.appendChild(feedback);
      
      setTimeout(() => {
          feedback.style.opacity = "0";
          setTimeout(() => document.body.removeChild(feedback), 500);
      }, 2000);
  }





  
  function redirecionarParaCarrinho(e) {
      if (!window.location.href.includes("carrinho.html")) {
          e.preventDefault();
          window.location.href = "carrinho.html";
      }
  }
  





  function redirectToWhatsApp() {
      window.location.href = "https://wa.me/5519994230629?text=%20Olá!%20Somos%20da%20Ferreira's%20Petshop!";
  }

