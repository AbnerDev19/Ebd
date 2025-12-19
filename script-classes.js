import { db, collection, addDoc, getDocs, deleteDoc, doc, checkAuth } from './firebase-config.js';

checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    setupUI(); // Tema e Sidebar
    carregarClasses();

    const form = document.querySelector('.modal-form'); // Adicione ID no form HTML se necessário
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Pegue os valores dos inputs pelo ID
            const nome = document.getElementById('classe-name').value;
            const professor = document.getElementById('classe-teacher').value;
            const local = document.getElementById('classe-location').value;

            try {
                await addDoc(collection(db, "classes"), { nome, professor, local });
                window.location.reload(); // Recarrega para mostrar (mais simples para agora)
            } catch (e) {
                console.error(e);
            }
        });
    }
});

async function carregarClasses() {
    const container = document.querySelector('.grid-container');
    // Limpa os cards estáticos
    container.innerHTML = ''; 

    const snapshot = await getDocs(collection(db, "classes"));
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const html = `
            <div class="class-info-card">
                <div class="class-card-main-info">
                    <i class="fa-solid fa-chalkboard-user main-icon"></i>
                    <h3 class="class-name">${data.nome}</h3>
                </div>
                <ul class="class-details-list">
                    <li><i class="fa-solid fa-user-tie"></i> Prof: <strong>${data.professor}</strong></li>
                    <li><i class="fa-solid fa-location-dot"></i> Local: <strong>${data.local}</strong></li>
                </ul>
                <div class="class-actions">
                     <button class="action-btn-secondary" onclick="deletarClasse('${docSnap.id}')">Excluir</button>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', html);
    });
}

window.deletarClasse = async (id) => {
    if(confirm('Excluir classe?')) {
        await deleteDoc(doc(db, "classes", id));
        window.location.reload();
    }
}

function setupUI() { /* Lógica padrão */ }