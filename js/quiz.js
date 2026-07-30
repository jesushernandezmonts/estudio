// Quiz Arena Engine
let currentCategory = null;
let currentQuestionIndex = 0;
let quizScore = 0;
let userXP = parseInt(localStorage.getItem('mathverse_xp')) || 0;

function updateXPDisplay() {
    const xpEl = document.getElementById('xpPoints');
    if (xpEl) xpEl.innerText = `${userXP} XP`;
    localStorage.setItem('mathverse_xp', userXP);
}

function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    quizScore = 0;

    const quizCard = document.getElementById('activeQuizCard');
    const categoryTitle = document.getElementById('quizCategoryTitle');

    const names = {
        diferencial: 'Desafío: Cálculo Diferencial',
        integral: 'Desafío: Cálculo Integral',
        edos: 'Desafío: Ecuaciones Diferenciales'
    };

    categoryTitle.innerText = names[category] || 'Desafío de Cálculo';
    quizCard.classList.remove('hidden');
    quizCard.scrollIntoView({ behavior: 'smooth' });

    renderQuestion();
}

function renderQuestion() {
    const questions = quizQuestions[currentCategory];
    if (!questions || currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById('quizStepTracker').innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    document.getElementById('quizQuestionText').innerText = q.question;

    const formulaBox = document.getElementById('quizFormulaDisplay');
    formulaBox.innerHTML = `$$${q.formula}$$`;

    // Render KaTeX for formula
    if (window.renderMathInElement) {
        window.renderMathInElement(formulaBox, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ]
        });
    }

    const optionsList = document.getElementById('quizOptionsList');
    optionsList.innerHTML = '';

    q.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.innerHTML = `<span style="margin-right:8px; font-weight:700;">${String.fromCharCode(65 + index)}.</span> ${optText}`;
        btn.onclick = () => selectAnswer(index);
        optionsList.appendChild(btn);
    });

    // Reset hint box & buttons
    document.getElementById('quizHintBox').classList.add('hidden');
    document.getElementById('quizNextBtn').classList.add('hidden');
    document.getElementById('quizHintBtn').onclick = () => showHint(q.hint);
}

function showHint(hintText) {
    const hintBox = document.getElementById('quizHintBox');
    const textEl = document.getElementById('quizHintText');
    textEl.innerText = hintText;
    hintBox.classList.remove('hidden');
}

function selectAnswer(selectedIndex) {
    const questions = quizQuestions[currentCategory];
    const q = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.quiz-opt-btn');

    // Disable all options after selection
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
            btn.classList.add('correct');
        }
        if (i === selectedIndex && i !== q.correct) {
            btn.classList.add('incorrect');
        }
    });

    if (selectedIndex === q.correct) {
        quizScore += 1;
        userXP += 50;
        updateXPDisplay();

        if (window.confetti) {
            window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
    }

    const nextBtn = document.getElementById('quizNextBtn');
    nextBtn.classList.remove('hidden');
    nextBtn.onclick = () => {
        currentQuestionIndex++;
        renderQuestion();
    };
}

function finishQuiz() {
    const quizCard = document.getElementById('activeQuizCard');
    const questions = quizQuestions[currentCategory];
    const total = questions.length;
    const percentage = Math.round((quizScore / total) * 100);

    quizCard.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
            <h2 style="font-family: var(--font-heading); margin-bottom: 8px;">¡Desafío Completado!</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">Obtuviste <strong>${quizScore} de ${total}</strong> respuestas correctas (${percentage}%).</p>
            <div style="font-size: 1.2rem; font-weight: 700; color: #fbbf24; margin-bottom: 24px;">+${quizScore * 50} XP Ganados ⚡</div>
            <button class="btn btn-primary" onclick="location.reload()"><i data-lucide="rotate-ccw"></i> Volver a Intentar</button>
        </div>
    `;

    checkNoteUnlocks();
}

function checkNoteUnlocks() {
    let unlockedCount = 0;
    const notes = getLoveNotes();

    // Check XP condition
    if (userXP >= 150) notes[0].unlocked = true;
    if (userXP >= 250) notes[1].unlocked = true;
    if (userXP >= 350) notes[2].unlocked = true;
    if (userXP >= 450) notes[3].unlocked = true;
    if (userXP >= 500) notes[4].unlocked = true;

    saveLoveNotes(notes);
    renderLoveNotes();
}

function getLoveNotes() {
    const stored = localStorage.getItem('mathverse_love_notes');
    return stored ? JSON.parse(stored) : defaultLoveNotes;
}

function saveLoveNotes(notes) {
    localStorage.setItem('mathverse_love_notes', JSON.stringify(notes));
}

function renderLoveNotes() {
    const grid = document.getElementById('notesGrid');
    if (!grid) return;

    const notes = getLoveNotes();
    grid.innerHTML = '';

    let unlockedTotal = 0;

    notes.forEach(note => {
        if (note.unlocked) unlockedTotal++;
        const card = document.createElement('div');
        card.className = `note-card ${note.unlocked ? 'unlocked' : 'locked'}`;

        card.innerHTML = `
            <div class="note-header">
                <span class="note-icon">${note.unlocked ? note.icon : '🔒'}</span>
                <span class="note-title">${note.title}</span>
            </div>
            <p class="note-body">
                ${note.unlocked ? note.text : `🔒 <em>Desbloquea este mensaje completando el logro: "${note.req}"</em>`}
            </p>
        `;
        grid.appendChild(card);
    });

    const badge = document.getElementById('loveNotesBadge');
    if (badge) badge.innerText = `${unlockedTotal} / ${notes.length}`;
}
