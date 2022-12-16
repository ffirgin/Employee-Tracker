use employees_db;
INSERT INTO department (name)
VALUES ('Marketing'), ('Finance'), ('HR'), ('Operations'), ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Manager', 100000, 1), ('Marketing Associate', 75000, 1),
('Finance Manager', 100000, 2), ('Finance Associate', 75000, 2),
('HR Manager', 100000, 3), ('HR Associate', 75000, 3),
('Operations Manager', 100000, 4), ('Operations Associate', 75000, 4),
('Engineering Manager', 100000, 5), ('Engineering Associate', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Leland', 'Carter', 1, NULL), ('Hugo', 'Boone', 2, 1),
('Rosanna','Bowen', 3, NULL), ('Liam','Finch', 4, 3),
('Umair','Glass',  5, NULL), ('Betty','Barber',  6, 5),
('Faizan','Berry',  7, NULL), ('Carolyn','Hansen',  8, 7),
('Kylie','Spark',  9, NULL);