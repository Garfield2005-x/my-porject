import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

// ใช้ MongoClient สำหรับการตรวจสอบการเชื่อมต่อ
const client = new MongoClient(process.env.MONGODB_URI);
let isConnected = false;

// ฟังก์ชันเชื่อมต่อ MongoDB ด้วย mongoose
export const connectMongodb = async () => {
    try {
        // ตรวจสอบว่าเชื่อมต่อกับ MongoDB ด้วย mongoose แล้วหรือยัง
        if (mongoose.connection.readyState >= 1) {
            console.log("Already connected to MongoDB with Mongoose");
            return;
        }

        // เชื่อมต่อกับ MongoDB ด้วย mongoose โดยไม่ใช้ตัวเลือกที่ไม่จำเป็น
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB with Mongoose");

        isConnected = true; // กำหนดสถานะการเชื่อมต่อ

    } catch (error) {
        console.error("Error connecting to MongoDB with Mongoose:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

// ฟังก์ชันเชื่อมต่อ MongoDB ด้วย MongoClient (สำหรับการตรวจสอบสถานะการเชื่อมต่อ)
export async function connectToDatabase() {
    if (!isConnected) {
        try {
            // เชื่อมต่อ MongoDB ด้วย MongoClient
            await client.connect();
            console.log("Connected to MongoDB with MongoClient");
            isConnected = true; // กำหนดสถานะการเชื่อมต่อ
        } catch (error) {
            console.error("Error connecting to MongoDB with MongoClient:", error);
            throw new Error("Failed to connect to MongoDB");
        }
    }
    const db = client.db('your_database_name'); // เลือกฐานข้อมูลที่ต้องการ
    return { db };
}
