const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    console.log("test");
    next();
})
 const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sql_hr',
    port: 3306
})

const createUser = async (req,res,next) => {
const {employee_id,first_name,last_name,job_title,monthly_salary,reporting_manager,office_id} = req.body;

const queryString = `insert into employees values(${employee_id},"${first_name}","${last_name}","${job_title}",${monthly_salary},${reporting_manager},${office_id})`;

const [results] = await connection.promise().query(queryString);

res.send({
    message: "Users Added Successfully",
    results
})
}

const getUser = async (req,res,next) =>{
    try{
        const [results] = await connection.promise().query("select * from employees");
        res.send({
            message: "Users Read Successfully",
            results
        });
    }catch(err){
        console.log(err);
    }
}

const updateUser = async (req,res,next) => {
    const {employee_id,first_name,last_name,job_title,monthly_salary,reporting_manager,office_id} = req.body;
    const queryString = `update employees set first_name="Sumit", last_name="Mane" where employee_id = 72913`;
    const [results] = await connection.promise().query(queryString);
    
    res.send({
        message: "Users Updated Successfully",
        results
    })
    }


    const deleteUser = async (req,res,next) => {
        const {employee_id,first_name,last_name,job_title,monthly_salary,reporting_manager,office_id} = req.body;
        const queryString = `delete from employees where employee_id = 75900`;
        const [results] = await connection.promise().query(queryString);
        
        res.send({
            message: "Users Deleted Successfully",
            results
        })
        }

/*app.get('/users', (req, res, next) =>{
 connection.query("SELECT * FROM employees", (err, results, fields)=>{
        res.send(results);
    })
})*/
app.get('/users',getUser);
app.post('/users',createUser);
app.put('/users', updateUser);
app.delete('/users', deleteUser);

app.listen(3000,console.log("Server Started"));
