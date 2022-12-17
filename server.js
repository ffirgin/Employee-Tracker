// Require the necessary modules
const inquirer = require('inquirer');
const db = require('./database/connect');
require("console.table");

// Prompt the user for what action they should take
function showMainPrompts() {
  prompt([
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
  function findDepts(){
    return db.connect.query("SELECT department_id FROM department");
  }
}