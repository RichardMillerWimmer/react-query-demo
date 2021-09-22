const todoList = [];
let todoId = 1;

module.exports = {
    getTodos: (req, res) => {
        res.status(200).send(todoList)
    },
    addTodo: (req, res) => {
        const {newTodo} = req.body;
        newTodo.id = todoId;
        todoId++;
        todoList.push(newTodo);
        res.status(200).send(todoList);
    },
    editTodo: (req, res) => {
        const {id} = req.params;
        const {name, description, complete} = req.body;
        todoIndex = todoList.findIndex(todo => todo.id === +id);
        todoList[todoIndex] = {name, description, complete}
        res.status(200).send(todoList);
    },
    deleteTodo: (req, res) => {
        const {id} = req.params;
        const todoIndex = todoList.findIndex(todo => todo.iid === +id);
        todoList.splice(todoIndex, 1);
        res.status(200).send(todoList);
    }
};