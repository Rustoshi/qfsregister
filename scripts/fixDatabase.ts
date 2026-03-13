import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: '.env.local' });

async function fixDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    const db = mongoose.connection.db;
    if (!db) throw new Error('Database connection failed');

    const collection = db.collection('users');

    console.log('Dropping email_1 index if it exists...');
    try {
      await collection.dropIndex('email_1');
      console.log('Successfully dropped email_1 index.');
    } catch (e: any) {
      if (e.codeName === 'IndexNotFound' || e.message.includes('index not found')) {
        console.log('Index email_1 not found, skipping drop.');
      } else {
        throw e;
      }
    }

    console.log('Dropping fullName_1 index if it exists (cleaning up potential old ones)...');
    try {
      await collection.dropIndex('fullName_1');
      console.log('Successfully dropped fullName_1 index.');
    } catch (e: any) {}

    console.log('Database indexes cleaned. Mongoose will recreate them based on the new model on next start.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing database:', error);
    process.exit(1);
  }
}

fixDatabase();
