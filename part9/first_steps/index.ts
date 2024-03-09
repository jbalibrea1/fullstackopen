import express from 'express';

import { calculateBmi } from './calculateBmi';
import { calculator, Operation } from './calculator';
import { exerciseCalculator } from './exerciseCalculator';

// const express = require('express')
const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('index');
});

app.get('/ping', (_req, res) => {
  res.json('pong');
});

app.get('/calculator', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { a, b, op } = req.query;
  console.log(a);
  console.log(b);
  console.log(op);
  if (!a || !b || !op) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const result = calculator(Number(a), Number(b), op as Operation);
  return res.json({ result });
});

app.post('/calculatorPost', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { a, b, op } = req.body;
  console.log(a);
  console.log(b);
  console.log(op);
  if (!a || !b || !op) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const result = calculator(Number(a), Number(b), op as Operation);
  return res.json({ result });
});

app.get('/bmi', (req, res) => {
  // console.log(req.params.weight)
  const { weight, height } = req.query;

  if (!weight || !height) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  const parseNumber = Number(height);
  const parseWeight = Number(weight);

  if (isNaN(parseNumber) || isNaN(parseWeight)) {
    return res.status(400).json({ error: 'mal formatted parameters' });
  }
  const bmi = calculateBmi(parseNumber, parseWeight);

  const result: { height: number; weight: number; bmi: string } = {
    weight: parseWeight,
    height: parseNumber,
    bmi,
  };

  return res.json(result);
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  const parseTarget = Number(target);

  if (isNaN(parseTarget) || !Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: 'mal formatted parameters' });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const exercise = exerciseCalculator(parseTarget, daily_exercises);

    return res.json(exercise);
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
