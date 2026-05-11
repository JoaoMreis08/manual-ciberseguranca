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
    {
        content: "<b>De:</b> suporte@netflix-financeiro.com<br><b>Assunto:</b> Conta Suspensa!<br><br>O seu pagamento foi recusado. Clique aqui para atualizar os dados.",
        isReal: false,
        explanation: "Phishing! Repare no domínio estranho 'netflix-financeiro.com' e no tom alarmista."
    }
];

let currentScenario = 0;

function loadGame() {
    document.getElementById('email-content').innerHTML = scenarios[currentScenario].content;
}

function checkAnswer(userSaidReal) {
    const feedback = document.getElementById('feedback');
    const correct = (userSaidReal === scenarios[currentScenario].isReal);
    
    if (correct) {
        feedback.innerHTML = " Correto " + scenarios[currentScenario].explanation;
        feedback.style.color = "#00ff88";
    } else {
        feedback.innerHTML = " Errado " + scenarios[currentScenario].explanation;
        feedback.style.color = "#ef4444";
    }
}

window.onload = loadGame;