// import Express & burger.js
var express = require("express");

// create router object
var app = express.Router();

// import models as db
let db = require("../models");

// Main Root directory.
app.get("/", function (req, res) {
    db.Burger.findAll({}).then(function (dbBurger) {
        var hbsObject = {
            burgers: dbBurger
        };
        console.log("dbBurger: ", hbsObject);
        res.render("index", hbsObject);
    })
});

app.post("/api/newburger", function (request, response) {
    db.Burger.create({
        burger_name: request.body.burger_name,
    }).then(result => {
        // return the id of the inserted row
        // https://github.com/mysqljs/mysql#getting-the-id-of-an-inserted-row
        response.json({ id: result.insertId });
        console.log("Newly added ID: ", result.insertId);
    })
});

app.put("/api/update", function (request, response) {
    console.log(request.body.id);
    db.Burger.update(
        {
            devoured: true,
        },
        {
            where: {
                id: request.body.id
            }
        }).then(result => {
            response.json({ id: result.insertId });
            console.log("Updated ID: ", result.insertId);
        });
});

// export router object for server.js
module.exports = app;