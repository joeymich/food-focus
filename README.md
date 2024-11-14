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

### Setup Database
- Download and extract `brandedDownload.json` from US Department of Agriculture JSON [file of branded foods](https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_branded_food_json_2024-04-18.zip)
- Copy `brandedDownload.json` to `backend/data/brandedDownload.json`
- `docker compose exec -it backend sh`
- `python scripts/setup_db.py`

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

### Installing the Dependencies:
#### Backend:
Navigate to the backend with `cd backend` from the food-focus directory

Make sure to have python installed with `python`

If Python is not installed go to https://www.python.org/downloads/ and follow the instructions

Run `pip install -r requirements.txt` on your local machine

### Frontend:
Navigate to the frontend with `cd frontend` from the food-focus directory

Run `npm i` or `npm install` on your local machine


## Production Setup
Production will be at [foodfocus.pro](https://foodfocus.pro)

### Setup SSH for Digital Ocean VM
[https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/)

### Run deployment script
Script will
- (1) Build docker images
- (2) Push them to docker hub
- (3) SSH into vm and pull latest images
- (4) Run newest images
