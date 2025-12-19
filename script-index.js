import { auth, db, checkAuth, signOut, collection, getDocs } from './firebase-config.js';

// Protege a rota
checkAuth();

document.addEventListener('DOMContentLoaded', async () => {
    // --- Lógica Sidebar e Tema (Padrão) ---
    setupSidebarAndTheme();

    // --- Carregar Estatísticas Reais ---
    try {
        // Contar Alunos
        const alunosSnap = await getDocs(collection(db, "alunos"));
        const totalAlunos = alunosSnap.size;
        updateStat('Total de Alunos', totalAlunos);

        // Contar Classes (Se tiver collection classes)
        // const classesSnap = await getDocs(collection(db, "classes"));
        // updateStat('Classes Ativas', classesSnap.size);
        
        // Exemplo de como atualizar o HTML
        const statCards = document.querySelectorAll('.widget-card');
        if(statCards[0]) statCards[0].querySelector('.stat-number').textContent = totalAlunos;

    } catch (e) {
        console.error("Erro ao carregar stats", e);
    }
});

function updateStat(title, value) {
    // Função auxiliar para encontrar o card pelo título e atualizar
    const cards = document.querySelectorAll('.widget-card');
    cards.forEach(card => {
        if(card.querySelector('h3').textContent.includes(title)) {
            card.querySelector('.stat-number').textContent = value;
        }
    });
}

function setupSidebarAndTheme() {
    // ... Copie aqui a lógica de Sidebar e Dark Mode que você já tem ...
    // Adicione a lógica de Logout no botão Sair da sidebar
    // Exemplo: document.getElementById('btn-logout').addEventListener('click', () => signOut(auth));
}