import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  try {
    await dbConnect();
    const settings = await Settings.findOne({});
    
    // Fallback if settings don't exist yet
    const code = settings?.qfsActivationCode || 'QFS-DEFAULT-12345';
    const balance = settings?.defaultBalance || '653,000,000';
    const telegramLink = settings?.telegramLink || 'https://t.me/qfscommunity';
    
    return NextResponse.json({ success: true, code, balance, telegramLink });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
