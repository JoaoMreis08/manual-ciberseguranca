(() => {
    const maxQuestions = 5;

    const threatItems = [
        {
            icon: "PH",
            title: "Phishing",
            risk: "Alto",
            description: "Email ou mensagem que imita uma entidade legítima para roubar credenciais, pagamentos ou dados.",
            prevention: "Verifique remetente, domínio, urgência artificial e links antes de clicar."
        },
        {
            icon: "SP",
            title: "Spear Phishing",
            risk: "Alto",
            description: "Ataque personalizado com informação real sobre a empresa, equipa ou fornecedor.",
            prevention: "Confirme pedidos sensíveis por canal alternativo e nunca aprove pagamentos apenas por email."
        },
        {
            icon: "RW",
            title: "Ransomware",
            risk: "Alto",
            description: "Malware que cifra ficheiros e exige resgate, normalmente após anexo, link ou acesso roubado.",
            prevention: "Nao abra anexos inesperados, mantenha backups e reporte comportamentos estranhos."
        },
        {
            icon: "ES",
            title: "Engenharia Social",
            risk: "Alto",
            description: "Manipulação psicológica para obter acesso, informação ou uma ação insegura.",
            prevention: "Questione urgência, autoridade falsa e pedidos fora do processo normal."
        },
        {
            icon: "MF",
            title: "MFA Fatigue",
            risk: "Medio",
            description: "Envio repetido de notificações MFA até a vítima aprovar por cansaço ou engano.",
            prevention: "Rejeite pedidos que não iniciou e reporte aprovações inesperadas."
        },
        {
            icon: "CS",
            title: "Credential Stuffing",
            risk: "Alto",
            description: "Tentativa automatizada de login com passwords reutilizadas e vazadas noutros serviços.",
            prevention: "Use passwords únicas e gestor de passwords para cada serviço."
        },
        {
            icon: "USB",
            title: "USB Maliciosos",
            risk: "Medio",
            description: "Dispositivo físico preparado para instalar malware ou executar comandos no computador.",
            prevention: "Nunca ligue dispositivos desconhecidos; entregue-os ao IT."
        },
        {
            icon: "QR",
            title: "QR Code Phishing",
            risk: "Medio",
            description: "QR code que redireciona para página falsa de login, pagamento ou recolha de dados.",
            prevention: "Confirme o URL após ler o QR e evite autenticar em páginas abertas por códigos suspeitos."
        },
        {
            icon: "DV",
            title: "Deepfake Voice Scam",
            risk: "Alto",
            description: "Chamada com voz clonada para pressionar pagamentos, alterações bancárias ou partilha de dados.",
            prevention: "Use palavra-passe verbal ou confirmação por canal oficial antes de agir."
        },
        {
            icon: "TS",
            title: "Ataques via Teams/Slack",
            risk: "Medio",
            description: "Mensagens em plataformas colaborativas com links, ficheiros ou pedidos de acesso fraudulentos.",
            prevention: "Valide identidade, contexto e permissão antes de abrir ficheiros ou aprovar convites."
        }
    ];

    const conductItems = {
        do: [
            "Usar MFA em contas corporativas e confirmar apenas pedidos iniciados por si.",
            "Verificar remetentes, domínios e links antes de abrir anexos ou introduzir credenciais.",
            "Reportar emails, mensagens e chamadas suspeitas ao IT sem apagar evidências.",
            "Bloquear o dispositivo sempre que se ausentar da secretária.",
            "Usar gestor de passwords e passwords únicas por serviço.",
            "Manter informação sensível apenas em plataformas aprovadas pela empresa."
        ],
        dont: [
            "Reutilizar passwords entre contas pessoais e profissionais.",
            "Abrir anexos desconhecidos ou ficheiros recebidos fora do contexto esperado.",
            "Instalar software, extensões ou ferramentas online sem aprovação.",
            "Partilhar códigos MFA, passwords, tokens ou capturas com terceiros.",
            "Ligar USBs encontrados ou oferecidos sem validacao do IT.",
            "Responder a pedidos urgentes de pagamento ou alteração bancária sem confirmação."
        ]
    };

    const incidentSteps = [
        "Nao clique novamente e nao tente testar o link ou anexo.",
        "Se introduziu credenciais, avise imediatamente o IT e altere a password conforme orientação.",
        "Tire screenshot da mensagem, página, erro ou comportamento suspeito.",
        "Não apague o email, chat ou ficheiro, preserve evidências para análise.",
        "Se o equipamento apresentar comportamento anormal, desligue VPN/rede se for instruído pelo IT.",
        "Reporte o incidente com hora, origem, ação realizada e sistemas afetados."
    ];

    const passwordChecklist = [
        "Passwords longas, únicas e geradas por gestor de passwords.",
        "Passphrases com várias palavras quando precisar memorizar.",
        "MFA ativo em email, cloud, VPN, bancos e ferramentas críticas.",
        "Nunca aprovar MFA inesperado ou repetido.",
        "Não guardar passwords em notas, browsers partilhados ou ficheiros.",
        "Alterar password após suspeita, fuga ou introdução em página falsa."
    ];

    const modalContent = {
        laptops: {
            title: "💻 Risco: portáteis antigos",
            body: "<p>Equipamentos com vários anos podem ter menor desempenho, baterias degradadas e maior probabilidade de falha.</p><ul><li>Priorizar atualizações de sistema e antivírus.</li><li>Aplicar encriptação de disco.</li><li>Planear substituição gradual dos equipamentos mais críticos.</li></ul>"
        },
        os: {
            title: "🖥️ Ambiente macOS e Windows",
            body: "<p>Ambientes mistos exigem políticas equivalentes de segurança para evitar configurações inconsistentes.</p><ul><li>Gestão centralizada por MDM.</li><li>Políticas iguais de bloqueio, disco cifrado e updates.</li><li>Inventário de dispositivos e versões.</li></ul>"
        },
        cloud: {
            title: "☁️ Risco: dados dispersos",
            body: "<p>Ficheiros espalhados por várias clouds dificultam controlo de acessos, backups e remoção de permissão.</p><ul><li>Definir plataforma oficial por tipo de documento.</li><li>Rever partilhas externas regularmente.</li><li>Evitar contas pessoais para trabalho.</li></ul>"
        },
        php: {
            title: "🔐 Risco: PHP 7.2",
            body: "<p>Versões sem suporte acumulam vulnerabilidades conhecidas e aumentam o risco de exploração.</p><ul><li>Planear upgrade para versão suportada.</li><li>Testar compatibilidade antes da migração.</li><li>Monitorizar logs e aplicar hardening no servidor.</li></ul>"
        },
        database: {
            title: "🗄️ Base de Dados",
            body: "<p>Uma base por domínio reduz o impacto de falhas entre sites e melhora a organização operacional.</p><p class=\"text-secure\">Modelo seguro - isolamento entre domínios.</p><ul><li>Manter backups testados e acessos restritos.</li><li>Rever permissões de utilizadores periodicamente.</li><li>Monitorizar alterações suspeitas em tabelas críticas.</li></ul>"
        }
    };

    const gameState = {
        scenarios: [],
        gameScenarios: [],
        currentQuestion: 0,
        score: 0,
        answerLocked: false
    };

    const gameMarkup = `
        <div class="email-zoom-container">
            <img id="email-image" src="" alt="Email para analise">
        </div>
        <div class="game-controls">
            <button class="btn btn-real" id="btn-real" type="button">Parece seguro</button>
            <button class="btn btn-phishing" id="btn-phishing" type="button">E phishing</button>
        </div>
        <div id="feedback" class="feedback" aria-live="polite"></div>
        <div id="answer-explanation" class="answer-explanation" hidden></div>
        <button id="next-btn" class="btn btn-primary" type="button" hidden>Próxima pergunta</button>
    `;

    const qs = (selector, root = document) => root.querySelector(selector);
    const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

    function setActiveTab(tabName) {
        qsa(".tab-content").forEach((section) => {
            const isActive = section.id === tabName;
            section.classList.toggle("active", isActive);
            if (isActive) {
                section.focus({ preventScroll: true });
            }
        });

        qsa(".tab-btn").forEach((button) => {
            button.classList.toggle("active", button.dataset.tab === tabName);
        });
    }

    function renderThreats() {
        const grid = qs("#threats-grid");
        if (!grid) return;

        grid.innerHTML = threatItems.map((item) => {
            const riskClass = item.risk === "Alto" ? "risk-high" : "risk-medium";
            return `
                <article class="threat-card">
                    <span class="card-icon">${item.icon}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <p><span class="prevent-label">Como prevenir:</span> ${item.prevention}</p>
                    <div class="risk-row">
                        <span>Nivel de risco</span>
                        <span class="risk-pill ${riskClass}">${item.risk}</span>
                    </div>
                </article>
            `;
        }).join("");
    }

    function renderConduct() {
        const doList = qs("#do-list");
        const dontList = qs("#dont-list");
        if (doList) doList.innerHTML = conductItems.do.map((item) => `<li>${item}</li>`).join("");
        if (dontList) dontList.innerHTML = conductItems.dont.map((item) => `<li>${item}</li>`).join("");
    }

    function renderIncidentSteps() {
        const list = qs("#incident-steps");
        if (!list) return;
        list.innerHTML = incidentSteps.map((step) => `<li>${step}</li>`).join("");
    }

    function renderPasswordChecklist() {
        const list = qs("#password-checklist");
        if (!list) return;
        list.innerHTML = passwordChecklist.map((item) => `<li>${item}</li>`).join("");
    }

    function openModal(content) {
        const modal = qs("#info-modal");
        const title = qs("#modal-title");
        const body = qs("#modal-body");
        if (!modal || !title || !body || !content) return;

        title.textContent = content.title;
        body.innerHTML = content.body;
        modal.hidden = false;
        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";
        qs(".modal-close", modal)?.focus();
    }

    function openImageModal(src, caption) {
        const modal = qs("#image-modal");
        const image = qs("#manual-image");
        const text = qs("#manual-caption");
        if (!modal || !image || !text) return;

        image.src = src;
        image.alt = caption;
        text.textContent = caption;
        modal.hidden = false;
        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";
        qs(".modal-close", modal)?.focus();
    }

    function closeModals() {
        qsa(".modal").forEach((modal) => {
            modal.classList.remove("is-open");
            modal.hidden = true;
        });
        document.body.style.overflow = "";
    }

    async function initGame() {
        try {
            const response = await fetch("emails.json");
            if (!response.ok) throw new Error("emails.json indisponivel");
            gameState.scenarios = await response.json();
        } catch (error) {
            console.warn("A usar cenario de reserva para o simulador.", error);
            gameState.scenarios = [
                {
                    image: "assets/exemplo.png",
                    isReal: false,
                    explanation: "Cenario de reserva: valide sempre remetente, link e contexto antes de clicar."
                }
            ];
        }

        restartGame();
    }

    function restartGame() {
        gameState.currentQuestion = 0;
        gameState.score = 0;
        gameState.answerLocked = false;
        gameState.gameScenarios = [...gameState.scenarios]
            .sort(() => Math.random() - 0.5)
            .slice(0, maxQuestions);

        const gameBox = qs("#game-box");
        if (!gameBox) return;

        gameBox.innerHTML = gameMarkup;
        qs("#btn-real")?.addEventListener("click", () => checkAnswer(true));
        qs("#btn-phishing")?.addEventListener("click", () => checkAnswer(false));
        qs("#next-btn")?.addEventListener("click", loadNextQuestion);
        setupMagnifier();
        loadQuestion();
    }

    function loadQuestion() {
        const total = gameState.gameScenarios.length;
        if (!total) return;

        if (gameState.currentQuestion >= total) {
            showFinalResult();
            return;
        }

        gameState.answerLocked = false;
        const current = gameState.gameScenarios[gameState.currentQuestion];
        const image = qs("#email-image");
        const progress = qs("#progress-bar");
        const question = qs("#question-number");
        const feedback = qs("#feedback");
        const explanation = qs("#answer-explanation");
        const nextButton = qs("#next-btn");

        if (image) image.src = current.image;
        if (progress) progress.style.width = `${((gameState.currentQuestion + 1) / total) * 100}%`;
        if (question) question.textContent = `Pergunta ${gameState.currentQuestion + 1} de ${total}`;
        if (feedback) {
            feedback.className = "feedback";
            feedback.textContent = "";
        }
        if (explanation) {
            explanation.hidden = true;
            explanation.textContent = "";
        }
        if (nextButton) nextButton.hidden = true;

        qsa("#btn-real, #btn-phishing").forEach((button) => {
            button.disabled = false;
        });
    }

    function checkAnswer(userSaidReal) {
        if (gameState.answerLocked) return;
        gameState.answerLocked = true;

        const current = gameState.gameScenarios[gameState.currentQuestion];
        const correct = userSaidReal === current.isReal;
        const feedback = qs("#feedback");
        const gameBox = qs("#game-box");
        const explanation = qs("#answer-explanation");
        const nextButton = qs("#next-btn");

        qsa("#btn-real, #btn-phishing").forEach((button) => {
            button.disabled = true;
        });

        if (correct) {
            gameState.score += 1;
            if (feedback) {
                feedback.className = "feedback feedback-success";
                feedback.textContent = "Correto";
            }
        } else {
            gameBox?.classList.add("shake");
            window.setTimeout(() => gameBox?.classList.remove("shake"), 420);
            if (feedback) {
                feedback.className = "feedback feedback-danger";
                feedback.textContent = "Resposta incorreta";
            }
        }

        if (explanation) {
            explanation.textContent = current.explanation || "Reveja remetente, dominio, links, anexos e urgencia do pedido.";
            explanation.hidden = false;
        }
        if (nextButton) nextButton.hidden = false;
    }

    function loadNextQuestion() {
        gameState.currentQuestion += 1;
        loadQuestion();
    }

    function setupMagnifier() {
        const container = qs(".email-zoom-container");
        const image = qs("#email-image");
        if (!container || !image) return;

        const magnifier = document.createElement("div");
        magnifier.className = "magnifier";
        container.appendChild(magnifier);

        const moveMagnifier = (event) => {
            const rect = container.getBoundingClientRect();
            const pointer = event.touches?.[0] ?? event;
            const x = pointer.clientX - rect.left;
            const y = pointer.clientY - rect.top;
            const zoom = 2.4;

            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                magnifier.style.display = "none";
                return;
            }

            magnifier.style.display = "block";
            magnifier.style.left = `${x}px`;
            magnifier.style.top = `${y}px`;
            magnifier.style.backgroundImage = `url("${image.src}")`;
            magnifier.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
            magnifier.style.backgroundPosition = `-${(x * zoom) - (magnifier.offsetWidth / 2)}px -${(y * zoom) - (magnifier.offsetHeight / 2)}px`;
        };

        container.addEventListener("mousemove", moveMagnifier);
        container.addEventListener("mouseleave", () => {
            magnifier.style.display = "none";
        });
    }

    function showFinalResult() {
        const total = gameState.gameScenarios.length;
        const percentage = Math.round((gameState.score / total) * 100);
        const rank = percentage >= 80 ? "Excelente leitura de risco." : "Bom treino. Reveja os sinais antes do proximo teste.";
        const gameBox = qs("#game-box");
        if (!gameBox) return;

        gameBox.innerHTML = `
            <div class="final-result">
                <p class="eyebrow">Resultado final</p>
                <h2>Analise concluida</h2>
                <div class="final-score">${gameState.score}/${total}</div>
                <p>${rank}</p>
                <button class="btn btn-primary" id="restart-btn" type="button">Tentar novamente</button>
            </div>
        `;
        qs("#restart-btn")?.addEventListener("click", restartGame);
    }

    function bindEvents() {
        qsa("[data-tab], [data-tab-target]").forEach((button) => {
            button.addEventListener("click", () => {
                setActiveTab(button.dataset.tab || button.dataset.tabTarget);
            });
        });

        qsa("[data-modal]").forEach((button) => {
            button.addEventListener("click", () => openModal(modalContent[button.dataset.modal]));
        });

        qsa("[data-manual-image]").forEach((button) => {
            button.addEventListener("click", () => openImageModal(button.dataset.manualImage, button.dataset.caption));
        });

        qsa(".modal").forEach((modal) => {
            modal.addEventListener("click", (event) => {
                if (event.target === modal || event.target.classList.contains("modal-close")) {
                    closeModals();
                }
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeModals();
        });
    }

    function init() {
        renderThreats();
        renderConduct();
        renderIncidentSteps();
        renderPasswordChecklist();
        bindEvents();
        initGame();
    }

    window.addEventListener("DOMContentLoaded", init);
})();
