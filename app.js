const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
   
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Enjay@crm123',
    database: 'infeedo_test'
});

connection.connect((error) =>{
    if(error) throw error;
    console.log('MySql connection established...');
});

// 1. API to create a task
app.post('/api/tasks',(request, response) => {
    let data = {title: request.body.title, description: request.body.description, status: request.body.status};
    
    let sqlQuery = "INSERT INTO tasks SET ?";
    
    let query = connection.query(sqlQuery, data,(error, results) => {
        if(error) throw error;
        response.send(apiResponse(results));
    });
});

// 2. API to update a task
app.put('/api/tasks/:id',(request, response) => {
    let sqlQuery = "UPDATE tasks SET title='"+request.body.title+"', description='"+request.body.description+"', status='"+request.body.status+"' WHERE id="+request.params.id;
    
    let query = connection.query(sqlQuery, (error, results) => {
      if(error) throw error;
      response.send(apiResponse(results));
    });
});

// 3. API to get all task with pagination
app.get('/api/tasks',(request, response) => {
    const page = request.query.page || 1;
    const perPage = request.query.perPage || 10;
    const offset = (page - 1) * perPage;

    let query = connection.query(
        `SELECT * FROM tasks LIMIT ${perPage} OFFSET ${offset}`,
        (error, results) => {
            if (error) {
                console.error('Error executing MySQL query:', error);
                response.status(500).json({ error: 'Internal Server Error' });
                return;
            }
        
            response.json(results);
        }
    );
});

// 4. API to get status metrics
app.get('/api/status',(request, response) => {
    let sqlQuery = "SELECT status, COUNT(1) as count FROM tasks GROUP BY status";
    
    let query = connection.query(sqlQuery, (error, results) => {
        if(error) throw error;
        response.send(apiResponse(results));
    });
});

function apiResponse(results){
    return JSON.stringify({"status": 200, "response": results});
}

app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});