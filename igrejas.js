document.addEventListener('DOMContentLoaded', () => {

    // --- 1. BASE DE DADOS DAS IGREJAS ---
    // Edite aqui para alterar líderes, pastores e horários
    const churchesData = [
        {
            id: 1,
            name: "Sede do Setor 05",
            address: "Modulo S, 3ª Av, Comércio Ofício, Núcleo Bandeirante - DF",
            pastor: "Pr. Abner (Coordenador)",
            leaders: [
                { role: "Jovens", name: "Dc. João" },
                { role: "Irmãs", name: "Dsa. Maria" },
                { role: "Adolescentes", name: "Aux. Pedro" }
            ],
            schedule: [
                "Terça: Culto de Ensino (19:30)",
                "Quinta: Culto de Vitória (19:30)",
                "Domingo: EBD (09:00) e Família (18:00)"
            ]
        },
        {
            id: 2,
            name: "GUARÁ II - QE 40",
            address: "QE 40 BL I LJ 08A, Guará II - DF",
            pastor: "Pr. Responsável Local",
            leaders: [
                { role: "Jovens", name: "A definir" },
                { role: "Irmãs", name: "A definir" }
            ],
            schedule: [
                "Quarta: Oração (19:30)",
                "Domingo: Culto da Família (19:00)"
            ]
        },
        {
            id: 3,
            name: "GUARÁ I - QE 11",
            address: "QE 11 AE LT A, Guará I - DF",
            pastor: "Pr. Responsável Local",
            leaders: [
                { role: "Jovens", name: "A definir" }
            ],
            schedule: [
                "Sexta: Libertação (19:30)",
                "Domingo: Culto Público (19:00)"
            ]
        },
        {
            id: 4,
            name: "LÚCIO COSTA",
            address: "Setor de Chácaras Lúcio Costa / Guará I",
            alert: "Endereço Pendente",
            pastor: "Pr. Responsável Local",
            leaders: [],
            schedule: ["Domingo: Culto (19:00)"]
        },
        {
            id: 5,
            name: "VILA CAHUY",
            address: "SMPW Trecho 01, Park Way - DF",
            alert: "Endereço Pendente",
            pastor: "Pr. Responsável Local",
            leaders: [],
            schedule: ["Domingo: Culto (19:00)"]
        },
        {
            id: 6,
            name: "VARGEM BONITA",
            address: "SMPW GD 16 LT 32, Vargem Bonita - DF",
            pastor: "Pr. Responsável Local",
            leaders: [],
            schedule: ["Domingo: Culto (19:00)"]
        },
        {
            id: 7,
            name: "QUADRA 13 - PARK WAY",
            address: "SMPW Quadra 13, Park Way - DF",
            pastor: "Pr. Responsável Local",
            leaders: [],
            schedule: ["Domingo: Culto (19:00)"]
        },
        {
            id: 8,
            name: "VEREDA GRANDE",
            address: "SHA Conjunto 3 Chácara 38, Arniqueiras - DF",
            pastor: "Pr. Responsável Local",
            leaders: [],
            schedule: ["Domingo: Culto (19:00)"]
        },
        {
            id: 9,
            name: "CANDANGOLÂNDIA - QD 05",
            address: "QD 05 CJ A LJ 51, Candangolândia - DF",
            pastor: "Pr. Responsável Local",
            leaders: [],
            schedule: ["Domingo: Culto (19:00)"]
        }
    ];

    const gridContainer = document.getElementById('church-grid');
    const modal = document.getElementById('church-modal');
    const closeModalBtn = modal.querySelector('.close-modal-btn');

    // --- 2. RENDERIZAÇÃO DOS CARDS ---
    const renderChurches = () => {
        gridContainer.innerHTML = '';
        
        churchesData.forEach(church => {
            const card = document.createElement('div');
            card.className = 'church-card';
            card.onclick = () => openModal(church.id); // Adiciona o evento de clique

            const alertHtml = church.alert ? 
                `<span style="color: #dc3545; font-size: 0.8rem; display: block; margin-top: 5px;"><i class="fas fa-exclamation-triangle"></i> ${church.alert}</span>` : '';

            card.innerHTML = `
                <div class="church-card-header">
                    <i class="fas fa-church church-icon-large"></i>
                </div>
                <div class="church-card-body">
                    <h3>${church.name}</h3>
                    <div class="church-info-item">
                        <i class="fas fa-user-tie"></i>
                        <span>${church.pastor}</span>
                    </div>
                    <div class="church-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${church.address}</span>
                    </div>
                    ${alertHtml}
                    <div class="card-action">Ver Detalhes <i class="fas fa-arrow-right"></i></div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    };

    // --- 3. LÓGICA DO MODAL ---
    const openModal = (id) => {
        const church = churchesData.find(c => c.id === id);
        if (!church) return;

        // Preencher dados básicos
        document.getElementById('modal-church-name').textContent = church.name;
        document.getElementById('modal-church-address').textContent = church.address;
        document.getElementById('modal-church-pastor').textContent = church.pastor;

        // Preencher Lista de Líderes
        const leadersList = document.getElementById('modal-leaders-list');
        leadersList.innerHTML = '';
        if (church.leaders.length > 0) {
            church.leaders.forEach(leader => {
                leadersList.innerHTML += `<li><strong>${leader.role}:</strong> <span>${leader.name}</span></li>`;
            });
        } else {
            leadersList.innerHTML = '<li><span style="color: #aaa;">Informação não cadastrada.</span></li>';
        }

        // Preencher Agenda
        const scheduleList = document.getElementById('modal-schedule-list');
        scheduleList.innerHTML = '';
        if (church.schedule.length > 0) {
            church.schedule.forEach(item => {
                scheduleList.innerHTML += `<li><i class="fas fa-caret-right" style="color:var(--blue-primary); margin-right:5px;"></i> ${item}</li>`;
            });
        } else {
            scheduleList.innerHTML = '<li><span style="color: #aaa;">Horários não cadastrados.</span></li>';
        }

        modal.style.display = 'flex';
    };

    // Fechar Modal
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Iniciar
    renderChurches();
});