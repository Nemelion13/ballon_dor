from flask import Flask, render_template
import json

app = Flask(__name__)

def calculate_score(player, weights):
    """Calcule le score total d'un joueur selon ses stats et le barème."""
    score = 0
    for key, val in player['stats'].items():
        score += val * weights.get(key, 0)
    return round(score, 1)

@app.route('/')
def index():
    # 1. Charger les paramètres
    with open('scoring_system.json', 'r', encoding='utf-8') as f:
        system = json.load(f)
        
    with open('players_data.json', 'r', encoding='utf-8') as f:
        players = json.load(f)
        
    # 2. Appliquer les calculs mathématiques
    for p in players:
        p['score'] = calculate_score(p, system['weights'])
        
    # 3. Trier du meilleur score au moins bon
    players = sorted(players, key=lambda x: x['score'], reverse=True)
    
    # 4. Assigner le rang officiel
    for i, p in enumerate(players):
        p['rank'] = i + 1

    # 5. Inverser la liste pour l'animation (révéler le plus bas classé en premier)
    players.reverse()
    
    return render_template('index.html', players=players)

if __name__ == '__main__':
    app.run(debug=True)