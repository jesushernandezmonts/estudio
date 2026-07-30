// Main Application Controller for Boraland Math 💜
let audioCtx = null;
let isLofiPlaying = false;
let lofiInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    if (window.lucide) window.lucide.createIcons();

    loadCustomization();

    renderCurriculum('diferencial', 'diferencialLessons');
    renderCurriculum('integral', 'integralLessons');
    renderCurriculum('edos', 'edosLessons');

    initNavigation();

    Visualizers.initTangentLab();
    Visualizers.initRiemannLab();
    Visualizers.initEdoLab();
    Visualizers.initFreeLab();

    updateXPDisplay();
    renderLoveNotes();
    initSearch();
    initLofiPlayer();

    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    const custBtn = document.getElementById('customizeBtn');
    if (custBtn) custBtn.addEventListener('click', openCustomModal);
}

// NAVIGATION
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchView(target);
            // Close mobile drawer if open
            const sidebar = document.getElementById('sidebar');
            if (sidebar && window.innerWidth <= 850) sidebar.classList.remove('open');
        });
    });
}

function switchView(viewName) {
    const panels = document.querySelectorAll('.view-panel');
    panels.forEach(p => p.classList.remove('active'));

    const targetPanel = document.getElementById(`view-${viewName}`);
    if (targetPanel) targetPanel.classList.add('active');

    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        if (btn.getAttribute('data-target') === viewName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderMathInContainer(targetPanel);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CURRICULUM RENDERER WITH SUPER CHIDO EXPLANATIONS
function renderCurriculum(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const lessons = mathCurriculum[category];
    if (!lessons) return;

    container.innerHTML = '';
    const progress = getProgress();

    lessons.forEach(lesson => {
        const isDone = progress[lesson.id] || false;
        const card = document.createElement('div');
        card.className = 'lesson-card bts-border';

        card.innerHTML = `
            <div class="lesson-header">
                <div class="lesson-title-area">
                    <span class="lesson-num">${lesson.id.split('-')[1]}</span>
                    <h3>${lesson.title}</h3>
                </div>
                <span class="badge bts-badge">${lesson.badge}</span>
            </div>

            <div class="lesson-content">
                <p><strong>Intuición BTS:</strong> ${lesson.intro}</p>

                <div class="chido-explanation-box">
                    ${lesson.chidoExplanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                </div>
                
                <div class="formula-box">
                    <p style="margin-bottom: 6px; font-weight:600; color: #a855f7;">Fórmula y Notación Oficial:</p>
                    <p>${lesson.concept}</p>
                    <div style="margin-top: 10px; font-size: 1.1rem;">$$${lesson.formula}$$</div>
                </div>

                <div class="example-box">
                    <div class="example-title">📝 Ejemplo Desarrollado Paso a Paso:</div>
                    <p style="white-space: pre-line;">${lesson.example.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
                </div>

                <p style="margin-top: 14px; font-weight:600; color: #f472b6;">${lesson.takeaway.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
            </div>

            <div class="lesson-footer">
                <button class="btn btn-complete ${isDone ? 'done' : ''}" onclick="toggleLessonComplete('${lesson.id}', '${category}')">
                    <i data-lucide="${isDone ? 'check-circle-2' : 'circle'}"></i>
                    ${isDone ? 'Lección Completada 💜' : 'Marcar como Completada (+30 ARMY XP)'}
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    renderMathInContainer(container);
}

function renderMathInContainer(container) {
    if (window.renderMathInElement && container) {
        window.renderMathInElement(container, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
}

// PROGRESS SYSTEM
function getProgress() {
    const stored = localStorage.getItem('mathverse_progress');
    return stored ? JSON.parse(stored) : {};
}

function toggleLessonComplete(lessonId, category) {
    const progress = getProgress();
    const isNowDone = !progress[lessonId];
    progress[lessonId] = isNowDone;
    localStorage.setItem('mathverse_progress', JSON.stringify(progress));

    if (isNowDone) {
        userXP += 30;
        updateXPDisplay();
        playKawaiiChime();
        if (window.confetti) {
            window.confetti({ particleCount: 50, spread: 60 });
        }
    }

    updateStats();

    const mapContainer = {
        diferencial: 'diferencialLessons',
        integral: 'integralLessons',
        edos: 'edosLessons'
    };
    renderCurriculum(category, mapContainer[category]);
    checkNoteUnlocks();
}

function updateStats() {
    const progress = getProgress();
    const diffDone = mathCurriculum.diferencial.filter(l => progress[l.id]).length;
    const intDone = mathCurriculum.integral.filter(l => progress[l.id]).length;
    const edoDone = mathCurriculum.edos.filter(l => progress[l.id]).length;

    document.getElementById('progDiff').style.width = `${(diffDone / 4) * 100}%`;
    document.getElementById('statDiffText').innerText = `${diffDone} / 4 lecciones completadas`;

    document.getElementById('progInt').style.width = `${(intDone / 4) * 100}%`;
    document.getElementById('statIntText').innerText = `${intDone} / 4 lecciones completadas`;

    document.getElementById('progEdo').style.width = `${(edoDone / 4) * 100}%`;
    document.getElementById('statEdoText').innerText = `${edoDone} / 4 lecciones completadas`;
}

// MAGIC SHOP DAILY NOTE REVEAL
function revealNewMagicNote() {
    const quoteEl = document.getElementById('dailyMagicNote');
    if (!quoteEl) return;

    const randomIndex = Math.floor(Math.random() * magicShopMessages.length);
    quoteEl.innerText = magicShopMessages[randomIndex];
    playKawaiiChime();
}

// LO-FI MUSIC PLAYER (WEB AUDIO SYNTH LO-FI PIANO)
function initLofiPlayer() {
    const playBtn = document.getElementById('lofiPlayBtn');
    if (!playBtn) return;

    playBtn.addEventListener('click', () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (isLofiPlaying) {
            stopLofi();
        } else {
            startLofi();
        }
    });
}

function startLofi() {
    isLofiPlaying = true;
    const statusEl = document.getElementById('lofiStatus');
    if (statusEl) statusEl.innerText = 'Reproduciendo Lo-Fi 💜';

    // Pentatonic BTS Lo-Fi Melody Frequencies
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

    lofiInterval = setInterval(() => {
        if (!isLofiPlaying || !audioCtx) return;
        const note = notes[Math.floor(Math.random() * notes.length)];
        playPianoNote(note, 1.2);
    }, 800);
}

function stopLofi() {
    isLofiPlaying = false;
    if (lofiInterval) clearInterval(lofiInterval);
    const statusEl = document.getElementById('lofiStatus');
    if (statusEl) statusEl.innerText = 'Click para escuchar';
}

function playPianoNote(freq, duration) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playKawaiiChime() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    playPianoNote(523.25, 0.4);
    setTimeout(() => playPianoNote(659.25, 0.5), 100);
    setTimeout(() => playPianoNote(783.99, 0.6), 200);
}

// PERSONALIZATION
function openCustomModal() {
    const modal = document.getElementById('customModal');
    if (modal) modal.classList.remove('hidden');
}

function closeCustomModal() {
    const modal = document.getElementById('customModal');
    if (modal) modal.classList.add('hidden');
}

function saveCustomization() {
    const nameInput = document.getElementById('customNameInput').value.trim();
    const msgInput = document.getElementById('customMsgInput').value.trim();

    if (nameInput) localStorage.setItem('mathverse_user_name', nameInput);
    if (msgInput) localStorage.setItem('mathverse_user_msg', msgInput);

    loadCustomization();
    closeCustomModal();

    if (window.confetti) window.confetti({ particleCount: 40 });
}

function loadCustomization() {
    const name = localStorage.getItem('mathverse_user_name') || 'ARMY Estrella 💜';

    const nameEl = document.getElementById('userNameDisplay');
    const welcomeEl = document.getElementById('welcomeHeading');
    const personalizedSub = document.getElementById('personalizedSub');

    if (nameEl) nameEl.innerText = name;
    if (welcomeEl) welcomeEl.innerText = `¡Hola, ${name}! 👋💜`;
    if (personalizedSub) personalizedSub.innerText = `I Purple You! BTS & ${name} 💜`;
}

// GLOBAL SEARCH
function initSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;

    searchInput.addEventListener('keyup', e => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) return;

        const allLessons = [
            ...mathCurriculum.diferencial.map(l => ({ ...l, cat: 'diferencial' })),
            ...mathCurriculum.integral.map(l => ({ ...l, cat: 'integral' })),
            ...mathCurriculum.edos.map(l => ({ ...l, cat: 'edos' }))
        ];

        const match = allLessons.find(l => 
            l.title.toLowerCase().includes(query) || 
            l.intro.toLowerCase().includes(query) ||
            l.concept.toLowerCase().includes(query)
        );

        if (match && e.key === 'Enter') {
            switchView(match.cat);
            alert(`🔍 Concepto BTS encontrado en ${match.cat.toUpperCase()}: "${match.title}"`);
        }
    });
}
