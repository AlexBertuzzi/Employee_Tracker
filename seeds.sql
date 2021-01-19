USE employees_DB;

INSERT INTO department (department_id, name)
VALUES (01, "Employee Management"), (02, "Customer Service"), (03, "Front-End Development"), (04, "Back-End Development"); 

INSERT INTO role (role_id, title, salary, department_id)
VALUES (01, "Finance Director", 80000, 01), 
    (02, "Accountant", 70000, 01), 
    (03, "Client Manager", 60000, 02), 
    (04, "Client Representative", 50000, 02),
    (05, "Project Head", 60000, 03),
    (06, "Project Associate", 50000, 03),
    (07, "Project Head", 60000, 04),
    (08, "Project Associate", 50000, 04);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (01, "first1", "last1", 01, NULL),
    (02, "first2", "last2", 02, 01),
    (03, "first3", "last3", 03, NULL),
    (04, "first4", "last4", 04, 03),
    (05, "first5", "last5", 05, NULL),
    (06, "first6", "last6", 06, 05),
    (07, "first7", "last7", 07, NULL),
    (08, "first8", "last8", 08, 07);