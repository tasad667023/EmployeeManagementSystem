const inquirer = require('inquirer');
const connection = require('./config/db');
const ctable = require("console.table");

function initialQuestions() {

    inquirer.prompt({
        type: "list",
        message: "Please select from the following:",
        name: "choice",
        choices: ["View departments", "View roles", "View employees", "Update employee role", "Add department", "Add role", "Add employee"],
    })
        .then((answer) => {
            console.log(answer.choice);
            switch (answer.choice) {
                case "View departments":
                    console.log("view");
                    viewDepartments();
                    break;
                case "View roles":
                    console.log("viewing");
                    viewRoles();
                    break;
                case "View employees":
                    console.log("i can see this");
                    viewEmployees();
                    break;
                case "add department":
                    console.log("view");
                    addDepartment();
                    break;
                case "add role":
                    console.log("view");
                    addRole();
                    break;
                case "add employee":
                    console.log("view");
                    addEmployee();
                    break;
                default:
                    break;
            }
        })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        console.log("working");
        if (err) throw err;
        ctable.getTable(res);
    })
}
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        console.log("working");
        if (err) throw err;
        ctable.getTable(res);
    })
}
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        console.log("working");
        if (err) throw err;
        ctable.getTable(res);
    })
}
function addDepartment() {
    connection.query("INSERT INTO department", function (err, res) {
        console.log("working");
        if (err) throw err;
        ctable.getTable(res);
    })
}
function addRole() {
    connection.query("INSERT INTO role", function (err, res) {
        console.log("working");
        if (err) throw err;
        ctable.getTable(res);
    })
}
function addEmployee() {
    connection.query("INSERT INTO employee", function (err, res) {
        console.log("working");
        if (err) throw err;
        ctable.getTable(res);
    })
}


initialQuestions();