// Lógica das Tabs
function openTab(evt, tabName) {
    let contents = document.getElementsByClassName("tab-content");
    for (let content of contents) content.style.display = "none";
    
    let buttons = document.getElementsByClassName("tab-btn");
    for (let btn of buttons) btn.classList.remove("active");

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Lógica do Jogo de Phishing
const scenarios = [
    { image: "assets/p1.png", isReal: false, explanation: "O domínio do remetente é falso." },
    { image: "assets/r1.png", isReal: true, explanation: "E-mail oficial da Microsoft." },
    { image: "assets/p2.png", isReal: false, explanation: "Urgência falsa detetada!" },
    // Adiciona quantos quiseres aqui...
];

let currentQuestion = 0;
let score = 0;
const totalQuestions = 5;
let gameScenarios = [];

function initGame() {
    // Embaralha e escolhe 5 cenários aleatórios (Estilo Bom Condutor)
    gameScenarios = [...scenarios].sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion < totalQuestions) {
        const imgElement = document.getElementById('email-image');
        imgElement.src = gameScenarios[currentQuestion].image;
        
        // Atualiza progresso
        const progress = ((currentQuestion + 1) / totalQuestions) * 100;
        document.getElementById('progress-bar').style.width = progress + "%";
        document.getElementById('question-number').innerText = `Pergunta ${currentQuestion + 1} de ${totalQuestions}`;
        document.getElementById('feedback').innerText = "";
    } else {
        showFinalResult();
    }
}

function checkAnswer(userSaidReal) {
    const correct = (userSaidReal === gameScenarios[currentQuestion].isReal);
    if (correct) score++;

    const feedback = document.getElementById('feedback');
    feedback.innerText = correct ? "✅ " + gameScenarios[currentQuestion].explanation : "❌ " + gameScenarios[currentQuestion].explanation;
    
    // Espera 2 segundos e passa à próxima
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 2000);
}

function showFinalResult() {
    let msg = "";
    if (score <= 2) msg = "Precisas de mais treino! 🛡️";
    else if (score <= 4) msg = "Estás no bom caminho! ⚠️";
    else msg = "Mestre da Cibersegurança! 🏆";

    document.querySelector('.game-container').innerHTML = `
        <div style="text-align:center; padding: 40px;">
            <h3>Fim do Jogo!</h3>
            <p style="font-size: 2rem;">${score} / ${totalQuestions}</p>
            <p>${msg}</p>
            <button onclick="location.reload()" class="tab-btn active">Jogar Novamente</button>
        </div>
    `;
}

window.onload = initGame;