let employees = [];
let nextId = 1;

const getAll = () => employees;

const getById = (id) => employees.find((e) => e.id === id);

const create = ({ name, department, salary }) => {
  const employee = { id: nextId++, name, department, salary };
  employees.push(employee);
  return employee;
};

const update = (id, data) => {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return null;
  employees[index] = { ...employees[index], ...data };
  return employees[index];
};

const remove = (id) => {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
};

const reset = () => {
  employees = [];
  nextId = 1;
};

module.exports = { getAll, getById, create, update, remove, reset };
