document.addEventListener('DOMContentLoaded', () => {
    const tabelaCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinhoElement = document.getElementById('total-carrinho');

    function atualizarCarrinho() {
        let carrinho = localStorage.getItem('carrinho');
        carrinho = carrinho ? JSON.parse(carrinho) : [];
        tabelaCarrinho.innerHTML = ''; // Limpa a tabela

        let total = 0;

        carrinho.forEach(item => {
            const linha = tabelaCarrinho.insertRow();

            const colunaItem = linha.insertCell();

            const nome = item.nome.trim().toLowerCase();
            let nomeClasse = '';

            if (nome.includes('haerin')) {
            nomeClasse = 'nome-haerin';
            } else if (nome.includes('minji')) {
            nomeClasse = 'nome-minji';
            } else if (nome.includes('danielle')) {
            nomeClasse = 'nome-danielle';
            } else if (nome.includes('hanni')) {
            nomeClasse = 'nome-hanni';
            } else if (nome.includes('hyein')) {
            nomeClasse = 'nome-hyein';
            }

            colunaItem.innerHTML = `<img src="${item.imagem}" alt="${item.nome}" style="width: 100px;"> <strong class="${nomeClasse}">${item.nome}</strong>`;

            const colunaPreco = linha.insertCell();
            colunaPreco.textContent = `R$${item.preco.toFixed(2)}`;

            const colunaQuantidade = linha.insertCell();
            const inputQuantidade = document.createElement('input');
            inputQuantidade.type = 'number';
            inputQuantidade.value = item.quantidade;
            inputQuantidade.min = '0';
            inputQuantidade.addEventListener('change', function() {
                item.quantidade = parseInt(this.value);
                if (item.quantidade <= 0) {
                    removerItem(item.id);
                } else {
                    atualizarLocalStorage(carrinho);
                    atualizarCarrinho();
                }
            });
            colunaQuantidade.appendChild(inputQuantidade);

            const colunaRemover = linha.insertCell();
            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.addEventListener('click', () => {
                removerItem(item.id);
            });
            colunaRemover.appendChild(botaoRemover);

            total += item.preco * item.quantidade;
        });

        totalCarrinhoElement.textContent = `R$${total.toFixed(2)}`;
    }

    function atualizarLocalStorage(carrinhoAtualizado) {
        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
    }

    function removerItem(itemId) {
        let carrinho = localStorage.getItem('carrinho');
        carrinho = carrinho ? JSON.parse(carrinho) : [];
        const novoCarrinho = carrinho.filter(item => item.id !== itemId);
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        atualizarCarrinho();
    }

    atualizarCarrinho();
});