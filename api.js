var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var query = "mongodb+srv://MundaneSleet:alejo200302@cluster0.mlweimp.mongodb.net/?retryWrites=true&w=majority";
const db = (query);
var TaskModel = require('./task_schema');

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(error) {
    if (error) {
        console.log("Error!" + error);
    } else {
        console.log("Se ha conectado con la base de datos exitosamente");
    }
});

module.exports = router;
router.post('/create-task', function(req, res) {
    let task_id = req.body.TaskId;
    let name = req.body.Name;
    let deadline = req.body.Deadline;

    let task = {
        TaskId: task_id,
        Name: name,
        Deadline: deadline
    }
    var newTask = new TaskModel(task);

    newTask.save(function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal error\n");
        } else {
            res.status(200).send("OK\n");
        }
    });
});