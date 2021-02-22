import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => response.json({ message: 'Hello Word' }));

app.post('/', (request, response) => response.json({ message: 'Usuário criado com sucesso' }));

export { app };
