import Express, { json } from 'express';
import userController from './src/controllers/user/user.controller';
import todoController from './src/controllers/todo/todo.controller';
import { errorHandler } from './src/middleware/errorHandler';

const port = process.env.PORT || 5000;
const app = Express();
app.use(json());

app.use('/api/auth', userController);
app.use('/api/todo', todoController);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.use(errorHandler);

export default app;
