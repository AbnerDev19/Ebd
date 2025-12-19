document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const subject = document.getElementById('subject').value;
        
        // Simulação de envio
        alert(`Obrigado, ${name}! Sua mensagem sobre "${subject}" foi enviada com sucesso.`);
        form.reset();
    });
});