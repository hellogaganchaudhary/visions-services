require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function insertAdmin() {
  const client = await pool.connect();
  
  try {
    console.log('Connected to database');
    
    // Insert admin user
    const result = await client.query(`
      INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (username) DO UPDATE
      SET password_hash = EXCLUDED.password_hash,
          email = EXCLUDED.email,
          is_active = EXCLUDED.is_active
      RETURNING id, username, email
    `, [
      'admin',
      'admin@visions.com',
      '$2a$10$kQLb4lY1hPyslpqJXk2X4Oj25HJd2Z2bHAp.zB48Zyh.7CYWHsPwi',
      'System Administrator',
      'super_admin',
      true
    ]);
    
    console.log('✅ Admin user created/updated successfully!');
    console.log('Admin details:', result.rows[0]);
    console.log('\nLogin credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

insertAdmin()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  });
