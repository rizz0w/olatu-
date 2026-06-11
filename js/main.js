/* ── FALLING HEARTS ──────────────────────────────────────── */
(function spawnHearts() {
    const canvas = document.getElementById('hearts-canvas');
    const symbols = ['♥', '❤', '💕', '💗', '💓', '🌸', '✿'];
    const colors = ['#f9a8c9', '#f472a8', '#d63a6e', '#ffb3cc', '#ff8fab'];

    function createHeart() {
        const el = document.createElement('span');
        el.className = 'heart';
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
        el.style.color = colors[Math.floor(Math.random() * colors.length)];
        const dur = 6 + Math.random() * 8;
        el.style.animationDuration = dur + 's';
        el.style.animationDelay = (Math.random() * 4) + 's';
        canvas.appendChild(el);
        setTimeout(() => el.remove(), (dur + 4) * 1000);
    }

    for (let i = 0; i < 18; i++) createHeart();
    setInterval(createHeart, 700);
})();

const startAudio = () => {
    const audio = new Audio('assets/audio/sweet.mp3');
    audio.play();
}

/* ── NO BUTTON – ESCAPE LOGIC ────────────────────────────── */
const btnNo = document.getElementById('btn-no');
let noAnchored = false;

function anchorAndEscape() {
    if (!noAnchored) {
        const r = btnNo.getBoundingClientRect();
        btnNo.style.position = 'fixed';
        btnNo.style.left = r.left + 'px';
        btnNo.style.top = r.top + 'px';
        btnNo.style.width = r.width + 'px';
        btnNo.style.margin = '0';
        btnNo.style.transition = 'left 0.22s cubic-bezier(0.22,1,0.36,1), top 0.22s cubic-bezier(0.22,1,0.36,1)';
        noAnchored = true;
        document.getElementById('btn-row').style.justifyContent = 'center';
    }
    escapeBtn();
}

function escapeBtn() {
    const margin = 16;
    const bw = btnNo.offsetWidth;
    const bh = btnNo.offsetHeight;
    const maxX = window.innerWidth - bw - margin;
    const maxY = window.innerHeight - bh - margin;
    btnNo.style.left = (margin + Math.random() * maxX) + 'px';
    btnNo.style.top = (margin + Math.random() * maxY) + 'px';
}

btnNo.addEventListener('mouseenter', anchorAndEscape);
btnNo.addEventListener('touchstart', anchorAndEscape, { passive: true });
btnNo.addEventListener('click', anchorAndEscape);


/* ── YES BUTTON CORREGIDO ─────────────────────────────────── */
document.getElementById('btn-yes').addEventListener('click', () => {
    startAudio();
    launchConfetti();

    const proposal = document.getElementById('screen-proposal');
    proposal.style.opacity = '0';
    proposal.style.transform = 'scale(0.96)';

    setTimeout(() => {
        proposal.classList.add('hidden');


        const final = document.getElementById('screen-final');
        final.classList.remove('hidden');
        final.style.opacity = '0';
        final.style.transform = 'scale(0.96)';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                final.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                final.style.opacity = '1';
                final.style.transform = 'scale(1)';

                setTimeout(() => {
                    const envelope = document.getElementById('envelope');
                    const letter = envelope.querySelector('.letter');

                    // SOLUCIÓN: Alto automático basado en el contenido real para eliminar el gap
                    letter.style.height = 'auto';
                    const letterHeight = letter.offsetHeight;

                    // Desplazamiento exacto dejando solo un leve margen dentro del sobre
                    envelope.style.setProperty('--letter-ty', -(letterHeight - 25) + 'px');
                    envelope.classList.add('open');

                    // Corazón desaparece cuando la carta está totalmente visible
                    setTimeout(() => {
                        envelope.querySelector('.heart-burst').classList.add('fade-out');
                    }, 1400);
                }, 600);
            });
        });
    }, 700);
});

/* ── CONFETTI BURST ─────────────────────────────────────── */
function launchConfetti() {
    const colors = ['#f9a8c9', '#f472a8', '#d63a6e', '#ff8fab', '#ffcce7', '#ff4d88'];
    for (let i = 0; i < 70; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        p.style.left = (15 + Math.random() * 70) + 'vw';
        p.style.top = (5 + Math.random() * 35) + 'vh';
        p.style.width = (6 + Math.random() * 8) + 'px';
        p.style.height = (6 + Math.random() * 8) + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
        p.style.animationDelay = (Math.random() * 0.5) + 's';
        p.style.animationDuration = (1.2 + Math.random() * 0.8) + 's';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2500);
    }
}