# Motorway Take Home Backend

Install requirements:

- docker (https://docs.docker.com/get-docker/)

### Start Service:

- docker-compose up

##### Endpoint

The endpoint is accessible locally on port 3000, http://localhost:3000/vehicles/1/state?timestamp=2022-09-10T10%3A23%3A54.000Z . The swagger validator is ensuring that the timestamp is urlencoded, so the special characters in the timestamp need to be urlencoded.

**note:**
By default the service runs on 3000 and database runs on port `5432`. Both ports are expoded locally. if you want to change this you can update `docker-compose.yml`.

### Component Tests:

Run the following commands to run component tests locally:

- npm install
- docker-compose up db -d
- npm t
