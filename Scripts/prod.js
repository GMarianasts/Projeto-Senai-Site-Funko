async function carregarProduto(idProduto, idElemento, imagemHover) {
    const resposta = await fetch("produtos.json");
    const produtos = await resposta.json();
    const produto = produtos.find(p => p.id === idProduto);

    

 
    if (!produto) {
        console.error(`Produto com ID ${idProduto} não encontrado.`);
        return;
    }

    const idsComDesconto = [ "005","007","011","019","025","027","034","035","036","037","038"]; // Produtos que terão selo de desconto
    const idsComLimitado = ["003","012","015","017","023"]
    const idsComAumento = ["004","030"]

    const seloDesconto = idsComDesconto.includes(produto.id)
        ? `<div class="desconto">15% OFF</div>`
        : '';
    const seloLimitado = idsComLimitado.includes(produto.id)
        ?`<div class="limitado">LIMITADO</div>`
        :"";
        const seloAumento = idsComAumento.includes(produto.id)
        ?`<div class="aumento">+35%</div>`
        :"";
    const card = `
        <figure>
            <strong class="nome">${produto.nome}</strong>
            <a href="PagPadraoFunko.html?id=${produto.id}">
                <img src="${produto.imagem}" width="300" height="430" alt="${produto.nome}"
                    onmouseover="this.src='${imagemHover}'"
                    onmouseout="this.src='${produto.imagem}'">
            </a>
            <div>
                <span>R$ ${produto.preco.toFixed(2)}</span>
                <button type="button" class="adicionar-carrinho"
                    data-id="${produto.id}"
                    data-nome="${produto.nome}"
                    data-preco="${produto.preco}"
                    data-imagem="${produto.imagem}">

                    ${seloDesconto}
                    ${seloLimitado}
                    ${seloAumento}
                    
                    Adicionar ao Carrinho
                </button>
            </div>
        </figure>
    `;
 
    document.getElementById(idElemento).innerHTML = card;
  }
 
  function configurarCarrinho() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('adicionar-carrinho')) {
            const botao = e.target;
            const item = {
                id: botao.dataset.id,
                nome: botao.dataset.nome,
                preco: parseFloat(botao.dataset.preco),
                imagem: botao.dataset.imagem,
                quantidade: 1
            };
 
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            const existente = carrinho.find(produto => produto.id === item.id);
 
            if (existente) {
                existente.quantidade++;
            } else {
                carrinho.push(item);
            }
 
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            Swal.fire({
                icon: 'success',
                title: 'Adicionado!',
                text: `${item.nome} foi adicionado ao carrinho.`,
                timer: 1800,
                showConfirmButton: false
            });
        }
    });
  }
 
  function configurarBusca() {
    const searchInput = document.getElementById('search');
    const productContainer = document.querySelector('.grid-container');
 
    searchInput.addEventListener('keyup', (e) => {
        const termo = e.target.value.toLowerCase();
        const produtos = productContainer.querySelectorAll('figure, div[id^="card-dinamico"]');
 
        produtos.forEach(produto => {
            const nomeProduto = produto.querySelector('.nome')?.textContent.toLowerCase() || '';
            if (nomeProduto.includes(termo)) {
                produto.style.display = '';
 
            } else {
                produto.style.display = 'none';
            }
        });
    });
  }
 
 
 
  document.addEventListener('DOMContentLoaded', () => {
    // Carregar produtos dinamicamente
    carregarProduto("001", "card-dinamico-anakin", "IMG-ProdutosFilp/Anakin1.png");
    carregarProduto("002", "card-dinamico-capitaoamerica", "IMG-ProdutosFilp/capitao1.png");
    carregarProduto("003", "card-dinamico-coraline", "IMG-ProdutosFilp/coraline1.png");
    carregarProduto("004", "card-dinamico-harry", "IMG-ProdutosFilp/harrypotter1.png");
    carregarProduto("005", "card-dinamico-legolas", "IMG-ProdutosFilp/legolas1.png");
    carregarProduto("006", "card-dinamico-tiana", "IMG-ProdutosFilp/princesaTiana1.png");
    carregarProduto("007", "card-dinamico-barbie", "IMG-ProdutosFilp/barbie1.png");
    carregarProduto("008", "card-dinamico-john", "IMG-ProdutosFilp/johnwick1.png");
    carregarProduto("009", "card-dinamico-alien", "IMG-ProdutosFilp/aliens1.png");
    carregarProduto("010", "card-dinamico-russel", "IMG-ProdutosFilp/russell1.png");
    carregarProduto("011", "card-dinamico-bonnie", "IMG-ProdutosFilp/bonnie_FiveNight1.png");
    carregarProduto("012", "card-dinamico-crash", "IMG-ProdutosFilp/crash1.png");
    carregarProduto("013", "card-dinamico-eivor", "IMG-ProdutosFilp/eivor1.png");
    carregarProduto("014", "card-dinamico-sonic", "IMG-ProdutosFilp/sonic1.png");
    carregarProduto("015", "card-dinamico-subzero", "IMG-ProdutosFilp/subZero1.png");
    carregarProduto("016", "card-dinamico-viego", "IMG-ProdutosFilp/viego1.png");
    carregarProduto("017", "card-dinamico-echo", "IMG-ProdutosFilp/echo1.png");
    carregarProduto("018", "card-dinamico-steve", "IMG-ProdutosFilp/steve1.png");
    carregarProduto("019", "card-dinamico-lickking", "IMG-ProdutosFilp/TheLickKing1.png");
    carregarProduto("020", "card-dinamico-jin", "IMG-ProdutosFilp/JinSakai1.png");
    carregarProduto("021", "card-dinamico-asta", "IMG-ProdutosFilp/blackAsta1.png");
    carregarProduto("022", "card-dinamico-charizard", "IMG-ProdutosFilp/charizard1.png");
    carregarProduto("023", "card-dinamico-naruto", "IMG-ProdutosFilp/naruto1.png");
    carregarProduto("024", "card-dinamico-orobi", "IMG-ProdutosFilp/orobi1.png");
    carregarProduto("025", "card-dinamico-tanjiro", "IMG-ProdutosFilp/tanjiro_Demon1.png");
    carregarProduto("026", "card-dinamico-todoroki", "IMG-ProdutosFilp/todoroki1.png");
    carregarProduto("027", "card-dinamico-sylveon", "IMG-ProdutosFilp/sylveon1.png");
    carregarProduto("028", "card-dinamico-pain", "IMG-ProdutosFilp/painNaruto1.png");
    carregarProduto("029", "card-dinamico-yu", "IMG-ProdutosFilp/YU_NISHINOYA1.png");
    carregarProduto("030", "card-dinamico-goku", "IMG-ProdutosFilp/goku1.png");
    carregarProduto("031", "card-dinamico-luffy", "IMG-ProdutosFilp/Luffy1.png");
    carregarProduto("032", "card-dinamico-peter", "IMG-ProdutosFilp/aranha1.png");
    carregarProduto("033", "card-dinamico-vanellope", "IMG-ProdutosFilp/vanellope_Detona1.png");
    carregarProduto("034", "card-dinamico-haerin", "IMG-ProdutosFilp/Haerin1.png");
    carregarProduto("035", "card-dinamico-minji", "IMG-ProdutosFilp/minji1.png");
    carregarProduto("036", "card-dinamico-danielle", "IMG-ProdutosFilp/danielle1.png");
    carregarProduto("037", "card-dinamico-hanni", "IMG-ProdutosFilp/Hanni1.png");
    carregarProduto("038", "card-dinamico-hyein", "IMG-ProdutosFilp/Hyein1.png");
 
    // Ativa funcionalidades
    configurarCarrinho();
    configurarBusca();
  });

