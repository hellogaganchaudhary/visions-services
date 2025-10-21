require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

async function createDatabaseIfNotExists() {
  // First connect to default postgres database
  const defaultPool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: 'postgres', // Connect to default database first
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  const client = await defaultPool.connect();
  
  try {
    console.log('Connected to PostgreSQL server');
    
    // Check if database exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.POSTGRES_DATABASE]
    );
    
    if (result.rows.length === 0) {
      console.log(`Creating database '${process.env.POSTGRES_DATABASE}'...`);
      // Note: Cannot use parameterized query for CREATE DATABASE
      await client.query(`CREATE DATABASE ${process.env.POSTGRES_DATABASE}`);
      console.log('✅ Database created successfully!');
    } else {
      console.log(`Database '${process.env.POSTGRES_DATABASE}' already exists`);
    }
    
  } finally {
    client.release();
    await defaultPool.end();
  }
}

async function initDatabase() {
  // Now connect to the actual database
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  const client = await pool.connect();
  
  try {
    console.log(`\nConnected to database '${process.env.POSTGRES_DATABASE}'`);
    
    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing schema...');
    
    // Execute schema
    await client.query(schema);
    
    console.log('✅ Database schema initialized successfully!');
    console.log('\nCreated tables:');
    console.log('  - contacts');
    console.log('  - leads');
    console.log('  - quote_requests');
    console.log('  - admins');
    console.log('  - admin_sessions');
    console.log('\nDefault admin credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('\n⚠️  Please change the default admin password after first login!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

async function main() {
  await createDatabaseIfNotExists();
  await initDatabase();
}

main()
  .then(() => {
    console.log('\n✨ Database initialization complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database initialization failed:', error);
    process.exit(1);
  });
