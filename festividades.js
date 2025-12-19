document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('festividade-form');
    const listContainer = document.getElementById('festividades-list');
    
    // Dados de exemplo
    const initialData = [
        {
            id: 1,
            title: "Congresso de Jovens 2025",
            department: "Jovens",
            date: "2025-09-15",
            time: "19:00",
            location: "Sede Setor 5",
            poster: "https://via.placeholder.com/400x300/0071e3/ffffff?text=UMADEB"
        },
        {
            id: 2,
            title: "Círculo de Oração Festivo",
            department: "Irmãs",
            date: "2025-10-10",
            time: "09:00",
            location: "Igreja Guará II",
            poster: "" 
        }
    ];

    let festividades = JSON.parse(localStorage.getItem('churchFestividades')) || initialData;

    const saveToLocal = () => {
        localStorage.setItem('churchFestividades', JSON.stringify(festividades));
    };

    const renderList = () => {
        listContainer.innerHTML = '';

        if (festividades.length === 0) {
            listContainer.innerHTML = '<p style="padding: 20px; color: #666;">Nenhum evento cadastrado.</p>';
            return;
        }

        const sortedEvents = festividades.sort((a, b) => new Date(a.date) - new Date(b.date));

        sortedEvents.forEach(evt => {
            const dataFormatada = new Date(evt.date + 'T00:00:00').toLocaleDateString('pt-BR');
            
            // Tratamento de Imagem: se vazio, usa placeholder
            const imgUrl = evt.poster && evt.poster.trim() !== '' 
                ? evt.poster 
                : 'https://via.placeholder.com/400x300/e0e0e0/888888?text=ADEB+Setor+5';

            // Tratamento da classe de cor (Remove acentos e minúsculas)
            // Ex: "Irmãs" vira "irmas", "Varões" vira "varoes"
            const deptClass = evt.department.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            
            const badgeClass = `badge-${deptClass}`;

            const card = document.createElement('div');
            card.className = 'fest-card'; // Importante: Essa classe ativa o CSS
            
            card.innerHTML = `
                <div class="fest-poster-area">
                    <img src="${imgUrl}" alt="Cartaz">
                    <span class="dept-badge ${badgeClass}">${evt.department}</span>
                </div>
                <div class="fest-info">
                    <h4>${evt.title}</h4>
                    <div class="fest-meta">
                        <p><i class="far fa-calendar-alt"></i> ${dataFormatada} às ${evt.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${evt.location}</p>
                    </div>
                    <div class="delete-btn-wrapper">
                        <button class="btn-delete" onclick="deleteEvent(${evt.id})">
                            <i class="fas fa-trash"></i> Excluir
                        </button>
                    </div>
                </div>
            `;
            listContainer.appendChild(card);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newEvent = {
            id: Date.now(),
            title: document.getElementById('event-title').value,
            department: document.getElementById('event-department').value,
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value,
            location: document.getElementById('event-location').value,
            poster: document.getElementById('event-poster').value
        };

        festividades.push(newEvent);
        saveToLocal();
        renderList();
        form.reset();
    });

    window.deleteEvent = (id) => {
        if(confirm('Excluir este evento?')) {
            festividades = festividades.filter(e => e.id !== id);
            saveToLocal();
            renderList();
        }
    };

    renderList();
});