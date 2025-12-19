// ARQUIVO: script-login.js
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Se já logado, vai para o Dashboard (index.html)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "index.html"; 
        }
    });

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if(loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            // CORREÇÃO AQUI: O ID no HTML é 'email', não 'username'
            const email = document.getElementById('email').value; 
            const password = document.getElementById('password').value;
            const btn = loginForm.querySelector('button');

            try {
                btn.textContent = "Entrando...";
                btn.disabled = true;
                if(errorMessage) errorMessage.style.display = 'none';
                
                await signInWithEmailAndPassword(auth, email, password);
                // Redirecionamento automático pelo onAuthStateChanged acima
            } catch (error) {
                console.error(error);
                btn.textContent = "Entrar";
                btn.disabled = false;
                if(errorMessage) {
                    errorMessage.textContent = "E-mail ou senha incorretos.";
                    errorMessage.style.display = 'block';
                }
            }
        });
    }
});