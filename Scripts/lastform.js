function enviarFormulario(event) {
    event.preventDefault(); // Isso deve prevenir o envio
    
    // Variaveis para validação do cartão
    const cartaoInput = document.querySelector('input[name="cartao"]');
    const nomeCartaoInput = document.querySelector('input[name="nomecartao"]');
    const validadeInput = document.querySelector('input[name="validade"]');
    const cvvInput = document.querySelector('input[name="cvv"]');

    // Limpar erros anteriores
    document.getElementById('erro-cartao').textContent = '';
    document.getElementById('erro-nome-cartao').textContent = '';
    document.getElementById('erro-validade').textContent = '';
    document.getElementById('erro-cvv').textContent = '';

    let valido = true;

    // Validação do número do cartão
    const numeroCartao = cartaoInput.value.trim().replace(/\s/g, '');
    if (!/^\d{16}$/.test(numeroCartao)) {
        document.getElementById('erro-cartao').textContent = 'Número do cartão deve conter 16 dígitos.';
        valido = false;
    }

    // Validação do nome no cartão
    const nomeCartao = nomeCartaoInput.value.trim();
    if (!nomeCartao || nomeCartao.length < 3) {
        document.getElementById('erro-nome-cartao').textContent = 'Digite o nome como no cartão (mín. 3 caracteres).';
        valido = false;
    }

    // Validação da validade
    const validade = validadeInput.value.trim();
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(validade)) {
        document.getElementById('erro-validade').textContent = 'Formato inválido (MM/AA).';
        valido = false;
    } else {
        const [mes, ano] = validade.split('/');
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear() % 100;
        const mesAtual = dataAtual.getMonth() + 1;
        
        if (ano < anoAtual || (ano == anoAtual && mes < mesAtual)) {
            document.getElementById('erro-validade').textContent = 'Cartão expirado.';
            valido = false;
        }
    }

    // Validação do CVV
    const cvv = cvvInput.value.trim();
    if (!/^\d{3,4}$/.test(cvv)) {
        document.getElementById('erro-cvv').textContent = 'CVV deve ter 3 ou 4 dígitos.';
        valido = false;
    }

    // Se tudo estiver válido, podemos enviar
    if (valido) {
        alert('Formulário validado com sucesso!');
        // event.target.submit(); 
    }
    if (valido) {
        // Recupera os dados do carrinho e do formulário
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const total = document.getElementById('total-carrinho').textContent;
        const nome = document.querySelector('input[name="Nome"]').value;
        const email = document.querySelector('input[name="E-mail"]').value;

        // Formata os itens do carrinho para o e-mail
        const itensFormatados = carrinho.map(item => 
            `${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade}`
        ).join("\n");

        // Configuração do EmailJS
        const serviceID = "service_wv8mm9a"; // ID do tipo de serviço da API
        const templateID = "template_7ryuxec"; // ID do template do e-mail
        const userID = "XYvjGFCR7gBYdmGEX"; // ID da minha conta no emailjs

        // Dados para o template
        const templateParams = {
            nome: nome,
            email: email,
            total: total,
            itens: itensFormatados
        };

        // Envia o e-mail via EmailJS
        emailjs.send(serviceID, templateID, templateParams, userID)
            .then(response => {
                alert("Compra confirmada! Um e-mail foi enviado para " + email);
                localStorage.removeItem('carrinho'); // Limpa o carrinho
                window.location.href = "index.html"; // Redireciona
            })
            .catch(error => {
                console.error("Erro ao enviar e-mail:", error);
                alert("Compra confirmada, mas houve um erro ao enviar o e-mail.");
            });
    }
}