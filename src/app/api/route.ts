//next.js内でAPIを作成
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server";

//console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
//console.log("SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const data = await supabase.from("CardsList").select();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const { name, category,money } = await req.json(); // ✅ クライアントから送信されたデータを取得
    const { data, error } = await supabase.from("CardsList").insert([{ name, category, money }]);

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    console.error("データ送信エラー:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
