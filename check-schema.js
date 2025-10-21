const { Pool } = require('pg');

const pool = new Pool({
  host: 'visions.postgres.database.azure.com',
  database: 'visions',
  user: 'Gagan',
  password: 'Services@1507',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

async function checkSchema() {
  try {
    const client = await pool.connect();
    console.log('Connected to database\n');
    
    // Get admin_sessions table structure
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'admin_sessions'
      ORDER BY ordinal_position
    `);
    
    console.log('=== admin_sessions table columns ===');
    result.rows.forEach(row => {
      console.log(`- ${row.column_name} (${row.data_type}, ${row.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    
    client.release();
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkSchema();
