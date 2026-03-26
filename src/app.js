const express = require('express');
const helmet = require('helmet');
const service = require('./employeeService');

const app = express();
app.use(helmet());
app.use(express.json());

const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });
  req.params.id = id;
  next();
};

app.get('/employees', (req, res) => {
  res.json(service.getAll());
});

app.get('/employees/:id', validateId, (req, res) => {
  const employee = service.getById(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
});

app.post('/employees', (req, res) => {
  const { name, department, salary } = req.body;
  if (!name || !department || !salary)
    return res.status(400).json({ message: 'name, department, and salary are required' });
  res.status(201).json(service.create({ name, department, salary }));
});

app.put('/employees/:id', validateId, (req, res) => {
  const updated = service.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Employee not found' });
  res.json(updated);
});

app.delete('/employees/:id', validateId, (req, res) => {
  const deleted = service.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Employee not found' });
  res.json({ message: 'Employee deleted' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
