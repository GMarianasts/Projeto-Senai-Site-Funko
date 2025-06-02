document.addEventListener('DOMContentLoaded', () => {
    // --- Código para adicionar ao carrinho ---
    const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function() {
            const produtoId = this.dataset.id;
            const produtoNome = this.dataset.nome;
            const produtoPreco = parseFloat(this.dataset.preco);
            const produtoImagem = this.dataset.imagem;

            const itemCarrinho = {
                id: produtoId,
                nome: produtoNome,
                preco: produtoPreco,
                imagem: produtoImagem,
                quantidade: 1  // Inicialmente, adicionamos 1 item
            };

            let carrinho = localStorage.getItem('carrinho');
            carrinho = carrinho ? JSON.parse(carrinho) : [];

              // Verifica se o item já existe no carrinho
            const itemExistente = carrinho.find(item => item.id === produtoId);

            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                carrinho.push(itemCarrinho);
            }

            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            alert(`${produtoNome} adicionado ao carrinho!`);  // Feedback para o usuário
        });
    });






    // --- Código para a barra de pesquisa ---
     const searchInput = document.getElementById('search'); //searchInput: Seleciona o input da barra de pesquisa usando o ID search.
    const productContainer = document.querySelector('.grid-container'); // Seleciona o contêiner dos produtos
    const products = productContainer.querySelectorAll('figure'); // Seleciona todas as 'figure' (os produtos)

    searchInput.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.toLowerCase(); // Termo de pesquisa em minúsculas

        products.forEach(product => {
            // Pega o texto do <strong>, que é o nome do produto
            const productNameElement = product.querySelector('strong');
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase(); //Pega o texto do productNameElement e também o converte para minúsculas.

               if (productName.includes(searchTerm)) {
                    product.style.visibility = 'visible';
                    product.style.position = 'static'; // Garante que o elemento ocupe o espaço normalmente
                    product.style.width = 'auto'; // Garante que a largura volte ao normal se foi alterada
                    product.style.height = 'auto'; // Garante que a altura volte ao normal se foi alterada
                    product.style.overflow = 'visible'; // Garante que o conteúdo seja visível

                } else {
                    product.style.visibility = 'hidden';
                    // Para que os itens escondidos ainda ocupem espaço e não quebrem o grid,
                    // mas não sejam interativos.
                    product.style.position = 'absolute'; // Remove do fluxo, mas ainda ocupa espaço visual
                    product.style.width = '0px'; // Reduz a largura para 0
                    product.style.height = '0px'; // Reduz a altura para 0
                    product.style.overflow = 'hidden'; // Esconde qualquer conteúdo que transborde
                }
            }
        });
    });
});


