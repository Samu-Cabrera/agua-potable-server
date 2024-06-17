import { runServer } from './app.js';
import { connectDB } from './db/connection.db.js';

connectDB();
runServer(3000);