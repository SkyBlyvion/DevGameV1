Introduction

"DevGame Intranet Console" est un jeu incrémental rétro au style terminal, 
inspiré par des jeux comme Cookie Clicker et Adventure Capitalist. 
Le joueur incarne un développeur dont le but est de devenir le plus riche 
en réalisant des projets, en améliorant son équipement et en optimisant son rythme de travail. 
Le jeu est développé en HTML, CSS et JavaScript sans l'utilisation de bibliothèques externes.

Objectifs du Projet

    Créer une expérience de jeu rétro avec une esthétique de terminal vert sur fond noir.
    Offrir une mécanique de jeu addictive basée sur l'incrémentation et la progression continue.
    Permettre aux joueurs d'interagir avec le jeu via des actions simples et intuitives.
    Étendre le jeu avec de nouvelles fonctionnalités comme la recherche d'emploi, une loterie améliorée et des améliorations supplémentaires.

Actions de l'Utilisateur
Statistiques

    Consulter les statistiques :
        Argent : Voir le montant d'argent actuel.
        Argent par pulse : Voir combien d'argent est gagné à chaque pulse.
        Vitesse du pulse : Voir l'intervalle de temps entre chaque pulse.
        
Recherche d'Emploi 

    Rechercher un emploi :
        Action : Cliquer sur le bouton "Search for a job" dans la nouvelle section en dessous des statistiques.
        Emplois disponibles :
            Développeur Front-end
            Développeur Back-end
            Développeur Full Stack
            Analyste Sécurité
            ...
        Limitation : Le joueur peut avoir jusqu'à 3 emplois en même temps.
        Effets :
            Chaque emploi offre des bonus spécifiques (ex : augmentation de l'argent par pulse + bonus projets .) 
            [Non implementé accès à des projets spéciaux, etc..]

Projets

    Bonus from Jobs : Les emplois augmentent l'argent gagné par project en fonction du job

    Prendre un projet rapide :
        Action : Cliquer sur le bouton "Take Quick Project".
        Coût : 10$.
        Durée : 7,5 secondes.
        Récompense : 20$ après la fin du projet.

    Démarrer un projet :
        Action : Cliquer sur le bouton "Start Project".
        Coût : 50$.
        Durée : 15 secondes.
        Récompense : 100$ après la fin du projet.

Améliorations

    Améliorer l'ordinateur :
        Action : Cliquer sur le bouton "Upgrade Computer".
        Coût : 100$.
        Effet : Augmente l'argent gagné par pulse de +1 (+1 Pulse).

Boutique

    Acheter du café :
        Action : Cliquer sur le bouton "Buy Coffee".
        Coût : 5$.
        Effet : Augmente le taux de gain de 3% (multiplicateur de 1.03 sur l'argent par pulse).

    Acheter une boisson énergisante :
        Action : Cliquer sur le bouton "Buy Energy Drink".
        Coût : 35$.
        Effet : Réduit la vitesse du pulse de 5% (multiplicateur de 0.95 sur la vitesse du pulse).

Loterie

    Participer à la loterie :
        Action : Cliquer sur le bouton "Buy a ticket".
        Coût : 1$ par ticket.
        Chance de gagner : 5% de chances de gagner.
        Récompense : 100$ si le joueur gagne.
        Statistiques :
            Argent dépensé : Suivi du total dépensé en loterie.
            Pourcentage de gain : Calcul du ratio de gains par rapport aux dépenses.

Menu

    Game Management:
        Save game to json
        Import game from json
        Export game to json
        Reset game

    About : 
        Copyright : 2024 SkyBlyvion
        License : MIT
        Github : SkyBlyvion
        Provided "AS IS"