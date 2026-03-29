import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const { name, service, price } = await req.json()

  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from('stores')
    .insert([{ name, service, price }])

  if (error) {
    console.log(error)
    return NextResponse.json({ error })
  }

  return NextResponse.json({ data })
}