const { Pool } = require('pg');

const pool = new Pool({
  host: 'visions.postgres.database.azure.com',
  database: 'visions',
  user: 'Gagan',
  password: 'Services@1507',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Host:', 'visions.postgres.database.azure.com');
    console.log('Database:', 'visions');
    console.log('User:', 'Gagan');
    
    const client = await pool.connect();
    console.log('✅ Connected successfully!');
    
    // List all tables
    console.log('\nListing all tables in database...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('Tables found:', tablesResult.rows.map(r => r.table_name).join(', '));
    
    // Test query admin user
    console.log('\nQuerying admin user from admin_users table...');
    const result = await client.query(
      'SELECT id, username, is_active, password_hash FROM admin_users WHERE username = $1',
      ['admin']
    );
    
    console.log('Query result rows:', result.rows.length);
    
    if (result.rows.length > 0) {
      console.log('✅ Admin user found!');
      console.log('Admin details:', JSON.stringify({ 
        id: result.rows[0].id, 
        username: result.rows[0].username, 
        is_active: result.rows[0].is_active,
        password_hash_start: result.rows[0].password_hash?.substring(0, 20) + '...'
      }, null, 2));
    } else {
      console.log('❌ Admin user NOT found in database');
    }
    
    client.release();
    await pool.end();
    console.log('\n✅ Test completed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testConnection();
