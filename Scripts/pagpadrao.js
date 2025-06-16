
            const zoomImage = document.querySelector('.zoom-image');
            const container = document.querySelector('.zoom-container');

            container.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = container.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;

                zoomImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                zoomImage.style.transform = 'scale(2)';
            });

            container.addEventListener('mouseleave', () => {
                zoomImage.style.transform = 'scale(1)';
            });



            //Estrelas
            const ratings = { 5: 150, 4: 63, 3: 15, 2: 6, 1: 20 };

            function calculateAverage() {
                const totalVotes = Object.values(ratings).reduce((a, b) => a + b, 0);
                const totalScore = Object.entries(ratings).reduce((sum, [stars, count]) => sum + stars * count, 0);
                return (totalScore / totalVotes).toFixed(1);
            }

            function renderStars() {
                const avg = calculateAverage();
                const container = document.getElementById('starRating');
                container.innerHTML = '';
                for (let i = 1; i <= 5; i++) {
                    const star = document.createElement('span');
                    star.innerHTML = (i <= Math.round(avg)) ? '★' : '☆';
                    star.classList.add('star');
                    if (i <= avg) star.classList.add('filled');
                    star.onclick = () => {
                        ratings[i]++;
                        render();
                    };
                    container.appendChild(star);
                }
            }

            function renderSummary() {
                const container = document.getElementById('ratingSummary');
                container.innerHTML = '';
                const total = Object.values(ratings).reduce((a, b) => a + b, 0);

                for (let i = 5; i >= 1; i--) {
                    const percent = (ratings[i] / total) * 100;
                    const row = document.createElement('div');
                    row.classList.add('row');

                    row.innerHTML = `
                  <div style="width: 50px;">${i} star</div>
                  <div class="bar" style="flex:1; margin: 0 10px;">
                      <div class="bar-fill bar-${i}" style="width:${percent}%;"></div>
                  </div>
                  <div>${ratings[i]}</div>
              `;
                    container.appendChild(row);
                }
            }

            function render() {
                renderStars();
                renderSummary();
                document.getElementById('averageRating').innerText =
                    `${calculateAverage()} average based on ${Object.values(ratings).reduce((a, b) => a + b, 0)} reviews.`;
            }

            render();




            // Função para obter o ID da URL
            function obterIdProduto() {
                const params = new URLSearchParams(window.location.search);
                return params.get('id');
            }

            async function carregarProduto() {
                const id = obterIdProduto();

                try {
                    const resposta = await fetch("produtos.json");
                    const produtos = await resposta.json();
                    const produto = produtos.find(p => p.id === id);

                    if (!produto) {
                        document.body.innerHTML = "<h2>Produto não encontrado.</h2>";
                        return;
                    }

                    // Atualiza a imagem
                    document.querySelector(".zoom-image").src = produto.imagem;

                    // Atualiza o nome, preço e descrição
                    document.querySelector(".info-container .card-descricao").innerHTML = `
                        <div class="info-container">
                            <div class="card-descricao">
                                
                                <strong style="font-size: 35px;">
                                ${produto.nome}
                                <br>
                                <span style="margin: 15px">R$${produto.preco.toFixed(2)}</span>
                                </strong>

                                <div>
                                <button type="button" class="adicionar-carrinho" data-id="${produto.id}" data-nome="${produto.nome}"
                                    data-preco="${produto.preco}" data-imagem="${produto.imagem}">
                                    Adicionar ao Carrinho</button>
                                </div>
                                <br><br>
                                <img src="Icons/fretegratis.png" alt="Frete Grátis" width="700px">
                                <br><br>
                                <div class="descricao" style="font-size: 25px;">
                                <p>
                                    ${produto.descricao}
                                    <br>
                                    
                                </p>
                                </div>
                           
                        </div>
                    </div>`;

                    // Agora o botão já existe, podemos adicionar o listener
                    const botaoAdicionar = document.querySelector('.adicionar-carrinho');

                    botaoAdicionar.addEventListener('click', function () {
                        const produtoId = this.dataset.id;
                        const produtoNome = this.dataset.nome;
                        const produtoPreco = parseFloat(this.dataset.preco);
                        const produtoImagem = this.dataset.imagem;

                        const itemCarrinho = {
                            id: produtoId,
                            nome: produtoNome,
                            preco: produtoPreco,
                            imagem: produtoImagem,
                            quantidade: 1
                        };

                        let carrinho = localStorage.getItem('carrinho');
                        carrinho = carrinho ? JSON.parse(carrinho) : [];

                        const itemExistente = carrinho.find(item => item.id === produtoId);

                        if (itemExistente) {
                            itemExistente.quantidade++;
                        } else {
                            carrinho.push(itemCarrinho);
                        }

                        localStorage.setItem('carrinho', JSON.stringify(carrinho));
                        /*alert(`${produtoNome} adicionado ao carrinho!`);*/
                    });

                } catch (erro) {
                    console.error("Erro ao carregar produto:", erro);
                    document.body.innerHTML = "<h2>Erro ao carregar produto.</h2>";
                }
            }

            carregarProduto(); // Executa ao carregar a página


            document.addEventListener('DOMContentLoaded', () => {
                const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');

                botoesAdicionar.forEach(botao => {
                    botao.addEventListener('click', function () {
                        const produtoId = this.dataset.id;
                        const produtoNome = this.dataset.nome;
                        const produtoPreco = parseFloat(this.dataset.preco);
                        const produtoImagem = this.dataset.imagem;

                        const itemCarrinho = {
                            id: produtoId,
                            nome: produtoNome,
                            preco: produtoPreco,
                            imagem: produtoImagem,
                            quantidade: 1 // Inicialmente, adicionamos 1 item
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
                            (`${produtoNome} adicionado ao carrinho!`); // Feedback para o usuário
                    });
                });
            });