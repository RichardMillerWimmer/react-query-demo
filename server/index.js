const { application } = require('express');
const express = require('express');

const ctrl = require('./controllers/controller');

const app = express();
const port = 5050;

app.use(express.json());

//controller endpoints
app.get('/api/todos', ctrl.getTodos);
app.post('/api/todos', ctrl.addTodo);
app.put('/api/todos', ctrl.editTodo);
app.delete('/api/todos', ctrl.deleteTodo);

app.listen(port, () => console.log(`server is running on port ${port}`))