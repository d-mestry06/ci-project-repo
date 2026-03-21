const request = require('supertest');
const app = require('../src/app');
const service = require('../src/employeeService');

beforeEach(() => service.reset());

describe('Employee Management API', () => {
  test('GET /employees - returns empty list', async () => {
    const res = await request(app).get('/employees');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /employees - creates an employee', async () => {
    const res = await request(app)
      .post('/employees')
      .send({ name: 'Alice', department: 'Engineering', salary: 80000 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, name: 'Alice', department: 'Engineering', salary: 80000 });
  });

  test('POST /employees - returns 400 if fields missing', async () => {
    const res = await request(app).post('/employees').send({ name: 'Bob' });
    expect(res.status).toBe(400);
  });

  test('GET /employees/:id - returns employee by id', async () => {
    service.create({ name: 'Alice', department: 'HR', salary: 60000 });
    const res = await request(app).get('/employees/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Alice');
  });

  test('GET /employees/:id - returns 404 if not found', async () => {
    const res = await request(app).get('/employees/99');
    expect(res.status).toBe(404);
  });

  test('PUT /employees/:id - updates an employee', async () => {
    service.create({ name: 'Alice', department: 'HR', salary: 60000 });
    const res = await request(app).put('/employees/1').send({ salary: 75000 });
    expect(res.status).toBe(200);
    expect(res.body.salary).toBe(75000);
  });

  test('PUT /employees/:id - returns 404 if not found', async () => {
    const res = await request(app).put('/employees/99').send({ salary: 75000 });
    expect(res.status).toBe(404);
  });

  test('DELETE /employees/:id - deletes an employee', async () => {
    service.create({ name: 'Alice', department: 'HR', salary: 60000 });
    const res = await request(app).delete('/employees/1');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Employee deleted');
  });

  test('DELETE /employees/:id - returns 404 if not found', async () => {
    const res = await request(app).delete('/employees/99');
    expect(res.status).toBe(404);
  });
});
