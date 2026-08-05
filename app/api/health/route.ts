import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error: userError } = await supabase.from("user").select("id").limit(1)
  if (userError) {
    return NextResponse.json(
      { status: "error", error: userError.message },
      { status: 500 }
    )
  }

  const { error: healthCheckError } = await supabase
    .from("health_check")
    .insert({
      checked_at: new Date().toISOString(),
    })

  if (healthCheckError) {
    return NextResponse.json(
      { status: "error", error: healthCheckError.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ status: "ok" })
}
