# 🔐 Cybersecurity Hub

**Plataforma interna de sensibilização para cibersegurança** – desenvolvida para uma empresa de mobiliário de luxo.

---

## 📋 Sobre o Projeto

O **Cybersecurity Hub** é uma plataforma web criada para:

- **Sensibilizar** colaboradores sobre boas práticas de cibersegurança
- **Mapear** a infraestrutura tecnológica da empresa (parque informático, servidores, aplicações)
- **Educar** através de um simulador interativo de phishing
- **Prevenir** ataques cibernéticos com um manual de conduta digital

---

## 🧩 Funcionalidades

| Secção | Descrição |
| --- | --- |
| 🏠 **Início** | Página de boas-vindas com acesso rápido às principais áreas |
| 🖥️ **Infraestrutura** | Levantamento completo do parque tecnológico com avisos clicáveis sobre vulnerabilidades |
| 📘 **Manual de Conduta** | Guia prático com boas práticas e procedimentos de emergência |
| 🎯 **Simulador de Phishing** | Jogo interativo para testar a capacidade de detetar e-mails fraudulentos |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** – Estrutura da plataforma
- **CSS3** – Estilização personalizada com design dark/glassmorphism
- **JavaScript** – Interatividade (tabs, modal, jogo de phishing)
- **Google Fonts** – Tipografia Inter
- **Font Awesome** – Ícones (via CDN)

---

## 📁 Estrutura do Projeto
cybersecurity-hub/
│
├── index.html # Página principal
├── style.css # Estilos e temas (dark/glass)
├── script.js # Lógica da plataforma (tabs, jogo, modal)
└── README.md # Documentação do projeto


---

## 🔍 Detalhes da Infraestrutura (mapeada)

| Categoria | Especificação |
| --- | --- |
| Torres | 6 unidades · 2-3 anos |
| Portáteis | 41 unidades · 5 anos |
| Monitores | 40-60 unidades |
| Access Points | 14-15 unidades |
| Servidor | Cloud (Ciberconceito) |
| Backup | Cloud + Disco rígido (diário) |
| Sistemas Operativos | macOS + Windows |
| Aplicações | WhatsApp, Teams, Dropbox, Drive, Basecamp |
| Web Server | Nginx + PHP 7.2 + cPanel |
| Base de Dados | Uma base por domínio (modelo seguro) |

---

## ⚠️ Avisos de Segurança (interativos)

Ao clicar em certos elementos da secção **Infraestrutura**, são apresentados avisos sobre:

- **Portáteis com 5 anos** – risco de hardware desatualizado
- **PHP 7.2** – versão sem suporte oficial
- **Múltiplas clouds (Dropbox, Drive, Basecamp)** – dados dispersos

---

## 🎮 Simulador de Phishing

O jogo apresenta 5 e-mails (imagens placeholder) e o utilizador deve classificar cada um como:

- ✅ **Parece Seguro**
- ❌ **É Phishing!**

Após cada resposta, é dado feedback e a barra de progresso é atualizada.

---

## 📚 Manual de Conduta – Conteúdos

### Emergências
- Phishing – como identificar e agir
- Ransomware – como reagir num ataque

### Boas Práticas Diárias
- Enganos por telefone (Vishing)
- Riscos de programas piratas
- Bloqueio de ecrã (Win + L)
- Perigos de Pen Drives encontradas
- Smishing (SMS falsos)

---

## 🚀 Como Utilizar

1. **Abrir localmente**  
   Abrir o ficheiro `index.html` num navegador moderno (Chrome, Firefox, Edge)

2. **Navegação**  
   Utilizar as tabs no topo para alternar entre as secções

3. **Simulador**  
   Clicar em "Parece Seguro" ou "É Phishing!" para responder

4. **Infraestrutura**  
   Clicar nos elementos com nome a vermelho para ver avisos de vulnerabilidade

---

## 📦 Dependências Externas

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">

<!-- Font Awesome (ícones) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
