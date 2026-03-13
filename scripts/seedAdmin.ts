import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Construct path to .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// Redefine User Schema locally for the script so we don't have to battle Next.js imports
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedAdmin() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Customize your admin credentials here or pass them as arguments
    const adminEmail = process.argv[2] || 'admin@example.com';
    const adminPassword = process.argv[3] || 'admin123';

    const existingUser = await User.findOne({ email: adminEmail });

    if (existingUser) {
      console.log(`⚠️ User with email ${adminEmail} already exists.`);
      process.exit(0);
    }

    console.log('🔄 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    console.log('🔄 Creating admin user...');
    await User.create({
      fullName: 'Admin User',
      phone: `admin-${Date.now()}`,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    console.log(`🎉 Admin user created successfully!`);
    console.log(`✉️  Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seedAdmin();
