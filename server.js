// Require the necessary modules
const inquirer = require('inquirer');
const db = require('./db/connect.js');
require("console.table");

// Prompt the user for what action they should take
function showMainPrompts() {
  inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        {
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
        {
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
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
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

function viewDepts(){
  db.query('SELECT * FROM department', function(err, results) {
    console.table(results);
    showMainPrompts();
  });
}

function viewRoles(){
  db.query('SELECT * FROM role', function(err, results) {
    console.table(results);
    showMainPrompts();
  });
}

function viewEmployees(){
  db.query('SELECT * FROM employee', function(err, results){
    console.table(results);
    showMainPrompts();
  })
}

function addDept(){
  inquirer.prompt([
    {
      name: "newDept",
      message: "What department would you like to add?"
    }
  ]).then(response => {
    const newDept = response.newDept;
    db.query('INSERT INTO department SET ?', {name: newDept}, function(err, results){
      console.table(results);
      console.log("Department added!");
      showMainPrompts();
    })
  })
}

function addRole(){
  inquirer.prompt([
    {
      name: "newRole",
      message: "What role would you like to add?"
    },
    {
      name: "salary",
      message: "What is the salary for this role?"
    },
    {
      name: "deptId",
      message: "What department does this role belong to?"
    }
  ]).then(response => {
    const addedRole = response.newRole;
    const salary = response.salary;
    const deptId = response.deptId;
    db.query('INSERT INTO role SET ?', {title: addedRole, salary: salary, department_id: deptId}, function(err, results){
      console.table(results);
      console.log("Role added!");
      showMainPrompts();
    })
  })
}

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
    const firstName = response.firstName;
    const lastName = response.lastName;
    const roleId = response.roleId;
    const managerId = response.managerId;
    db.query('INSERT INTO employee SET ?', {first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId}, function(err, results){
      console.table(results);
      console.log("Employee added!");
      showMainPrompts();
    })
  })
}

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
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId], function(err, results){
      console.table(results);
      console.log("Employee role updated!");
      showMainPrompts();
    })
  })
}

showMainPrompts();