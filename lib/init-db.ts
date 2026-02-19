//this file is for making the databale and table .
import mysql from 'mysql2/promise';

export async function initDB() {

     //create connection to MySQL server
     const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
     })

     //create database if not exists
     await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
     console.log(`Database ${process.env.DB_NAME} created or already exists.`);

     //use the DB
     await connection.query(`USE ${process.env.DB_NAME}`);

     // Create table if not exists
     await connection.query(`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    endpoint TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_endpoint (endpoint(255))
  )
`);


     console.log(`Table 'push_subscriptions' created or already exists.`);
     console.log("✅ Database & Table Ready");

     await connection.end();
}
