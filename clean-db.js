const { getClient } = require('./backend/db');

async function cleanDb() {
    const client = await getClient();
    try {
        console.log('🧼 Cleaning database by dropping all tables...');
        await client.query(`
            DROP TABLE IF EXISTS expiry_log CASCADE;
            DROP TABLE IF EXISTS blood_stock CASCADE;
            DROP TABLE IF EXISTS blood_requests CASCADE;
            DROP TABLE IF EXISTS blood_banks CASCADE;
            DROP TABLE IF EXISTS donors CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        `);
        console.log('✅ All tables dropped successfully!');
        console.log('Restart your server (`npm start` or `node backend/server.js`) to automatically recreate and re-seed the fresh tables.');
    } catch (err) {
        console.error('❌ Error cleaning database:', err.message);
    } finally {
        client.release();
        process.exit(0);
    }
}

cleanDb();
