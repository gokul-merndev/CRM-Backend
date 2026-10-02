import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes/index.js';
import swaggerDocument from './config/swagger.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
	.split(',').map((origin) => origin.trim());

app.use(cors({
	origin: (origin, callback) => {
		const localDevelopmentOrigin = process.env.NODE_ENV !== 'production'
			&& /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || '');
		callback(null, !origin || allowedOrigins.includes(origin) || localDevelopmentOrigin);
	},
	credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
