# JEU DU PENDU

## Configuration du projet

### Cloner le projet
### Créer une base de donnée "pendu" et ajouter un nouvel utilisateur
### Créer et configurer un fichier d'environnement (.env.local)
### `composer install`
### Installer si besoin https://github.com/FriendsOfSymfony/FOSJsRoutingBundle
### `php bin/console d:m:m` pour jouer les migrations
### Insérer les jeux de données dans la base de donnée depuis "/db/pendu_word.sql"

***

## Lancer un serveur local
`php -S localhost:8000 -t public -d 'display_errors=1'`