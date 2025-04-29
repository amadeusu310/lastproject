import { createClient } from '@supabase/supabase-js';

console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Page() {
  const { data, error } = await supabase.from('CardsList').select('*');

  if (error) {
    console.error('データ取得エラー:', error);
    return <p>データを取得できませんでした。</p>;
  }else{
    console.log('取得したデータ:', data);
  }

  
}
