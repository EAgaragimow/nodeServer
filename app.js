const express = require('express'),
    app = express(),
    mysql = require('mysql'),
    connection = require('express-myconnection');

app.use(connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'tasks'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/tasks', function(req, res) {
    req.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT id, name, comment, time, important FROM tasks ORDER BY id', function(err, data) {
            if (err) throw err;
            res.send(data)
        });
    });
});

app.listen(3000, function() {
    console.log('Application Task-manager listening on port 3000');
});