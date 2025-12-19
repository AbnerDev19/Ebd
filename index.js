document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DADOS DAS IGREJAS ---
    const churchesData = [
        {
            name: "Sede do Setor 05",
            address: "Modulo S, 3ª Av, Comércio Ofício",
            city: "Núcleo Bandeirante - DF",
            cep: "71710-350"
        },
        {
            name: "GUARÁ II - QE 40",
            address: "QE 40 BL I LJ 08A",
            city: "Guará II - DF",
            cep: "71070-400"
        },
        {
            name: "GUARÁ I - QE 11",
            address: "QE 11 AE LT A",
            city: "Guará I - DF",
            cep: "71020-611"
        },
        {
            name: "LÚCIO COSTA",
            address: "Setor de Chácaras Lúcio Costa / Guará I",
            city: "Guará - DF",
            alert: "Endereço não Cadastrado. FAVOR ATUALIZAR!"
        },
        {
            name: "VILA CAHUY",
            address: "SMPW Trecho 01",
            city: "Park Way - DF",
            alert: "Endereço não Cadastrado. FAVOR ATUALIZAR!"
        },
        {
            name: "VARGEM BONITA - PARK WAY",
            address: "SMPW GD 16 LT 32",
            city: "Vargem Bonita / Park Way - DF",
            cep: "70297-400"
        },
        {
            name: "QUADRA 13 - PARK WAY",
            address: "SMPW Quadra 13",
            city: "Park Way - DF",
            cep: "71741-300",
            alert: "Endereço incompleto."
        },
        {
            name: "VEREDA GRANDE",
            address: "SHA Conjunto 3 Chácara 38",
            city: "Arniqueiras - DF",
            cep: "71993-570"
        },
        {
            name: "CANDANGOLÂNDIA - QD 05",
            address: "QD 05 CJ A LJ 51",
            city: "Candangolândia - DF",
            cep: "71725-500"
        }
    ];

    // --- 2. DADOS FICTÍCIOS PARA OS CARDS SUPERIORES ---
    
    // Próximos Eventos
    const nextEvents = [
        { day: '25', month: 'AGO', title: 'Reunião de Obreiros', local: 'Sede Setor 5' },
        { day: '02', month: 'SET', title: 'Santa Ceia Geral', local: 'Templo Central' },
        { day: '15', month: 'SET', title: 'Encontro de Jovens', local: 'Guará II' }
    ];

    // Lembretes
    const reminders = [
        { text: 'Enviar relatório financeiro até dia 30.', priority: 'Alta' },
        { text: 'Atualizar cadastro da congregação Vereda Grande.', priority: 'Média' },
        { text: 'Reunião com a liderança de música na terça.', priority: 'Baixa' }
    ];

    // Agenda da Semana
    const weeklyAgenda = [
        { day: 'Domingo', activity: 'Escola Bíblica (09h) <br> Culto da Família (19h)' },
        { day: 'Segunda', activity: 'Oração no Monte (20h)' },
        { day: 'Terça', activity: 'Culto de Ensino (19:30)' },
        { day: 'Quarta', activity: 'Círculo de Oração (14h)' },
        { day: 'Quinta', activity: 'Culto de Libertação (19:30)' },
        { day: 'Sexta', activity: 'Vigília Setorial (22h)' },
        { day: 'Sábado', activity: 'Culto de Jovens (19:30)' }
    ];


    // --- 3. FUNÇÕES DE RENDERIZAÇÃO ---

    // Renderizar Igrejas (Com a imagem logo.png)
    const churchContainer = document.getElementById('church-grid-home');
    if (churchContainer) {
        churchContainer.innerHTML = '';
        churchesData.forEach(church => {
            const cardHTML = `
                <div class="church-display-card">
                    <h4>
                        <img src="fotos/logo.png" alt="Logo" class="church-logo"> 
                        ${church.name}
                    </h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${church.address}</p>
                    <p><i class="fas fa-city"></i> ${church.city}</p>
                    ${church.cep ? `<p><i class="fas fa-mail-bulk"></i> CEP: ${church.cep}</p>` : ''}
                    ${church.alert ? `<p style="color: var(--danger-color); font-weight:bold; font-size: 0.8rem;"><i class="fas fa-exclamation-triangle"></i> ${church.alert}</p>` : ''}
                </div>
            `;
            churchContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // Renderizar Próximos Eventos
    const eventsList = document.getElementById('next-events-list');
    if (eventsList) {
        nextEvents.forEach(evt => {
            const html = `
                <div class="dashboard-list-item">
                    <div class="date-badge">
                        <span class="day">${evt.day}</span>
                        <span class="month">${evt.month}</span>
                    </div>
                    <div class="item-content">
                        <h4>${evt.title}</h4>
                        <p><i class="fas fa-map-pin"></i> ${evt.local}</p>
                    </div>
                </div>
            `;
            eventsList.insertAdjacentHTML('beforeend', html);
        });
    }

    // Renderizar Lembretes
    const remindersList = document.getElementById('reminders-list');
    if (remindersList) {
        reminders.forEach(rem => {
            const priorityColor = rem.priority === 'Alta' ? '#dc3545' : '#e6a800';
            const html = `
                <div class="dashboard-list-item">
                    <div style="font-size: 1.2rem; color: ${priorityColor}; padding: 0 10px;">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <div class="item-content">
                        <h4>${rem.priority} Prioridade</h4>
                        <p>${rem.text}</p>
                    </div>
                </div>
            `;
            remindersList.insertAdjacentHTML('beforeend', html);
        });
    }

    // Renderizar Agenda Semanal
    const weeklyGrid = document.getElementById('weekly-schedule-grid');
    if (weeklyGrid) {
        weeklyAgenda.forEach(item => {
            const html = `
                <div class="weekday-col">
                    <span class="weekday-name">${item.day}</span>
                    <div class="weekday-event">${item.activity}</div>
                </div>
            `;
            weeklyGrid.insertAdjacentHTML('beforeend', html);
        });
    }
});