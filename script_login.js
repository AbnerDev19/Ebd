document.addEventListener('DOMContentLoaded', () => {
    // Simulação de um banco de dados de usuários
    const users = {
        'admin': { password: '123', role: 'admin', redirect: 'index.html' },
        'prof.daniel': { password: '123', role: 'professor', class: 'adolescentes', redirect: 'alunos.html' },
        'prof.ana': { password: '123', role: 'professor', class: 'jovens', redirect: 'alunos.html' },
        'aluno.joao': { password: '123', role: 'aluno', class: 'adultos', redirect: 'revistas.html' }
    };

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const user = users[username];

        if (user && user.password === password) {
            // Salva as informações do usuário na sessão do navegador
            sessionStorage.setItem('loggedInUser', username);
            sessionStorage.setItem('userRole', user.role);
            sessionStorage.setItem('userClass', user.class || ''); // Salva a turma, se houver

            // Redireciona para a página correta
            window.location.href = user.redirect;
        } else {
            // Mostra a mensagem de erro
            errorMessage.textContent = 'Usuário ou senha inválidos.';
            errorMessage.style.display = 'block';
        }
    });
});