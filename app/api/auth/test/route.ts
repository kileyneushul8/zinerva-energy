import { NextResponse } from "next/server"
import { createToken } from "@/lib/auth"

export async function GET() {
  try {
    // Try to create a test token
    const testToken = await createToken({ test: true })

    return NextResponse.json({
      status: "success",
      message: "JWT configuration is working",
      testToken,
    })
  } catch (error) {
    return NextResponse.json({ error: "JWT configuration error", details: error.message }, { status: 500 })
  }
}

