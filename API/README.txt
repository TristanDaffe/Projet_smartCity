Lancer l'api

Avec docker compose :
 se placer dans le dossier "Projet_smartCity/API/src"
 lancer 'npm install --save-dev nodemon'
 se placer dans le dossier "Projet_smartCity"
 lancer la commande 'docker-compose up --build'

Sans docker compose :
    créer un container pour la base de données via la commande dans le fichier dockerDB.txt
    se placer dans le dossier 'src' 
    faire 'npm install'
    faire 'npm run dev'