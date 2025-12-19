// ARQUIVO: script-aluno.js
import { db, collection, addDoc, getDocs, deleteDoc, doc, query, where, checkAuth } from './firebase-config.js';

// Protege a rota
checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    setupUI(); // Inicia a interface (Menu, Accordion, Dark Mode)
    carregarAlunos(); // Carrega dados do Firebase

    // --- LÓGICA DE SALVAR ---
    const form = document.getElementById('add-student-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('student-name-input').value;
            const classe = document.getElementById('student-class-select').value;
            const btn = form.querySelector('button[type="submit"]');

            if(!nome || !classe) return;

            try {
                btn.textContent = "Salvando...";
                
                // Salva no Firestore
                const docRef = await addDoc(collection(db, "alunos"), {
                    nome: nome,
                    classe: classe,
                    dataCadastro: new Date().toISOString()
                });

                // Adiciona na tela imediatamente (Feedback rápido)
                renderAlunoNaTela(nome, classe, docRef.id);
                
                form.reset();
                document.getElementById('add-student-modal').classList.remove('active');
            } catch (error) {
                console.error("Erro", error);
                alert("Erro ao salvar no banco de dados.");
            } finally {
                btn.textContent = "Salvar Aluno";
            }
        });
    }
});

// --- FUNÇÕES DE FIREBASE ---
async function carregarAlunos() {
    try {
        const q = query(collection(db, "alunos"));
        const querySnapshot = await getDocs(q);
        
        // Limpa listas para evitar duplicação
        document.querySelectorAll('.student-list').forEach(list => list.innerHTML = '');

        querySnapshot.forEach((doc) => {
            const aluno = doc.data();
            renderAlunoNaTela(aluno.nome, aluno.classe, doc.id);
        });
        atualizarContadores();
    } catch (error) {
        console.log("Erro ao carregar alunos:", error);
    }
}

function renderAlunoNaTela(nome, classeId, docId) {
    const accordion = document.querySelector(`.accordion-item[data-class-id="${classeId}"]`);
    if (!accordion) return;

    const list = accordion.querySelector('.student-list');
    const html = `
        <div class="student-item" id="aluno-${docId}">
            <p class="student-name">${nome}</p>
            <div class="student-actions">
                <button class="action-btn delete-btn" id="btn-del-${docId}"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `;
    list.insertAdjacentHTML('beforeend', html);

    // Adiciona evento de delete
    document.getElementById(`btn-del-${docId}`).addEventListener('click', () => deletarAluno(docId));
}

async function deletarAluno(id) {
    if(confirm("Tem certeza que deseja excluir este aluno?")) {
        try {
            await deleteDoc(doc(db, "alunos", id));
            const el = document.getElementById(`aluno-${id}`);
            if(el) el.remove();
            atualizarContadores();
        } catch (e) {
            console.error(e);
            alert("Erro ao excluir.");
        }
    }
}

function atualizarContadores() {
    document.querySelectorAll('.accordion-item').forEach(item => {
        const count = item.querySelectorAll('.student-item').length;
        const span = item.querySelector('.student-count');
        if(span) span.textContent = count;
    });
}

// --- LÓGICA DE INTERFACE (UI) ---
function setupUI() {
    // 1. Dark Mode
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') body.classList.add('dark-mode');

    // 2. Sidebar Mobile
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebarToggle && sidebar && overlay) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // 3. Accordions
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(clickedHeader => {
        clickedHeader.addEventListener('click', () => {
            const panel = clickedHeader.nextElementSibling;
            const isCurrentlyActive = clickedHeader.classList.contains('active');

            // Fecha outros
            accordionHeaders.forEach(header => {
                if (header !== clickedHeader) {
                    header.classList.remove('active');
                    header.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle atual
            if (isCurrentlyActive) {
                clickedHeader.classList.remove('active');
                panel.style.maxHeight = null;
            } else {
                clickedHeader.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // 4. Modais
    const openModalButton = document.getElementById('add-student-button');
    const closeModalButton = document.getElementById('close-modal-button');
    const modalOverlay = document.getElementById('add-student-modal');

    if (openModalButton) openModalButton.addEventListener('click', () => modalOverlay.classList.add('active'));
    
    const closeModal = () => modalOverlay.classList.remove('active');
    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (event) => { 
        if (event.target === modalOverlay) closeModal(); 
    });
}