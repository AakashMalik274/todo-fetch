const express = require("express");
const cors = require("cors");
const { writeFile, readFile } = require('fs');

const path = "./todos.json"

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json())

//fetch the todos
app.get('/',(req,res)=>{
    readFile(path,"utf8",(error,data)=>{
        if(error){
            if(error.code === 'ENOENT'){
                writeFile(path,JSON.stringify([],null,2),(error)=>{
                    if(error){
                        console.error('Error writing file:', error);
                        res.status(500).json({ message: 'Server Error' });
                        return;
                    }
                    res.json([]);
                });
            }
            console.error('Error reading file:', error);
            res.status(500).json({ message: 'Server Error' });
            return;
        }

        const todos = JSON.parse(data);
        res.json(todos);
    })
})
//create a new todo
app.post('/',(req,res)=>{
    readFile(path,"utf8",(error,data)=>{
        if(error){
            console.error('Error reading file:', err);
            res.status(500).json({ message: 'Server Error' });
            return;
        }        
        const todos = JSON.parse(data);
        
        let newTodo = {};
        newTodo.id = todos.length + 1; 
        newTodo.task = req.body.task;
        newTodo.completed = false;
        todos.push(newTodo);

        writeFile(path,JSON.stringify(todos,null,2),(err)=>{
            if(error){
                console.error('Error writing file:', err);
                res.status(500).json({ message: 'Server Error' });
                return;
            }
            res.json(todos);
        })
    })
})

//update a todo
app.put('/',(req,res)=>{
    readFile(path,'utf-8',(error,data)=>{
        if(error){
            console.error('Error reading file:', err);
            res.status(500).json({ message: 'Server Error' });
            return;
        }

        let todos = JSON.parse(data);

        todos.forEach(todo => {
            if(todo.id === req.body.id){
                if(req.body.markComplete){
                    todo.completed = true;
                }else{
                    todo.completed = false;
                }
            }
        });
        
        writeFile(path,JSON.stringify(todos,null,2),(err)=>{
            if(error){
                console.error('Error writing file:', err);
                res.status(500).json({ message: 'Server Error' });
                return;
            }
            res.json(todos);
        });
    })
})

//delete a todo
app.delete('/',(req,res)=>{
    readFile(path,"utf8",(error,data)=>{
        if(error){
            console.error('Error reading file:', err);
            res.status(500).json({ message: 'Server Error' });
            return;
        }

        let todos = JSON.parse(data);
        console.log(req.body);

        todos = todos.filter(todo => {
            return todo.id != req.body.id;
        });
        console.log(todos);
        
        writeFile(path,JSON.stringify(todos,null,2),(err) => {
            if(error){
                console.error('Error writing file:', err);
                res.status(500).json({ message: 'Server Error' });
                return;
            }
            res.json(todos);
        })

    })
})

app.listen(3001)
