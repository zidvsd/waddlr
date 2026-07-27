import { createClient } from "@supabase/supabase-js"
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase.from("user").select("id").limit(1)

  if (error) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ status: "ok" })
}
