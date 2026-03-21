import {Mems} from "@/services/queries"
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const data = await Mems.getMems()
        return NextResponse.json(data) 
    }
    catch(error){
         console.error("API route error:", error);
    }


}