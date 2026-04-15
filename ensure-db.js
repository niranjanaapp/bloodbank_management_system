const { Client } = require('pg');
require('dotenv').config();

async function ensureDb() {
    const connectionString = process.env.DATABASE_URL.replace('/lifeflow', '/postgres');
    const client = new Client({ connectionString });

    try {
        await client.connect();
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname='lifeflow'");
        if (res.rowCount === 0) {
            console.log('Creating database lifeflow...');
            await client.query('CREATE DATABASE lifeflow');
            console.log('Database lifeflow created successfully.');
        } else {
            console.log('Database lifeflow already exists.');
        }
    } catch (err) {
        console.error('Error ensuring database exists:', err.message);
    } finally {
        await client.end();
    }
}

ensureDb();
