(() => {
    const maxQuestions = 5;

    // Estado fechado dentro do módulo para evitar variáveis globais desnecessárias.
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

    function getTotalQuestions() {
        return gameState.gameScenarios.length;
    }

    // Tabs: mostra apenas a secção pedida e marca apenas o botão clicado.
    function openTab(evt, tabName) {
        document.querySelectorAll('.tab-content').forEach((section) => {
            section.classList.remove('active');
        });

        document.querySelectorAll('.tab-btn').forEach((button) => {
            button.classList.remove('active');
        });

        const selectedSection = document.getElementById(tabName);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }

        if (evt?.currentTarget) {
            evt.currentTarget.classList.add('active');
        }
    }

    async function initGame() {
        try {
            const response = await fetch('emails.json');
            gameState.scenarios = await response.json();
            restartGame();
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
        }
    }

    function restartGame() {
        gameState.currentQuestion = 0;
        gameState.score = 0;
        gameState.answerLocked = false;
        gameState.gameScenarios = [...gameState.scenarios]
            .sort(() => 0.5 - Math.random())
            .slice(0, maxQuestions);

        // Recria apenas o conteúdo interno do jogo; header, tabs e layout principal ficam intactos.
        document.getElementById('game-box').innerHTML = gameMarkup;
        setupMagnifier();
        loadQuestion();
    }

    function loadQuestion() {
        const totalQuestions = getTotalQuestions();

        if (totalQuestions === 0) {
            document.getElementById('game-box').innerHTML = '<p>Não existem emails disponíveis para o jogo.</p>';
            return;
        }

        if (gameState.currentQuestion >= totalQuestions) {
            showFinalResult();
            return;
        }

        gameState.answerLocked = false;
        const currentScenario = gameState.gameScenarios[gameState.currentQuestion];
        const img = document.getElementById('email-image');

        img.src = currentScenario.image;
        document.getElementById('progress-bar').style.width = `${((gameState.currentQuestion + 1) / totalQuestions) * 100}%`;
        document.getElementById('question-number').innerText = `ANALISANDO ALVO ${gameState.currentQuestion + 1} DE ${totalQuestions}`;
        const feedback = document.getElementById('feedback');
        feedback.className = 'feedback';
        feedback.innerText = '';
    }

    function checkAnswer(userSaidReal) {
        if (gameState.answerLocked) return;
        gameState.answerLocked = true;

        const currentScenario = gameState.gameScenarios[gameState.currentQuestion];
        const correct = userSaidReal === currentScenario.isReal;
        const feedback = document.getElementById('feedback');
        const box = document.getElementById('game-box');

        if (correct) {
            gameState.score++;
            feedback.className = 'feedback feedback-success';
            feedback.innerText = `> ACESSO AUTORIZADO: ${currentScenario.explanation}`;
        } else {
            box.classList.add('shake');
            setTimeout(() => box.classList.remove('shake'), 500);
            feedback.className = 'feedback feedback-danger';
            feedback.innerText = `> BRECHA DETETADA: ${currentScenario.explanation}`;
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

        // Cria uma única lupa por ronda e calcula a ampliação com base no tamanho visível da imagem.
        const magnifier = document.createElement('div');
        const zoom = 2.5;
        magnifier.className = 'magnifier';
        container.appendChild(magnifier);

        const moveMagnifier = (e) => {
            const rect = container.getBoundingClientRect();
            const pointer = e.touches?.[0] ?? e;
            const x = pointer.clientX - rect.left;
            const y = pointer.clientY - rect.top;

            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                magnifier.style.display = 'none';
                return;
            }

            magnifier.style.display = 'block';
            magnifier.style.left = `${x}px`;
            magnifier.style.top = `${y}px`;
            magnifier.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
            magnifier.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
            magnifier.style.backgroundPosition = `-${(x * zoom) - (magnifier.offsetWidth / 2)}px -${(y * zoom) - (magnifier.offsetHeight / 2)}px`;
        };

        container.addEventListener('mousemove', moveMagnifier);
        container.addEventListener('touchmove', moveMagnifier, { passive: true });
        container.addEventListener('mouseleave', () => {
            magnifier.style.display = 'none';
        });
        container.addEventListener('touchend', () => {
            magnifier.style.display = 'none';
        });
    }

    function showFinalResult() {
        const totalQuestions = getTotalQuestions();
        const rank = gameState.score >= Math.ceil(totalQuestions * 0.8) ? 'AGENT ELITE' : 'RECRUTA';

        // Atualiza só o interior da caixa do jogo, sem substituir body, main, tabs ou sections.
        document.getElementById('game-box').innerHTML = `
            <div class="final-result">
                <h2>SCAN COMPLETO</h2>
                <p class="final-score">${gameState.score} / ${totalQuestions}</p>
                <p>RANK: ${rank}</p>
                <button onclick="restartGame()" class="btn btn-real">REINICIAR SISTEMA</button>
            </div>
        `;
    }

    // Mantém compatibilidade com os onclick existentes no HTML sem poluir o resto do código.
    window.openTab = openTab;
    window.checkAnswer = checkAnswer;
    window.restartGame = restartGame;
    window.addEventListener('load', initGame);
})();
