document.addEventListener('DOMContentLoaded', () => {
    
    // Dados Simulados
    const posters = [
        { id: 1, title: "Congresso UMADEB 2025", category: "jovens", src: "https://via.placeholder.com/400x500/0071e3/ffffff?text=UMADEB+2025" },
        { id: 2, title: "Encontro de Mulheres", category: "irmas", src: "https://via.placeholder.com/400x500/af52de/ffffff?text=Mulheres+de+Fé" },
        { id: 3, title: "Cruzada Evangelística", category: "missoes", src: "https://via.placeholder.com/400x500/28a745/ffffff?text=Missões+Urbanas" },
        { id: 4, title: "Santa Ceia Setorial", category: "setorial", src: "https://via.placeholder.com/400x500/ffb700/ffffff?text=Santa+Ceia" },
        { id: 5, title: "Vigília da Juventude", category: "jovens", src: "https://via.placeholder.com/400x500/005bb5/ffffff?text=Vigília" }
    ];

    const grid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Lightbox Elementos
    const modal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDownload = document.getElementById('lightbox-download');
    const closeBtn = modal.querySelector('.close-modal-btn');

    // Renderizar Galeria
    const renderGallery = (filter = 'all') => {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? posters : posters.filter(p => p.category === filter);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#777;">Nenhum cartaz encontrado.</p>';
            return;
        }

        filtered.forEach(p => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.onclick = () => openLightbox(p);
            item.innerHTML = `
                <div style="position:relative;">
                    <img src="${p.src}" alt="${p.title}" class="gallery-thumb">
                    <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
                </div>
                <div class="gallery-info">
                    <h4>${p.title}</h4>
                    <span class="gallery-tag">#${p.category}</span>
                </div>
            `;
            grid.appendChild(item);
        });
    };

    // Filtragem
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            renderGallery(btn.dataset.filter);
        });
    });

    // Lightbox
    const openLightbox = (poster) => {
        lightboxImg.src = poster.src;
        lightboxTitle.textContent = poster.title;
        lightboxDownload.href = poster.src; // Em produção, seria o link do arquivo real
        modal.style.display = 'flex';
    };

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    renderGallery();
});