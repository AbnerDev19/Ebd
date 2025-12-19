import { db, collection, addDoc, getDocs, deleteDoc, doc, query, where, checkAuth } from './firebase-config.js';

checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    setupUI(); // Sua lógica de Tema/Sidebar/Accordion
    carregarAlunos();

    // --- ADICIONAR ALUNO ---
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

                // Adiciona na tela imediatamente
                renderAlunoNaTela(nome, classe, docRef.id);
                
                form.reset();
                document.getElementById('add-student-modal').classList.remove('active');
            } catch (error) {
                console.error("Erro", error);
                alert("Erro ao salvar");
            } finally {
                btn.textContent = "Salvar Aluno";
            }
        });
    }
});

async function carregarAlunos() {
    const q = query(collection(db, "alunos"));
    const querySnapshot = await getDocs(q);
    
    // Limpa as listas atuais antes de renderizar (opcional, se quiser evitar duplicatas ao recarregar)
    document.querySelectorAll('.student-list').forEach(list => list.innerHTML = '');

    querySnapshot.forEach((doc) => {
        const aluno = doc.data();
        renderAlunoNaTela(aluno.nome, aluno.classe, doc.id);
    });
    atualizarContadores();
}

function renderAlunoNaTela(nome, classeId, docId) {
    const accordion = document.querySelector(`.accordion-item[data-class-id="${classeId}"]`);
    if (!accordion) return; // Se a classe não existe no HTML

    const list = accordion.querySelector('.student-list');
    const html = `
        <div class="student-item" id="aluno-${docId}">
            <p class="student-name">${nome}</p>
            <div class="student-actions">
                <button class="action-btn delete-btn" data-id="${docId}"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `;
    list.insertAdjacentHTML('beforeend', html);

    // Adiciona evento de delete no botão criado
    const deleteBtn = list.querySelector(`#aluno-${docId} .delete-btn`);
    deleteBtn.addEventListener('click', () => deletarAluno(docId));
}

async function deletarAluno(id) {
    if(confirm("Tem certeza que deseja excluir?")) {
        try {
            await deleteDoc(doc(db, "alunos", id));
            document.getElementById(`aluno-${id}`).remove();
            atualizarContadores();
        } catch (e) {
            alert("Erro ao excluir");
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

function setupUI() {
    // ... COLE AQUI A LÓGICA DE SIDEBAR, THEME E ACCORDION DO SEU ARQUIVO ORIGINAL ...
}