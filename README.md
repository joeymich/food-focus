## Dev Setup

### Clone the Repository
`git clone https://github.com/joeymich/food-focus.git`

### Install Docker & Docker compose
Check to see if you have docker compose installed `docker compose --version`

If not, follow the [instructions](https://docs.docker.com/compose/install/) from Docker

### Create a symbolic link to the development docker compose configuration file
`ln -s compose/dev/compose.yaml compose.yaml`
- To point compose.yaml to a different file be sure to add `-f`
- ie. `ln -sf compose/prod/compose.yaml compose.yaml`

### Run 
`docker compose up -d`

`docker compose logs -f`

### Applications
- Port 80, the frontend React application
  - http://localhost
- Port 8000, the FastAPI backend application
  - http://localhost:8000
- Port 8080, adminer (tool to run sql commands and view tables)
  - http://localhost:8080
  - Login Info
    - System: PostgreSQL
    - Server: db
    - Username: postgres
    - Password: password
    - Database: postgres


## Backend - To start Developing
- Navigate to the backend with `cd backend`
- run `pip install pipreqs` or `pip install -r requirements.txt` to install the python dependencies

## Frontend - To start Developing
- Navigate to the frontend with `cd frontend`
- run `npm i` or `npm install` then run `npm run build`
