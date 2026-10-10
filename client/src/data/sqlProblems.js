export const sqlProblemsData = [
    {
        id: 'sql_1',
        title: 'Find Second Highest Salary',
        difficulty: 'easy',
        schema: `Table: Employee
+----+--------+---------------+--------+
| id | name   | department_id | salary |
+----+--------+---------------+--------+
| 1  | Alice  | 10            | 95000  |
| 2  | Bob    | 20            | 80000  |
| 3  | Charlie| 10            | 95000  |
| 4  | David  | 30            | 70000  |
+----+--------+---------------+--------+

Table: Department
+----+-----------------+
| id | department_name |
+----+-----------------+
| 10 | Engineering     |
| 20 | Product         |
| 30 | Operations      |
+----+-----------------+`,
        question: 'Write an SQL query to find the second highest distinct salary from the Employee table. If there is no second highest salary, return NULL.',
        expectedQuery: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (
    SELECT MAX(salary) FROM Employee
);`,
        alternativeQuery: `SELECT (
    SELECT DISTINCT salary 
    FROM Employee 
    ORDER BY salary DESC 
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
        explanation: 'Using subquery with MAX(salary) handles edge cases where multiple employees have identical maximum salaries or fewer than 2 distinct salaries exist (returns NULL naturally).'
    },
    {
        id: 'sql_2',
        title: 'Department Highest Salary',
        difficulty: 'medium',
        schema: `Table: Employee (id, name, department_id, salary)
Table: Department (id, department_name)`,
        question: 'Write an SQL query to find employees who have the highest salary in each of the departments.',
        expectedQuery: `SELECT 
    d.department_name AS Department,
    e.name AS Employee,
    e.salary AS Salary
FROM Employee e
JOIN Department d ON e.department_id = d.id
WHERE (e.department_id, e.salary) IN (
    SELECT department_id, MAX(salary)
    FROM Employee
    GROUP BY department_id
);`,
        alternativeQuery: `WITH RankedSalaries AS (
    SELECT 
        department_id,
        name,
        salary,
        DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rnk
    FROM Employee
)
SELECT d.department_name AS Department, r.name AS Employee, r.salary AS Salary
FROM RankedSalaries r
JOIN Department d ON r.department_id = d.id
WHERE r.rnk = 1;`,
        explanation: 'Group by department_id to find the MAX(salary) per department, then join or match with the outer employee table. Using DENSE_RANK() window function is also optimal in modern SQL.'
    },
    {
        id: 'sql_3',
        title: 'Duplicate Emails & Records',
        difficulty: 'easy',
        schema: `Table: Person
+----+------------------+
| id | email            |
+----+------------------+
| 1  | a@b.com          |
| 2  | c@d.com          |
| 3  | a@b.com          |
+----+------------------+`,
        question: 'Write an SQL query to report all the duplicate emails. It is guaranteed that the email field is not NULL.',
        expectedQuery: `SELECT email
FROM Person
GROUP BY email
HAVING COUNT(email) > 1;`,
        explanation: 'Grouping by email gathers all identical records. The HAVING clause filters out buckets that occur only once.'
    },
    {
        id: 'sql_4',
        title: 'Consecutive Available Seats / Numbers',
        difficulty: 'medium',
        schema: `Table: Logs
+----+-----+
| id | num |
+----+-----+
| 1  | 1   |
| 2  | 1   |
| 3  | 1   |
| 4  | 2   |
| 5  | 1   |
| 6  | 2   |
| 7  | 2   |
+----+-----+`,
        question: 'Find all numbers that appear at least three times consecutively.',
        expectedQuery: `SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1
JOIN Logs l2 ON l1.id = l2.id - 1
JOIN Logs l3 ON l1.id = l3.id - 2
WHERE l1.num = l2.num AND l2.num = l3.num;`,
        alternativeQuery: `WITH NumberSequences AS (
    SELECT num,
           LEAD(num, 1) OVER (ORDER BY id) AS next_num,
           LEAD(num, 2) OVER (ORDER BY id) AS next_next_num
    FROM Logs
)
SELECT DISTINCT num AS ConsecutiveNums
FROM NumberSequences
WHERE num = next_num AND num = next_next_num;`,
        explanation: 'Window functions LEAD() or multi-self-joins allow comparing adjacent rows by consecutive IDs.'
    },
    {
        id: 'sql_5',
        title: 'N-th Highest Salary Function',
        difficulty: 'hard',
        schema: `Table: Employee (id, salary)`,
        question: 'Write a SQL query to get the nth highest salary from the Employee table.',
        expectedQuery: `SELECT DISTINCT salary
FROM Employee
ORDER BY salary DESC
LIMIT 1 OFFSET N - 1;`,
        alternativeQuery: `SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as ranking
    FROM Employee
) sub
WHERE ranking = N;`,
        explanation: 'DENSE_RANK() ensures that duplicate salaries receive the identical rank without skipping subsequent ranks, correctly finding the exact Nth distinct highest compensation.'
    }
];
