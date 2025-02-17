import { NextResponse } from "next/server"
import { createToken } from "@/lib/auth"

export async function GET() {
  try {
    const token = await createToken({ userId: "test-user" })
    return NextResponse.json({
      success: true,
      message: "JWT test successful",
      token
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "JWT test failed"
    }, { status: 500 })
  }
}
