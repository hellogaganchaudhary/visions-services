const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'visions.postgres.database.azure.com',
  database: 'visions',
  user: 'Gagan',
  password: 'Services@1507',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

async function testLogin() {
  try {
    console.log('=== Testing Login Process ===\n');
    
    const username = 'admin';
    const password = 'admin123';
    
    console.log('1. Connecting to database...');
    const client = await pool.connect();
    console.log('✅ Connected\n');
    
    console.log('2. Querying admin user...');
    const result = await client.query(
      'SELECT id, username, password_hash, is_active FROM admin_users WHERE username = $1',
      [username]
    );
    
    if (result.rows.length === 0) {
      console.log('❌ User not found');
      return;
    }
    
    const admin = result.rows[0];
    console.log('✅ User found:', { id: admin.id, username: admin.username, is_active: admin.is_active });
    console.log('Password hash:', admin.password_hash);
    console.log();
    
    console.log('3. Verifying password...');
    console.log('Input password:', password);
    console.log('Stored hash:', admin.password_hash);
    
    const isValid = await bcrypt.compare(password, admin.password_hash);
    console.log('Password valid:', isValid);
    
    if (isValid) {
      console.log('\n✅ LOGIN SUCCESSFUL!');
    } else {
      console.log('\n❌ LOGIN FAILED - Password mismatch');
    }
    
    client.release();
    await pool.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  }
}

testLogin();
