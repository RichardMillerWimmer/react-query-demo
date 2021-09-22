const { application } = require('express');
const express = require('express');

const ctrl = require('./controllers/controller');

const app = express();
const port = 5050;

app.use(express.json());

//controller endpoints
app.get('/api/todos', ctrl.getParty);
app.post('/api/todos', ctrl.addChar);
app.delete('/api/todos', ctrl.deleteChar);

app.listen(port, () => console.log(`server is running on port ${port}`))