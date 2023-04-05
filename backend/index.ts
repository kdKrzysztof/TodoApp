import Express, { json } from 'express';
import userController from './src/controllers/user.controller';

const port = process.env.PORT || 5000;
const app = Express();
app.use(json());

app.use('/auth', userController);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

export default app;
