const inquirer = require('inquirer');
const connection = require('./config/db');
const ctable = require("console.table");
const { connectableObservableDescriptor } = require('rxjs/internal/observable/ConnectableObservable');

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
                case "Add department":
                    console.log("view");
                    addDepartment();
                    break;
                case "Add role":
                    console.log("view");
                    addRole();
                    break;
                case "Add employee":
                    console.log("view");
                    addEmployee();
                    break;
                case "Update employee role":
                    console.log("view");
                    updateEmployeeRole();
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
    inquirer.prompt({
        type: "input",
        message: "What kind of department would you like to add?",
        name: "departmentAnswer"
    })
        .then(function (response) {
            connection.query("INSERT INTO department SET ?", { name: response.departmentAnswer }, function (err, res) {
                if (err) throw err;
                console.log("department successfully added!")
            })
        })
}
function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log(res);
        inquirer.prompt([
            {
                type: "input",
                message: "What kind of role would you like to add?",
                name: "roleAnswer"
            },
            {
                type: "input",
                message: "What is the role salary?",
                name: "roleSalary"
            },
            {
                type: "list",
                message: "What department does this role belong too?",
                name: "roleDepartment",
                choices: res
            },

        ])
            .then(function (response) {
                console.log(response) //response holds all the answers to the inquirer.prompt
                connection.query("SELECT id FROM department WHERE ?", { name: response.roleDepartment }, function (err, res) {
                    if (err) throw err;
                    console.log(res); //res holds the id number for the matching departments 
                    connection.query("INSERT INTO role SET ?", { title: response.roleAnswer, salary: response.roleSalary, department_id: res[0].id }, function (err, res) {
                        if (err) throw err;
                        console.log("role successfully added!")
                    })
                })
            })
    })
}
function addEmployee() {
    connection.query("SELECT title AS name FROM role", function (err, res) {
        if (err) throw err;
        console.log(res);
        inquirer.prompt([
            {
                type: "input",
                message: "What is the first name of the employee?",
                name: "employeeFirstName"
            },
            {
                type: "input",
                message: "What is the last name of the employee?",
                name: "employeeLastName"
            },
            {
                type: "list",
                message: "What role is this employee filling?",
                name: "roleDepartment",
                choices: res
            },
            {
                type: "confirm",
                message: "Does this employee report to a manager?",
                name: "managed"
            },
        ])
            .then(function (response) {
                if (response.managed) {
                    //creation with manager
                    connection.query("SELECT id, CONCAT(first_name,' ' , last_name) AS name FROM employee", function (err, res) {
                        if (err) throw err;
                        console.log(res)
                        inquirer.prompt(
                            {
                                type: "list",
                                message: "Who is this employee's manager?",
                                name: "employeeManager",
                                choices: res,
                            }
                        )
                            .then(function (userSelection) {
                                var manager = userSelection.employeeManager;
                                var employeeList = res;
                                var managerMatch = employeeList.find(({ name }) => name === manager);
                                console.log(managerMatch.id);
                                connection.query("SELECT id FROM role WHERE ?", { title: response.roleDepartment }, function (err, res) {
                                    if (err) throw err;
                                    console.log(res);
                                    connection.query("INSERT INTO employee SET ? ", { first_name: response.employeeFirstName, last_name: response.employeeLastName, role_id: res[0].id, manager_id: managerMatch.id }, function (err, res) {
                                        if (err) throw err;
                                        console.log("role successfully added!");
                                    })
                                })
                            })
                    })
                }
                else {
                    // this code will run if the answer is no to the managed question
                    console.log(response) //response holds all the answers to the inquirer.prompt
                    connection.query("SELECT id FROM role WHERE ?", { title: response.roleDepartment }, function (err, res) {
                        if (err) throw err;
                        console.log(res);
                        connection.query("INSERT INTO employee SET ? ", { first_name: response.employeeFirstName, last_name: response.employeeLastName, role_id: res[0].id }, function (err, res) {
                            if (err) throw err;
                            console.log("role successfully added!");
                        })
                    })
                }
            })
    })
}
function updateEmployeeRole(){
//Get list of all employees 
//inquier.prompt to ask question "What employee do you want to update?"
//connection.query to get a list of all the roles 
//after we have the list, another inquirer.promt to ask what the new role is
//need to get the role id- connection.query 
//another connection.query to update the employee --> 
//after updating the employee- you can restart the program 
}






initialQuestions();