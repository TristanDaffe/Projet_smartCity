# Développement de Client Web avancé

## Prerequisites
- Having docker desktop installed
- Having a file editor (VS Code, Sublime Text...)

## Running this project using Docker-compose
- Open docker desktop
- Unzip the project in a folder.
- Once the project is unzipped navigate to Project > API > opent the **.env** file.
- Change the **DB_HOST** const to "BDsmartCityCompose" (which is the name of the container).
- Then, open a new terminal, navigate the root of the project and run the following command :

### `docker-compose up --build`

- Once it is done, a container named "BDsmartCityCompose" should be visible in docker desktop.

- Finally, open a browser and go to http://localhost:3000/ to see the project.
You will be redirected to the home page, where you can log in.

- To stop the project, use ctrl+c in the terminal, confirm and run the following command :

### `docker-compose down`

## Running this project without using Docker-compose
- Unzip the project in a folder.
- Once the project is unzipped, navigate to Project > API 
- Open docker desktop and run the following command (which can also be found in Project > API > dockerBD.txt) : 

### `docker run --name BDsmartCity -e POSTGRES_PASSWORD=password -e POSTGRES_USER=admin -e POSTGRES_DB=smartcity -p 5432:5432 -d postgres`

- Once it is done, a container named "BDsmartCity" should be visible in docker desktop. 
- Then, open a new terminal and navigate to Project > API
- Run the following command to install all the dependencies.:

### `npm install`

- Then, run the following command to initialize the database.:

### `npm run initDB`

- Run the following command to start the server:

### `npm run dev`
- In the terminal you should see "Example app listening at _**your ip adress**_".
- Then, navigate to Project > Back-Office > components > API > http.js and change the content of the **URL_API** const to your ip adress.
- Then, open a new terminal and navigate to Project > Back-Office and run the following command to install all the dependencies. :

### `npm install`

- Finally, run the following command to start the server:

### `npm start`
In the terminal you should see "Compiled successfully!".

- Finally, open a browser and go to http://localhost:3000/ to see the project.
You will be redirected to the home page, where you can log in.
- To stop the project, use ctrl+c in the API terminal, confirm and do the same in the Back-Office terminal.
- To stop the database container, open docker desktop and click on the "BDsmartCity" container, then click on "Stop" in the top right corner.
