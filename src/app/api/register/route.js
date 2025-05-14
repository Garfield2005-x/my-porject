import { NextResponse } from "next/server";
import { connectMongodb } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req){
    try {
        const {username, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongodb();
        await User.create({ username, email, password: hashedPassword });
        
  

        return NextResponse.json({ message: "Success" }, { status: 200 });

    } catch (error) {
        return NextResponse({ message: "An error" }, { status: 500 });
    }
}