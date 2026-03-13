import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  try {
    await dbConnect();
    const settings = await Settings.findOne({});
    
    // Fallback if settings don't exist yet
    const code = settings?.qfsActivationCode || 'QFS-DEFAULT-12345';
    
    return NextResponse.json({ success: true, code });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
