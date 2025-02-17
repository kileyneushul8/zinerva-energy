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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: "JWT configuration error", details: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "JWT configuration error", details: "Unknown error occurred" }, { status: 500 })
  }
}
