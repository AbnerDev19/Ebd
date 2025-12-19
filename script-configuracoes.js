import { db, doc, getDoc, setDoc, checkAuth } from './firebase-config.js';

checkAuth();

document.addEventListener('DOMContentLoaded', async () => {
    setupUI(); // Tema e Sidebar

    // Carregar dados salvos
    const docRef = doc(db, "configuracoes", "geral");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        const data = docSnap.data();
        if(document.getElementById('church-name')) document.getElementById('church-name').value = data.nomeIgreja || '';
        if(document.getElementById('pastor-name')) document.getElementById('pastor-name').value = data.pastor || '';
        if(document.getElementById('super-name')) document.getElementById('super-name').value = data.superintendente || '';
    }

    // Salvar dados
    const btn = document.getElementById('save-settings-button');
    if(btn) {
        btn.addEventListener('click', async () => {
            const nomeIgreja = document.getElementById('church-name').value;
            const pastor = document.getElementById('pastor-name').value;
            const superint = document.getElementById('super-name').value;

            try {
                btn.textContent = "Salvando...";
                await setDoc(doc(db, "configuracoes", "geral"), {
                    nomeIgreja,
                    pastor,
                    superintendente: superint
                });
                alert('Configurações salvas!');
            } catch (e) {
                alert('Erro ao salvar');
            } finally {
                btn.textContent = "Salvar Alterações";
            }
        });
    }
});

function setupUI() { /* Lógica padrão */ }