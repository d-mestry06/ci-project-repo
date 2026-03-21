const express = require('express');
const service = require('./employeeService');

const app = express();
app.use(express.json());

app.get('/employees', (req, res) => {
  res.json(service.getAll());
});

app.get('/employees/:id', (req, res) => {
  const employee = service.getById(Number(req.params.id));
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
});

app.post('/employees', (req, res) => {
  const { name, department, salary } = req.body;
  if (!name || !department || !salary)
    return res.status(400).json({ message: 'name, department, and salary are required' });
  res.status(201).json(service.create({ name, department, salary }));
});

app.put('/employees/:id', (req, res) => {
  const updated = service.update(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: 'Employee not found' });
  res.json(updated);
});

app.delete('/employees/:id', (req, res) => {
  const deleted = service.remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: 'Employee not found' });
  res.json({ message: 'Employee deleted' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
