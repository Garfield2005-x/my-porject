import { NextResponse } from "next/server";
import { connectMongodb } from "../../../../lib/mongodb";
import User from "../../../../models/user";


export async function POST(req){
    try {
         
        await connectMongodb();
        const {email} = await req.json();
        const user = await User.findOne({ email }).select("_id");
        console.log("User: ", user);

        return NextResponse.json({ user });
            
         } catch (error) {
        console.log(error);
    }
}