function launchConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    const colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#00b894', '#fdcb6e', '#e17055', '#74b9ff', '#a29bfe'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        piece.style.animationDelay = (Math.random() * 1.5) + 's';
        piece.style.width = (Math.random() * 10 + 6) + 'px';
        piece.style.height = (Math.random() * 10 + 6) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(piece);
    }

    setTimeout(() => { container.innerHTML = ''; }, 5000);
}

function launchTrophyConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    const colors = ['#FFD700', '#FFC107', '#FF9800', '#FF5722', '#ffffff', '#a29bfe'];

    function burst() {
        for (let i = 0; i < 40; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = (Math.random() * 3 + 3) + 's';
            piece.style.width = (Math.random() * 14 + 8) + 'px';
            piece.style.height = (Math.random() * 14 + 8) + 'px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(piece);
        }
    }

    burst();
    setTimeout(burst, 1000);
    setTimeout(burst, 2000);
    setTimeout(() => { container.innerHTML = ''; }, 7000);
}

function animateCorrect() {
    const card = document.getElementById('puzzle-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'pulse 0.5s ease';
}

function animateWrong() {
    const card = document.getElementById('puzzle-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'shake 0.5s ease';
}

function updateDifficultyBadge(level) {
    const badge = document.getElementById('difficulty-badge');
    let text, color;

    if (level <= 15) {
        text = 'Warm Up';
        color = 'rgba(0, 184, 148, 0.7)';
    } else if (level <= 30) {
        text = 'Getting Tricky';
        color = 'rgba(108, 92, 231, 0.7)';
    } else if (level <= 50) {
        text = 'Brain Stretch';
        color = 'rgba(253, 203, 110, 0.7)';
    } else if (level <= 70) {
        text = 'Mind Bend';
        color = 'rgba(253, 121, 168, 0.7)';
    } else if (level <= 90) {
        text = 'Brain Melter';
        color = 'rgba(225, 112, 85, 0.7)';
    } else {
        text = 'Final Boss';
        color = 'rgba(255, 0, 0, 0.8)';
    }

    badge.textContent = text;
    badge.style.background = color;

    // Update background gradient based on tier
    const gameScreen = document.getElementById('screen-game');
    const gradients = {
        'Warm Up': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'Getting Tricky': 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
        'Brain Stretch': 'linear-gradient(135deg, #e17055 0%, #fdcb6e 100%)',
        'Mind Bend': 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
        'Brain Melter': 'linear-gradient(135deg, #d63031 0%, #e17055 100%)',
        'Final Boss': 'linear-gradient(135deg, #2d3436 0%, #d63031 100%)'
    };
    gameScreen.style.background = gradients[text] || gradients['Warm Up'];
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}
