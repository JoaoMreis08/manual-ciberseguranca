(() => {
    const maxQuestions = 5;

    const gameState = {
        scenarios: [],
        gameScenarios: [],
        currentQuestion: 0,
        score: 0,
        answerLocked: false
    };

    const gameMarkup = `
        <div class="email-zoom-container">
            <img id="email-image" src="" alt="Exame de e-mail">
        </div>
        <div class="game-controls">
            <button class="btn btn-real" onclick="checkAnswer(true)">Parece Seguro</button>
            <button class="btn btn-phishing" onclick="checkAnswer(false)">É Phishing!</button>
        </div>
        <div id="feedback" class="feedback"></div>
    `;

    // --- LÓGICA DAS TABS (CORRIGIDA) ---
    function openTab(evt, tabName) {
        // 1. Esconder todas as secções e remover a classe active
        document.querySelectorAll('.tab-content').forEach((section) => {
            section.style.display = 'none'; // Força o desaparecimento
            section.classList.remove('active');
        });

        // 2. Desativar todos os botões
        document.querySelectorAll('.tab-btn').forEach((button) => {
            button.classList.remove('active');
        });

        // 3. Mostrar a secção selecionada
        const selectedSection = document.getElementById(tabName);
        if (selectedSection) {
            selectedSection.style.display = 'block'; // Força a exibição
            selectedSection.classList.add('active');
        }

        // 4. Ativar o botão correspondente no menu de tabs
        const tabButton = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        if (tabButton) {
            tabButton.classList.add('active');
        } else if (evt?.currentTarget?.classList.contains('tab-btn')) {
            evt.currentTarget.classList.add('active');
        }
    }

    // --- LÓGICA DO JOGO ---
    async function initGame() {
        try {
            // Tenta carregar os emails, se falhar usa um exemplo para não crashar o site
            const response = await fetch('emails.json');
            if (!response.ok) throw new Error("Ficheiro não encontrado");
            gameState.scenarios = await response.json();
        } catch (e) {
            console.warn('Usando dados de emergência (emails.json não carregado)');
            gameState.scenarios = [{image: "assets/exemplo.png", isReal: false, explanation: "Exemplo de segurança."}];
        }
        restartGame();
    }

    function restartGame() {
        gameState.currentQuestion = 0;
        gameState.score = 0;
        gameState.answerLocked = false;
        gameState.gameScenarios = [...gameState.scenarios]
            .sort(() => 0.5 - Math.random())
            .slice(0, maxQuestions);

        const gameBox = document.getElementById('game-box');
        if (gameBox) {
            gameBox.innerHTML = gameMarkup;
            setupMagnifier();
            loadQuestion();
        }
    }

    function loadQuestion() {
        const total = gameState.gameScenarios.length;
        if (total === 0) return;
        if (gameState.currentQuestion >= total) {
            showFinalResult();
            return;
        }

        gameState.answerLocked = false;
        const current = gameState.gameScenarios[gameState.currentQuestion];
        const img = document.getElementById('email-image');
        if (img) img.src = current.image;

        const pb = document.getElementById('progress-bar');
        if (pb) pb.style.width = `${((gameState.currentQuestion + 1) / total) * 100}%`;
        
        const qn = document.getElementById('question-number');
        if (qn) qn.innerText = `ANALISANDO ALVO ${gameState.currentQuestion + 1} DE ${total}`;
        
        const fb = document.getElementById('feedback');
        if (fb) {
            fb.className = 'feedback';
            fb.innerText = '';
        }
    }

    function checkAnswer(userSaidReal) {
        if (gameState.answerLocked) return;
        gameState.answerLocked = true;

        const current = gameState.gameScenarios[gameState.currentQuestion];
        const correct = userSaidReal === current.isReal;
        const feedback = document.getElementById('feedback');
        const box = document.getElementById('game-box');

        if (correct) {
            gameState.score++;
            feedback.className = 'feedback feedback-success';
            feedback.innerText = `> ACESSO AUTORIZADO: ${current.explanation}`;
        } else {
            box.classList.add('shake');
            setTimeout(() => box.classList.remove('shake'), 500);
            feedback.className = 'feedback feedback-danger';
            feedback.innerText = `> BRECHA DETETADA: ${current.explanation}`;
        }

        setTimeout(() => {
            gameState.currentQuestion++;
            loadQuestion();
        }, 3500);
    }

    function setupMagnifier() {
        const container = document.querySelector('.email-zoom-container');
        const img = document.getElementById('email-image');
        if (!container || !img) return;

        const magnifier = document.createElement('div');
        magnifier.className = 'magnifier';
        container.appendChild(magnifier);

        const moveMagnifier = (e) => {
            const rect = container.getBoundingClientRect();
            const pointer = e.touches?.[0] ?? e;
            const x = pointer.clientX - rect.left;
            const y = pointer.clientY - rect.top;
            const zoom = 2.5;

            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                magnifier.style.display = 'none';
                return;
            }

            magnifier.style.display = 'block';
            magnifier.style.left = `${x}px`;
            magnifier.style.top = `${y}px`;
            magnifier.style.backgroundImage = `url("${img.src}")`;
            magnifier.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
            magnifier.style.backgroundPosition = `-${(x * zoom) - (magnifier.offsetWidth / 2)}px -${(y * zoom) - (magnifier.offsetHeight / 2)}px`;
        };

        container.addEventListener('mousemove', moveMagnifier);
        container.addEventListener('mouseleave', () => magnifier.style.display = 'none');
    }

    function showFinalResult() {
        const total = gameState.gameScenarios.length;
        const rank = gameState.score >= Math.ceil(total * 0.8) ? 'AGENT ELITE' : 'RECRUTA';
        document.getElementById('game-box').innerHTML = `
            <div class="final-result" style="text-align:center; padding: 20px;">
                <h2>SCAN COMPLETO</h2>
                <p style="font-size: 2rem; color: var(--primary);">${gameState.score} / ${total}</p>
                <p>RANK: ${rank}</p>
                <button onclick="restartGame()" class="btn btn-real" style="margin-top:20px;">REINICIAR SISTEMA</button>
            </div>
        `;
    }

    // EXPOR PARA O HTML
    window.openTab = openTab;
    window.checkAnswer = checkAnswer;
    window.restartGame = restartGame;
    window.addEventListener('load', initGame);
})();

// Modal functions
function abrirModal(mensagem) {
    const modal = document.getElementById('avisoModal');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = mensagem;
    modal.style.display = 'flex';
}

function fecharModal() {
    const modal = document.getElementById('avisoModal');
    modal.style.display = 'none';
}

// Fechar modal ao clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('avisoModal');
    if (event.target === modal) {
        fecharModal();
    }
}

// Avisos específicos por click
function mostrarAvisoSO() {
    const mensagem = `
        <p><span class="risk">⚠️ Fragilidade Identificada:</span></p>
        <p>A empresa utiliza <strong>macOS e Windows em simultâneo</strong>.</p>
        <p><strong>Riscos:</strong></p>
        <ul style="margin-left: 20px;">
            <li>Suporte IT mais complexo e caro</li>
            <li>Licenças duplicadas para software</li>
            <li>Problemas de compatibilidade entre equipas</li>
            <li>Padrões de segurança diferentes em cada SO</li>
        </ul>
        <p><span class="solution">✅ Recomendação:</span> Padronizar num único sistema operativo sempre que possível, ou implementar gestão unificada (MDM).</p>
    `;
    abrirModal(mensagem);
}

function mostrarAvisoWhatsApp() {
    const mensagem = `
        <p><span class="risk">⚠️ Fragilidade Identificada:</span></p>
        <p>Uso de <strong>WhatsApp pessoal</strong> para comunicação profissional.</p>
        <p><strong>Riscos:</strong></p>
        <ul style="margin-left: 20px;">
            <li>Conversas não ficam nos servidores da empresa</li>
            <li>Sem controlo de acesso ou backups oficiais</li>
            <li>Mistura entre vida pessoal e profissional</li>
            <li>Risco de perda de histórico de clientes</li>
        </ul>
        <p><span class="solution">✅ Recomendação:</span> Migrar para WhatsApp Business (conta da empresa) ou Microsoft Teams.</p>
    `;
    abrirModal(mensagem);
}

function mostrarAvisoPHP() {
    const mensagem = `
        <p><span class="risk">⚠️ Fragilidade Identificada:</span></p>
        <p>Servidor a correr <strong>PHP 7.2</strong> (versão desatualizada).</p>
        <p><strong>Riscos:</strong></p>
        <ul style="margin-left: 20px;">
            <li>Sem suporte oficial desde novembro de 2020</li>
            <li>Vulnerabilidades conhecidas sem correção</li>
            <li>Risco de invasão do servidor</li>
        </ul>
        <p><span class="solution">✅ Recomendação:</span> Atualizar para PHP 8.x com urgência.</p>
    `;
    abrirModal(mensagem);
}

function mostrarAvisoPortateis() {
    const mensagem = `
        <p><span class="risk">⚠️ Fragilidade Identificada:</span></p>
        <p><strong>41 portáteis com 5 anos</strong> em uso diário.</p>
        <p><strong>Riscos:</strong></p>
        <ul style="margin-left: 20px;">
            <li>Sem atualizações de segurança recentes</li>
            <li>Baterias degradadas (autonomia reduzida)</li>
            <li>Lentidão e baixa produtividade</li>
            <li>Alto risco de avaria súbita</li>
        </ul>
        <p><span class="solution">✅ Recomendação:</span> Plano de substituição gradual nos próximos 12 meses.</p>
    `;
    abrirModal(mensagem);
}

function mostrarAvisoClouds() {
    const mensagem = `
        <p><span class="risk">⚠️ Fragilidade Identificada:</span></p>
        <p>Dados dispersos por <strong>3 clouds diferentes</strong> (Dropbox, Drive, Basecamp).</p>
        <p><strong>Riscos:</strong></p>
        <ul style="margin-left: 20px;">
            <li>Ficheiros duplicados e versões desatualizadas</li>
            <li>Dificuldade em controlar quem acede a quê</li>
            <li>Backup inconsistente</li>
        </ul>
        <p><span class="solution">✅ Recomendação:</span> Unificar numa única plataforma com governação definida.</p>
    `;
    abrirModal(mensagem);
}