import express from "express";
import cors from "cors";
import diagnoses from './routes/diagnoses';
import patients from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping/', (_req, res) => {
  console.log('someone pinged here');
  res.send("pong");
});


app.use('/api/diagnoses', diagnoses);
app.use('/api/patients', patients);

app.listen(PORT, () => {  
  console.log(`server listening on ${PORT}`);
});