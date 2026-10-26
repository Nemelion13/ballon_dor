document.getElementById('start-btn').addEventListener('click', function() {
    this.style.display = 'none'; // Fait disparaître le bouton
    
    const cards = document.querySelectorAll('.player-card');
    let delay = 0;
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            // 1. Fait apparaître le bloc de classement (l'image est encore noire et tourne)
            card.classList.add('visible');
            card.classList.remove('hidden');
            
            const img = card.querySelector('.player-photo');
            const info = card.querySelector('.info');
            
            // 2. Après 2.5 secondes de suspense, on révèle l'image et le nom
            setTimeout(() => {
                img.classList.remove('spinning');
                img.classList.add('revealed');
                info.style.opacity = 1; // Révèle le texte
            }, 2500);
            
        }, delay);
        
        // 3. Attendre 5 secondes entre chaque annonce de joueur pour faire monter la pression
        delay += 5000; 
    });
});