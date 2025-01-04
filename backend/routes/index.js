import transactionRoutes from './transaction.js';
import userRoutes from './user.js';

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.redirect('/'); 
    });
    app.use('/users', userRoutes);
    app.use('/transactions', transactionRoutes);
    
    app.use('*', (_, res) => {
        res.status(404).json({ error: 'Not found- check your URL' });
    });

};

export default constructorMethod;