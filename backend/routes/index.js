import transactionRoutes from './transaction.js';
import userRoutes from './user.js';
import predictionRoutes from './predictions.js';
import analyticsRoutes from './analytics.js';
import authRoutes from './auth.js'

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.redirect('/'); 
    });
    app.use('/api/users', userRoutes);
    app.use('/api/transactions', transactionRoutes);
    app.use('/api/predictions', predictionRoutes);
    app.use('/api/analytics', analyticsRoutes);
    app.use('/api/auth', authRoutes)
    
    app.use('*', (_, res) => {
        res.status(404).json({ error: 'Not found- check your URL' });
    });

};

export default constructorMethod;