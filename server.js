import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/dbConnection.js';

const port = process.env.PORT || 5000;

try {
  await connectDB();
  app.listen(port, () => console.log(`Mini CRM API listening on http://localhost:${port}`));
} catch (error) {
  console.error('Unable to start API:', error.message);
  process.exit(1);
}
