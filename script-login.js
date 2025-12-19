import { auth, signInWithEmailAndPassword, onAuthStateChanged } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Se já estiver logado, vai pro Dashboard
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "dashboard.html"; 
        }
    });

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if(loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('username').value; // O ID no seu HTML é 'username', mas deve ser email
            const password = document.getElementById('password').value;
            const btn = loginForm.querySelector('button');

            try {
                btn.textContent = "Entrando...";
                btn.disabled = true;
                errorMessage.style.display = 'none';
                
                await signInWithEmailAndPassword(auth, email, password);
                // O redirecionamento acontece no onAuthStateChanged acima
            } catch (error) {
                console.error(error);
                btn.textContent = "Entrar";
                btn.disabled = false;
                errorMessage.textContent = "E-mail ou senha incorretos.";
                errorMessage.style.display = 'block';
            }
        });
    }
});