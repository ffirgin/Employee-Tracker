// Require the necessary modules
const inquirer = require('inquirer');
const db = require('./db/connect.js');
require("console.table");

// Prompt the user for what action they should take
function showMainPrompts() {
  inquirer.prompt([
    { // The first question should ask what action the user wants to take
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        { // View all departments, roles, employees
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {// Add a department, role, or employee
          name: "Add a Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update an Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {// Quit out of application
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
    // Use the .then() method to retrieve the user's response
  ]).then(res => {
    let action = res.action;
    switch (action) {
      case "VIEW_DEPARTMENTS":
        viewDepts();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_DEPARTMENT":
        addDept();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      default:
        quit();
    }
  });
}
// Function to view all departments
function viewDepts(){
  // Query the database from the department table, console.table the results, and call showMainPrompts()
  db.query('SELECT * FROM department', function(err, results) {
    console.table(results);
    showMainPrompts();
  });
}
//function to view all roles, console.table the results, and call showMainPrompts()
function viewRoles(){
  // Query the database from the role table
  db.query('SELECT * FROM role', function(err, results) {
    console.table(results);
    showMainPrompts();
  });
}
//function to view all employees, console.table the results, and call showMainPrompts()
function viewEmployees(){
  // Query the database from the employee table
  db.query('SELECT * FROM employee', function(err, results){
    console.table(results);
    showMainPrompts();
  })
}
//function to add a department,
function addDept(){
  inquirer.prompt([
    { //Asking the user what department they would like to add
      name: "newDept",
      message: "What department would you like to add?"
    }
  ]).then(response => {
    // Store the user's response in a variable
    const newDept = response.newDept;
    // Query the database to insert the new department into the department table, console.table the results, and call showMainPrompts()
    db.query('INSERT INTO department SET ?', {name: newDept}, function(err, results){
      console.table(results);
      console.log("Department added!");
      showMainPrompts();
    })
  })
}
//function to add a role
function addRole(){
  inquirer.prompt([
    { //Asking the user what role they would like to add
      name: "newRole",
      message: "What role would you like to add?"
    },
    { //Asking the user what salary they would like to add
      name: "salary",
      message: "What is the salary for this role?"
    },
    { //Asking the user what department ID they would like to add
      name: "deptId",
      message: "What department does this role belong to?"
    }
  ]).then(response => {
    // Store the user's response in a variable for each question
    const addedRole = response.newRole;
    const salary = response.salary;
    const deptId = response.deptId;
    // Query the database to insert the new role into the role table, console.table the results, and call showMainPrompts()
    db.query('INSERT INTO role SET ?', {title: addedRole, salary: salary, department_id: deptId}, function(err, results){
      console.table(results);
      console.log("Role added!");
      showMainPrompts();
    })
  })
}
//function to add an employee
function addEmployee(){
  inquirer.prompt([
    {
      name: "firstName",
      message: "What is the employee's first name?"
    },
    {
      name: "lastName",
      message: "What is the employee's last name?"
    },
    {
      name: "roleId",
      message: "What is the employee's role ID?"
    },
    {
      name: "managerId",
      message: "What is the employee's manager ID? 1 for Leland, 3 for Rosanna, 5 for Umair, 7 for Faizan."
    }
  ]).then(response => {
    // Store the user's response in a variable for each question
    const firstName = response.firstName;
    const lastName = response.lastName;
    const roleId = response.roleId;
    const managerId = response.managerId;
    // Query the database to insert the new employee into the employee table, console.table the results, and call showMainPrompts()
    db.query('INSERT INTO employee SET ?', {first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId}, function(err, results){
      console.table(results);
      console.log("Employee added!");
      showMainPrompts();
    })
  })
}
//function to update an employee role
function updateEmployeeRole(){
  inquirer.prompt([
    {
      name: "employeeId",
      message: "What is the employee's ID?"
    },
    {
      name: "newRoleId",
      message: "What is the employee's new role ID?"
    }
  ]).then(response => {
    const employeeId = response.employeeId;
    const newRoleId = response.newRoleId;
    // Query the database to update the employee's role, console.table the results, and call showMainPrompts()
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId], function(err, results){
      console.table(results);
      console.log("Employee role updated!");
      showMainPrompts();
    })
  })
}

function quit(){
  console.log("Thank you for using the Employee Tracker 9000!");
  process.exit();
}

showMainPrompts();