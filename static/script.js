const startButton = document.getElementById('start-btn');
const rerunButton = document.getElementById('rerun');
const ceremonyMusic = document.getElementById('ceremony-music');
const scheduledAnimations = [];

rerunButton.style.display = 'none';

startButton.addEventListener('click', function() {
    this.style.display = 'none';
    ceremonyMusic.currentTime = 20;
    ceremonyMusic.play().catch((error) => {
        console.error('Impossible de lancer la musique :', error);
    });

    let delay = 0;
    const cards = document.querySelectorAll('.player-card');
    cards.forEach((card, index) => {
        const showTimer = setTimeout(() => {
            card.classList.add('visible');
            card.classList.remove('hidden');

            const image = card.querySelector('.player-photo');
            const info = card.querySelector('.info');
            const revealTimer = setTimeout(() => {
                image.classList.remove('spinning');
                image.classList.add('revealed');
                info.style.opacity = 1;
                if (index === cards.length - 1) {
                    rerunButton.style.display = 'inline-block';
                }
            }, 2500);
            scheduledAnimations.push(revealTimer);
        }, delay);

        scheduledAnimations.push(showTimer);
        delay += 5000;
    });
});

rerunButton.addEventListener('click', function() {
    scheduledAnimations.forEach(clearTimeout);
    scheduledAnimations.length = 0;
    this.style.display = 'none';
    ceremonyMusic.pause();
    ceremonyMusic.currentTime = 0;

    document.querySelectorAll('.player-card').forEach((card) => {
        card.classList.remove('visible');
        card.classList.add('hidden');

        const image = card.querySelector('.player-photo');
        image.classList.remove('revealed');
        image.classList.add('spinning');
        card.querySelector('.info').style.opacity = 0;
    });

    startButton.style.display = '';
});
