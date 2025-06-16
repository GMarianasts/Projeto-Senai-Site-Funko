let currentStep = 0;
const steps = document.querySelectorAll('.step');

function showStep(index) {
steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
});
}

function nextStep() {//função para validação de avanço de etapa, caso alguma parte não esteja de acordo com os requisitos não será possivel continuar
    if (currentStep === 0) {//Primeiro formulario, somente a respeito de informações pessoais
        const nome = document.querySelector('input[name="Nome"]');
        const email = document.querySelector('input[name="E-mail"]');
        const cpf = document.querySelector('input[name="CPF"]');
        const telefone = document.querySelector('input[name="telefone"]');
        const nascimento = document.querySelector('input[name="nascimento"]');

        let valido = true;

        // Variaveis para caso ocorra algum erro
        const erroNome = document.getElementById('erro-nome');
        const erroEmail = document.getElementById('erro-email');
        const erroCpf = document.getElementById('erro-cpf');
        const erroTelefone = document.getElementById('erro-telefone');
        const erroNascimento = document.getElementById('erro-nascimento');

        // Validação de nome, podendo conter somente letras
        if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(nome.value.trim())) {
            erroNome.textContent = 'Digite um nome válido com pelo menos 3 letras.';
            valido = false;
        } else {
            erroNome.textContent = '';
        }

        // Validação de email, sendo necessario um @ e algum terminal pos "."
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            erroEmail.textContent = 'Digite um e-mail válido.';
            valido = false;
        } else {
            erroEmail.textContent = '';
        }

        // Validação de CPF, sendo necessario 11 digitos (somente números)
        if (!/^\d{11}$/.test(cpf.value.trim())) {
            erroCpf.textContent = 'Digite um CPF com exatamente 11 dígitos numéricos.';
            valido = false;
        } else {
            erroCpf.textContent = '';
        }

        //Validação de telefone, deve conter 10 ou 11 números
        if (!/^\d{10,11}$/.test(telefone.value.trim())) {
            erroTelefone.textContent = 'Telefone deve ter 10 ou 11 dígitos (DDD + número).';
            valido = false;
        } else {
            erroTelefone.textContent = '';
        }

        // Validação de data de nascimento no seguinte formato: DDMMYY ou DDMMYYYY
        const nascimentoVal = nascimento.value.trim();
        if (!/^\d{8}$/.test(nascimentoVal)) {
            erroNascimento.textContent = 'Data de nascimento deve ser numérica (Ex: 01012000).';
            valido = false;
        } else {
            erroNascimento.textContent = '';
        }

        if (!valido) return;
    }

    if (currentStep === 1) {//validações do segundo formulario
        //Variaveis para armazenar as devidas informações
        const cep = document.querySelector('input[name="CEP"]');
        const endereco = document.querySelector('input[name="Endereço"]');
        const cidade = document.querySelector('input[name="Cidade"]');
        const destinatario = document.querySelector('input[name="Destinatario"]');

        let valido = true;

        // Variaveis para erros
        const erroCep = document.getElementById('erro-cep');
        const erroEndereco = document.getElementById('erro-endereco');
        const erroCidade = document.getElementById('erro-cidade');
        const erroDestinatario = document.getElementById('erro-destinatario');

        // Validação para CEP, sendo valido somente quando possuir 8 digitos
        if (!/^\d{8}$/.test(cep.value.trim())) {
            erroCep.textContent = 'Digite um CEP válido com 8 dígitos numéricos.';
            valido = false;
        } else {
            erroCep.textContent = '';
        }

        //Validação para endereço
        if (endereco.value.trim().length < 5) {
            erroEndereco.textContent = 'Endereço muito curto.';
            valido = false;
        } else {
            erroEndereco.textContent = '';
        }

        //Validação para cidade
        if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(cidade.value.trim())) {
            erroCidade.textContent = 'Digite uma cidade válida.';
            valido = false;
        } else {
            erroCidade.textContent = '';
        }

        //Validação para destinatário, similar a de nome
        if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(destinatario.value.trim())) {
            erroDestinatario.textContent = 'Digite um nome de destinatário válido.';
            valido = false;
        } else {
            erroDestinatario.textContent = '';
        }

        if (!valido) return;
    }
    // Avançar se passou nas validações
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}





function prevStep() {//função para caso deseje retornar no formulario
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }   
}

document.addEventListener('DOMContentLoaded', () => {
showStep(currentStep);
});