document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos
    const foldersGrid = document.getElementById('folders-grid');
    const tableBody = document.getElementById('documents-table-body');
    const currentFolderTitle = document.getElementById('current-folder-title');
    const fileCountBadge = document.getElementById('file-count-badge');
    const searchInput = document.getElementById('search-input');
    
    // Modal Elementos
    const modal = document.getElementById('document-modal');
    const addBtn = document.getElementById('add-document-btn');
    const closeBtn = document.querySelector('.close-modal-btn');
    const form = document.getElementById('document-form');
    const fileInput = document.getElementById('document-file-input');
    const fileNameDisplay = document.getElementById('file-name-display');

    // Estado Atual
    let currentCategory = 'Todos'; // Começa mostrando tudo
    
    // Dados Iniciais (Exemplo)
    const initialDocs = [
        { id: 1, name: 'Ata Reunião Obreiros Jan/25', category: 'Atas de Reunião', date: '2025-01-15', filename: 'ata_jan25.pdf', size: '2.4 MB' },
        { id: 2, name: 'Relatório Financeiro 2024', category: 'Relatórios Financeiros', date: '2025-01-10', filename: 'balanco_2024.xlsx', size: '1.1 MB' },
        { id: 3, name: 'Circular Santa Ceia', category: 'Circulares', date: '2025-02-01', filename: 'circular_05.docx', size: '500 KB' },
        { id: 4, name: 'Lista de Membros Ativos', category: 'Outros', date: '2025-02-15', filename: 'membros.xlsx', size: '800 KB' }
    ];

    let documents = JSON.parse(localStorage.getItem('churchDocuments')) || initialDocs;

    // Categorias Fixas (Pastas que sempre aparecem)
    const categories = ['Todos', 'Atas de Reunião', 'Relatórios Financeiros', 'Circulares', 'Eventos', 'Outros'];

    // --- Funções Principais ---

    const saveDocs = () => {
        localStorage.setItem('churchDocuments', JSON.stringify(documents));
    };

    const getFileIcon = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        if (['pdf'].includes(ext)) return 'fa-file-pdf';
        if (['doc', 'docx'].includes(ext)) return 'fa-file-word';
        if (['xls', 'xlsx', 'csv'].includes(ext)) return 'fa-file-excel';
        if (['jpg', 'png', 'jpeg'].includes(ext)) return 'fa-file-image';
        return 'fa-file-alt';
    };

    // Renderiza as Pastas no topo
    const renderFolders = () => {
        foldersGrid.innerHTML = '';
        
        categories.forEach(cat => {
            // Contar arquivos nesta categoria
            let count = 0;
            if (cat === 'Todos') {
                count = documents.length;
            } else {
                count = documents.filter(d => d.category === cat).length;
            }

            const folderCard = document.createElement('div');
            folderCard.className = `folder-card ${currentCategory === cat ? 'active' : ''}`;
            folderCard.onclick = () => switchFolder(cat);

            // Ícone diferente para "Todos"
            const iconClass = cat === 'Todos' ? 'fa-folder-open' : 'fa-folder';

            folderCard.innerHTML = `
                <i class="fas ${iconClass} folder-icon"></i>
                <div class="folder-info">
                    <h4>${cat}</h4>
                    <p>${count} arquivos</p>
                </div>
            `;
            foldersGrid.appendChild(folderCard);
        });
    };

    // Troca a pasta selecionada e atualiza a tabela
    const switchFolder = (category) => {
        currentCategory = category;
        currentFolderTitle.textContent = category === 'Todos' ? 'Todos os Documentos' : category;
        renderFolders(); // Para atualizar a classe .active
        renderTable();
    };

    // Renderiza a tabela de arquivos
    const renderTable = () => {
        tableBody.innerHTML = '';
        const term = searchInput.value.toLowerCase();

        // Filtrar por pasta E por busca
        const filteredDocs = documents.filter(doc => {
            const matchesCategory = currentCategory === 'Todos' || doc.category === currentCategory;
            const matchesSearch = doc.name.toLowerCase().includes(term);
            return matchesCategory && matchesSearch;
        });

        // Atualizar contador
        fileCountBadge.textContent = `${filteredDocs.length} arquivos`;

        if (filteredDocs.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:30px; color:#999;">Esta pasta está vazia ou nenhum arquivo encontrado.</td></tr>';
            return;
        }

        filteredDocs.forEach(doc => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="file-icon-cell">
                    <i class="fas ${getFileIcon(doc.filename)}"></i> ${doc.name}
                </td>
                <td><span style="background:#eee; padding:2px 8px; border-radius:4px; font-size:0.8rem;">${doc.category}</span></td>
                <td>${new Date(doc.date).toLocaleDateString('pt-BR')}</td>
                <td>${doc.size || '-'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" title="Baixar"><i class="fas fa-download"></i></button>
                        <button class="action-btn delete-btn" onclick="deleteDoc(${doc.id})" title="Excluir"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    };

    // --- Modal e Formulário ---

    addBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        // Se estiver numa pasta específica (não Todos), já seleciona ela no select
        if (currentCategory !== 'Todos') {
            document.getElementById('document-category').value = currentCategory;
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        form.reset();
        fileNameDisplay.textContent = '';
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const hasFile = fileInput.files.length > 0;
        const filename = hasFile ? fileInput.files[0].name : 'arquivo_sem_nome.pdf';
        
        // Simulação de tamanho de arquivo
        const fileSize = hasFile ? (fileInput.files[0].size / 1024).toFixed(1) + ' KB' : '0 KB';

        const newDoc = {
            id: Date.now(),
            name: document.getElementById('document-name').value,
            category: document.getElementById('document-category').value,
            date: new Date().toISOString().split('T')[0], // Data de hoje YYYY-MM-DD
            filename: filename,
            size: fileSize
        };

        documents.push(newDoc);
        saveDocs();
        
        // Se adicionou numa categoria diferente da atual, muda pra ela pra ver o arquivo
        if (currentCategory !== 'Todos' && currentCategory !== newDoc.category) {
            switchFolder(newDoc.category);
        } else {
            renderFolders(); // Atualiza contagens
            renderTable();   // Atualiza lista
        }

        modal.style.display = 'none';
        form.reset();
        fileNameDisplay.textContent = '';
        alert('Documento salvo com sucesso!');
    });

    // Função Global de Exclusão
    window.deleteDoc = (id) => {
        if(confirm('Deseja realmente excluir este arquivo?')) {
            documents = documents.filter(d => d.id !== id);
            saveDocs();
            renderFolders();
            renderTable();
        }
    };

    // Busca
    searchInput.addEventListener('input', renderTable);

    // Inicializar
    renderFolders();
    renderTable();
});