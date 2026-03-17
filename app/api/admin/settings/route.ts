import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  try {
    await dbConnect();
    
    // Always fetch or create a default settings object to ensure one exists
    let settings = await Settings.findOne({});
    
    if (!settings) {
      settings = await Settings.create({
        qfsActivationCode: 'QFS-DEFAULT-12345',
        defaultBalance: '653,000,000',
        telegramLink: 'https://t.me/qfscommunity'
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { qfsActivationCode, defaultBalance, telegramLink } = await req.json();

    if (!qfsActivationCode) {
       return NextResponse.json(
        { success: false, message: "Activation code is required" },
        { status: 400 }
      );
    }

    if (!defaultBalance) {
       return NextResponse.json(
        { success: false, message: "Default balance is required" },
        { status: 400 }
      );
    }

    if (!telegramLink) {
       return NextResponse.json(
        { success: false, message: "Telegram link is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Upsert the only settings document
    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      { qfsActivationCode, defaultBalance, telegramLink },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
