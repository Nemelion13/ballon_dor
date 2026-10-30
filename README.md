# Simulation du Ballon d'Or

Petite application web Flask qui calcule un classement de joueurs à partir de statistiques et d'un barème configurable. Le classement est ensuite révélé progressivement dans le navigateur, avec des animations et une musique d'accompagnement.

## Fonctionnalités

- Calcul automatique d'un score pondéré pour chaque joueur.
- Classement déterminé par le score, du meilleur au moins bon.
- Révélation animée des joueurs, du dernier au premier : le joueur classé premier apparaît en dernier.
- Lecture en boucle de `JAWNY-Honeypie.mp3` pendant la simulation. La lecture commence à 20 secondes et s'arrête lorsque la simulation est recommencée.
- Images des joueurs chargées depuis les adresses indiquées dans les données JSON.
- Recommencement de la simulation après la révélation du classement complet.

## Prérequis

- Python installé sur la machine.
- Une connexion Internet pour charger les images hébergées en ligne.
- Un navigateur récent prenant en charge les formats audio MP3.

## Installation et lancement

Ouvrir PowerShell dans le dossier du projet, puis créer et activer un environnement virtuel :

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Installer Flask :

```powershell
python -m pip install Flask
```

Lancer l'application depuis le dossier contenant `app.py` :

```powershell
python app.py
```

Ouvrir ensuite [http://127.0.0.1:5000](http://127.0.0.1:5000) dans un navigateur. Le serveur intégré de Flask est destiné au développement local.

Si l'activation de l'environnement virtuel est indisponible, utiliser directement son interpréteur :

```powershell
.\.venv\Scripts\python.exe -m pip install Flask
.\.venv\Scripts\python.exe app.py
```

## Déroulement de la simulation

1. Flask charge `scoring_system.json` et `players_data.json` lorsqu'il reçoit une requête sur `/`.
2. Le score de chaque joueur est calculé, puis les joueurs sont classés par score décroissant et reçoivent un rang.
3. La liste est inversée pour révéler les joueurs du moins bon score au meilleur.
4. Le bouton « Révéler le Classement » démarre la musique à 20 secondes et lance l'animation des cartes. Une carte commence à apparaître toutes les 5 secondes; son image et ses informations sont révélées après 2,5 secondes.
5. Le bouton « Recommencer la simulation » apparaît après la révélation de la dernière carte. Il arrête la musique, la remet au début, masque les cartes et réaffiche le bouton de départ.

## Calcul des scores

Le calcul multiplie chaque statistique par son poids correspondant, puis additionne les produits. Les poids sont définis dans `scoring_system.json`. Une statistique sans poids correspondant contribue pour zéro. Le résultat est arrondi à une décimale.

Exemple simplifié :

```text
score = buts × poids_des_buts
      + passes_decisives × poids_des_passes
      + cartons_jaunes × poids_des_cartons_jaunes
      + ...
```

Le barème actuel est le suivant :

| Statistique | Poids |
| --- | ---: |
| `buts` | 2 |
| `buts non europe` | 1 |
| `passes_decisives` | 1,5 |
| `passes_decisives_ne` | 0,75 |
| `coupe_du_monde` | 50 |
| `ligue_des_champions` | 30 |
| `championnat` | 15 |
| `homme_du_match` | 5 |
| `carton_jaune` | -2 |
| `carton_rouge` | -7 |
| `cdm_best` | 60 |
| `ldc_best` | 40 |
| `champ_best` | 25 |

Pour modifier la pondération, changer les valeurs dans `scoring_system.json`. Les clés doivent correspondre aux clés présentes dans l'objet `stats` des joueurs.

## Modifier les joueurs

`players_data.json` contient un tableau de joueurs. Chaque joueur doit avoir un nom, une équipe, une adresse d'image et un objet `stats` :

```json
{
  "name": "Nom du joueur",
  "team": "Nom de l'équipe",
  "image": "https://exemple.com/image.jpg",
  "stats": {
    "buts": 20,
    "passes_decisives": 8,
    "carton_jaune": 2
  }
}
```

Les champs `score` et `rank` sont calculés par l'application; il n'est pas nécessaire de les ajouter dans le fichier JSON. Les images étant distantes, elles nécessitent une connexion Internet et peuvent ne plus être disponibles si leur hébergeur change l'adresse ou les permissions.

## Structure du projet

```text
ballon_dor/
├── app.py                       # Routes Flask et calcul des scores
├── players_data.json            # Joueurs, équipes, images et statistiques
├── scoring_system.json          # Poids des statistiques
├── README.md                    # Documentation du projet
├── static/
│   ├── JAWNY-Honeypie.mp3        # Musique de la simulation
│   ├── script.js                 # Animation et interactions des boutons
│   ├── style.css                 # Mise en forme et animations CSS
│   └── favicon.ico               # Icône du site
└── templates/
    └── index.html                # Page HTML rendue par Flask et Jinja
```

## Dépannage

- **Flask est introuvable** : activer `.venv`, puis exécuter `python -m pip install Flask`.
- **Une image ne s'affiche pas** : vérifier l'adresse `image` du joueur et l'accès Internet; certains hébergeurs bloquent les requêtes externes.
- **La musique ne se lance pas** : vérifier que le fichier s'appelle exactement `JAWNY-Honeypie.mp3` et se trouve dans `static/`. La lecture est déclenchée par le clic utilisateur sur le bouton de départ.
- **Le classement ne se charge pas** : vérifier la syntaxe JSON des deux fichiers de données et lancer `app.py` depuis le dossier du projet.