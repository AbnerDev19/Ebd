document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const calendarGrid = document.getElementById('calendar-days-grid');
    const monthYearText = document.getElementById('current-month-year');
    const prevBtn = document.getElementById('prev-month-btn');
    const nextBtn = document.getElementById('next-month-btn');
    const form = document.getElementById('event-form');
    const upcomingList = document.getElementById('upcoming-events-list');
    const eventModal = document.getElementById('event-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    // Estado
    let currentDate = new Date();
    // Dados iniciais de exemplo se estiver vazio
    const sampleEvents = [
        { title: "Culto de Missões", church: "Sede", type: "Setorial", date: "2025-09-20", time: "19:00" },
        { title: "Ensaio Geral", church: "Guará II", type: "Local", date: "2025-09-22", time: "20:00" }
    ];
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || sampleEvents;

    // --- Funções Principais ---

    const saveEvents = () => {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Nome do mês
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        monthYearText.textContent = `${monthNames[month]} de ${year}`;
        
        calendarGrid.innerHTML = '';

        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Células vazias (dias antes do começo do mês)
        for (let i = 0; i < firstDayIndex; i++) {
            const empty = document.createElement('div');
            empty.classList.add('empty');
            calendarGrid.appendChild(empty);
        }

        // Dias do mês
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            
            // Formatando string da data: YYYY-MM-DD
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // Checar se é hoje
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('today');
            }

            // Checar se tem evento
            const dayEvents = events.filter(e => e.date === dateString);
            if (dayEvents.length > 0) {
                // Adiciona bolinha indicadora
                const dot = document.createElement('span');
                dot.className = 'event-dot';
                // Prioriza cor Setorial se houver conflito, senão Local
                const hasSetorial = dayEvents.some(e => e.type === 'Setorial');
                dot.classList.add(hasSetorial ? 'dot-setorial' : 'dot-local');
                dayCell.appendChild(dot);
            }

            dayCell.addEventListener('click', () => openModal(dateString));
            calendarGrid.appendChild(dayCell);
        }

        renderUpcomingEvents();
    };

    const renderUpcomingEvents = () => {
        upcomingList.innerHTML = '';
        
        // Data de hoje zerada para comparação
        const today = new Date();
        today.setHours(0,0,0,0);

        // Filtrar eventos futuros (ou de hoje) e ordenar
        const futureEvents = events
            .filter(e => new Date(e.date + 'T00:00:00') >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (futureEvents.length === 0) {
            upcomingList.innerHTML = '<li style="color:#777; padding:10px;">Não há eventos futuros agendados.</li>';
            return;
        }

        // Pegar apenas os próximos 10
        futureEvents.slice(0, 10).forEach(evt => {
            const li = document.createElement('li');
            const typeClass = evt.type === 'Setorial' ? 'type-setorial' : 'type-local';
            const dateFormatted = new Date(evt.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
            
            li.className = `upcoming-item ${typeClass}`;
            li.innerHTML = `
                <span class="upcoming-date">${dateFormatted} • ${evt.type}</span>
                <span class="upcoming-title">${evt.title}</span>
                <span class="upcoming-loc"><i class="fas fa-map-marker-alt"></i> ${evt.church} às ${evt.time}</span>
            `;
            upcomingList.appendChild(li);
        });
    };

    const openModal = (dateString) => {
        const dayEvents = events.filter(e => e.date === dateString);
        const dateObj = new Date(dateString + 'T00:00:00');
        const dateTitle = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

        let html = `<h3>${dateTitle}</h3>`;
        
        if (dayEvents.length === 0) {
            html += '<p>Nenhum evento para este dia.</p>';
        } else {
            dayEvents.forEach(evt => {
                const color = evt.type === 'Setorial' ? '#ffb700' : '#28a745';
                html += `
                    <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <h4 style="color:${color}; margin-bottom:5px;">${evt.title} (${evt.type})</h4>
                        <p><strong>Local:</strong> ${evt.church}</p>
                        <p><strong>Horário:</strong> ${evt.time}</p>
                    </div>
                `;
            });
        }
        modalBody.innerHTML = html;
        eventModal.style.display = 'flex';
    };

    // --- Event Listeners ---

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newEvent = {
            id: Date.now(),
            title: document.getElementById('event-title').value,
            church: document.getElementById('event-church').value,
            type: document.getElementById('event-type').value, // Local ou Setorial
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value
        };

        events.push(newEvent);
        saveEvents();
        renderCalendar(); // Atualiza calendário e lista
        form.reset();
        alert('Evento agendado com sucesso!');
    });

    // Fechar Modal
    closeModalBtn.addEventListener('click', () => eventModal.style.display = 'none');
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) eventModal.style.display = 'none';
    });

    // Inicialização
    renderCalendar();
});