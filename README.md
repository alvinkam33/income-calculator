# Income Calculator

CRUD API and web application built using MERN stack. User fills in field of study, age and gender, then the application will call a locally-hosted API to get data on all degrees, filter by user-requested fields, then calculate the accumulative income of each degree until retirement and visually display a recommendation based on which degree provides the most income.

The data is collected from “Characteristics and median employment income of
postsecondary graduates two years after graduation, by educational qualification and field of study” dataset from Statistics Canada, at https://doi.org/10.25318/3710012201-eng. It has been converted to JSON format and is found in `backend/data`.

# Degree API routes

### Create and Store Degree

`POST /degree/`

Required data params: name (String), gender (String), field (String), income_2018 (Number)

Creates and stores new degree into the database.

### Get All Degrees (optional filter)

`GET /degree/`

Optional URL params: field (String), gender (String)

Returns all degrees in the database. If one or both of the above params are specified, the API will filter results to match requested values. See example URL below:

`/degree/?field=Humanities&gender=male`

### Get Degree by ID

`GET /degree/:degreeId`

Required URL params: degreeId (String)

Returns degree of specified ID.

### Update Degree by Id

`PUT /degree/:degreeId`

Required URL params: degreeId (String)

Optional data params: name (String), gender (String), field (String), income_2018 (Number)

Updates degree of specified ID. The API will only update the degree with requested values, otherwise it will stay the same.

### Delete Degree by ID

`DELETE /degree/:degreeId`

Required URL params: degreeId (String)

Deletes degree of specified ID.

# Installations/Troubleshooting

Make sure to have MongoDB and Node (npm) downloaded:

MongoDB: https://www.mongodb.com/try/download/community

Node: https://nodejs.org/en/download/

If scripts run into errors, you may need to install these dependencies first:

Concurrently: `npm install -g concurrently`

React-scripts: `npm install -g react-scripts`

Nodemon: `npm install -g nodemon`

If on Windows, in `frontend/package.json`, change the following in the scripts:
```sh
"start": "PORT=3001 react-scripts start"
to
"start": "set PORT=3001 && react-scripts start"
```

# How to Run

From the root directory and in your command terminal,

1. Enter into frontend directory

```sh
cd frontend
```

2. Populate database (only need to run once)

```sh
npm run populate-db
```

The script will run `/backend/data/script.js`, which wipes existing data, takes the dataset from the JSON files, and creates and stores degrees into the mongoDB.

3. Build and run client and server

```sh
npm run dev
```

The script will automatically install all other dependencies and run both backend and frontend. 

The server is hosted on `http://localhost:3000/`.
The client is hosted on `http://localhost:3001/`.
