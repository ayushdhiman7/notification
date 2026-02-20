// this file for connecting to the database and exporting the connection pool.
import mysql from 'mysql2/promise';
import { initDB } from './init-db';

let pool: mysql.Pool;  // Declare the pool variable TS

export async function getDB() {
  if (!pool) {
    await initDB();


    // pool = mysql.createPool({
    //   host: process.env.DB_HOST,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.DB_NAME,
    //   waitForConnections: true,
    //   connectionLimit: 10,
    // });

    pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

    console.log("✅ Database connection pool created.");
  }

  return pool;
}



