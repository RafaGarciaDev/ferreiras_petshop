
  document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.querySelector('.search-container');
  
    // Mostrar/ocultar campo de pesquisa ao clicar no botão
    if (searchBtn) {
      searchBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (searchContainer) searchContainer.classList.toggle('active'); // Mostra ou esconde o container de pesquisa
        if (searchInput) {
          searchInput.classList.toggle('active');
          if (searchInput.classList.contains('active')) {
            searchInput.focus(); // Coloca o foco no campo
          } else {
            searchInput.value = ''; // Limpa o campo quando desativado
          }
        }
      });
    }
  
    // Fecha o campo de pesquisa ao clicar fora dele
    document.addEventListener('click', (e) => {
      if (searchContainer && !searchContainer.contains(e.target)) {
        searchContainer.classList.remove('active');
        if (searchInput) searchInput.classList.remove('active');
      }
    });
  });



document.addEventListener('DOMContentLoaded', function () {
  // Elementos da interface
  const searchBtn = document.querySelector('.search-btn');
  const searchContainer = document.querySelector('.search-container');
  const searchInput = document.getElementById('searchInput');
  const productGrid = document.querySelector('.grid-list'); // Alterado para classe pois não há ID productGrid
  
  // Verificar se estamos na página de produtos
  const isProductsPage = window.location.pathname.includes('produtos.html');

  // Função para normalizar texto (remove acentos e coloca em minúsculas)
  function normalizeText(text) {
    return text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Mostrar/ocultar campo de pesquisa
  if (searchBtn) {
    searchBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (searchContainer) searchContainer.classList.toggle('active');
      if (searchInput) searchInput.classList.toggle('active');

      if (searchInput && searchInput.classList.contains('active')) {
        searchInput.focus();
      } else if (searchInput) {
        searchInput.value = '';
        if (isProductsPage && productGrid) resetSearch();
      }
    });
  }

  // Função para resetar a busca (apenas na página de produtos)
  function resetSearch() {
    const products = productGrid.querySelectorAll('li');
    products.forEach(product => {
      product.style.display = 'block';
    });
    const noResultsMsg = productGrid.querySelector('#noResults');
    if (noResultsMsg) noResultsMsg.remove();
  }

  // Função principal de filtragem (apenas na página de produtos)
  function filterProducts() {
    if (!isProductsPage || !productGrid) return;

    const searchTerm = normalizeText(searchInput.value.trim());
    const products = productGrid.querySelectorAll('li');
    let hasResults = false;

    products.forEach(product => {
      if (product.id === 'noResults') return;

      const titles = product.querySelectorAll('.card-title');
      let matches = false;

      titles.forEach(title => {
        if (normalizeText(title.textContent).includes(searchTerm)) {
          matches = true;
        }
      });

      if (matches || !searchTerm) {
        product.style.display = 'block';
        hasResults = true;
      } else {
        product.style.display = 'none';
      }
    });

    // Mostrar mensagem se não houver resultados
    const noResultsMsg = productGrid.querySelector('#noResults');
    if (!hasResults && searchTerm) {
      if (!noResultsMsg) {
        const msg = document.createElement('li');
        msg.id = 'noResults';
        msg.style.gridColumn = '1 / -1';
        msg.style.textAlign = 'center';
        msg.style.padding = '2rem 0';
        msg.innerHTML = `
          <p style="font-size: 1.2rem; margin-bottom: 1rem;">
            Nenhum produto encontrado para "${searchInput.value}"
          </p>
          <button class="btn" onclick="resetSearch()">
            Limpar pesquisa
          </button>
        `;
        productGrid.appendChild(msg);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  // Evento de input com debounce (apenas na página de produtos)
  if (searchInput && isProductsPage) {
    let timeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(filterProducts, 300);
    });
  }

  // Redirecionar para produtos.html com parâmetro de busca ao pressionar Enter (na index)
  if (searchInput && !isProductsPage) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        const searchTerm = encodeURIComponent(searchInput.value.trim());
        if (searchTerm) {
          window.location.href = `produtos.html?search=${searchTerm}`;
        } else {
          window.location.href = 'produtos.html';
        }
      }
    });
  }

  // Fechar pesquisa ao clicar fora
  document.addEventListener('click', (e) => {
    if (searchContainer && !searchContainer.contains(e.target)) {
      searchContainer.classList.remove('active');
      if (searchInput) searchInput.classList.remove('active');
    }
  });

  // Filtro inicial se houver parâmetro de busca na URL (apenas na página de produtos)
  if (isProductsPage) {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');

    if (searchTerm && searchInput) {
      searchInput.value = searchTerm;
      filterProducts();
    }
  }

  // Função para localizar e destacar o produto com data-id
  function highlightProduct(productId) {
    if (!isProductsPage || !productGrid) return;

    const product = productGrid.querySelector(`[data-id="${productId}"]`);
    if (product) {
      product.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Rolagem suave
      product.style.outline = '2px solid #ff9800'; // Destaque visual
      setTimeout(() => {
        product.style.outline = ''; // Remove o destaque após alguns segundos
      }, 3000);
    } else {
      console.warn(`Produto com data-id "${productId}" não encontrado.`);
    }
  }

  // Exemplo: Ao carregar a página com ID de produto na URL
  if (isProductsPage) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('produtoId'); // Parâmetro de exemplo

    if (productId) {
      highlightProduct(productId);
    }
  }
});