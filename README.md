# CRUD API task with Nodejs and MySQL

Follow below steps to run the same:
- open terminal
- database name : infeedo_test
- username and password : as per your db (mine is root and pass respectively)
- change in connection if required
- mkdir task-app-node
- cd task-app-node
- npm init
- npm install --save express mysql body-parser
- make app.js file inside the task-node-app
- To run Node app :- node app.js

- Follow below ones for the API checking

**1. To create :**
- Method - POST
- http://localhost:3000/api/tasks
- Body raw data :
{
    "title": "Meeting Setup",
    "description": "Align items and slides before meeting",
    "status": "Assigned"
}

**2. To update :**
- Method - PUT
- http://localhost:3000/api/tasks/{id}
- Body raw data :
{
    "title": "Meeting Setup",
    "description": "Align items and slides before meeting",
    "status": "Assigned"
}

**3. For get all with pagination :**
- Method - GET
- http://localhost:3000/api/tasks?page=1&perPage=2

**4. Get Status Metrics**
- Method - GET
- http://localhost:3000/api/status
