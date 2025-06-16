/*Use a versão mais recente do EmailJS SDK*/
    // Inicialize o EmailJS com sua Public Key
    emailjs.init('XYvjGFCR7gBYdmGEX');

    document.getElementById("newsletter-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("user_email").value.trim();
        const name = document.getElementById("user_name").value.trim();

        if (!email || !name) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Envie o email usando a versão atualizada da API
        emailjs.send("service_wv8mm9a", "template_h5kks7s", {
            nome: name,
            email: email
        })
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            Swal.fire({
                icon: 'success',
                title: 'Inscrição realizada com sucesso!',
                text: `Um e-mail foi enviado para ` + email,
                timer: 4000,
                showConfirmButton: 'Ok'
            });
            document.getElementById("newsletter-form").reset();
        }, function(error) {
            console.log("FAILED...", error);
            Swal.fire({
                icon: 'error',
                title: 'Falha de inscrição!',
                text: `Falha ao enviar a inscrição. Por favor, tente novamente mais tarde.`,
                timer: 5000,
                showConfirmButton: 'OK'
            });
        });
    });