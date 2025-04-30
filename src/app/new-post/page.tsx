"use client";

import {Header} from "../../components/Header";
import { useCards,CardsProvider } from "../../components/CardsContext";
import {useRouter} from "next/navigation";

export default function NewPostPage () {
    return (
 <CardsProvider>
    <PostPage />
 </CardsProvider>
 )
}

function PostPage  () {
 const PostForm: React.FC = () => {
  const { setCards } = useCards();
  const router = useRouter();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const category = formData.get("category") as string;
    const money = formData.get("money") as string;
    const name = formData.get("name") as string;

    // APIにPOST
    const addCard = async () => {
      try {
        const response = await fetch("../api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name,category, money }),
        });
    
        const newCard = await response.json();
        
        setCards((prev) => [...prev, newCard]); //  追加したデータを反映
      } catch (error) {
        console.error("カード追加エラー:", error);
      }
    };

    addCard();
    router.push("/");
  };

  return (
    <div>
      <p className="font-bold text-xl p-5 m-4">求人投稿</p>
      <form className="flex flex-col p-4 m-4 w-1/2" onSubmit={handleSubmit}>
        <label htmlFor="category">求人カテゴリ選択</label>
        <select id="category" name="category" className="w-64 my-4 border-gray-300 border">
          <option value="">カテゴリを選択▼</option>
          <option value="事務">事務</option>
          <option value="エンジニア">エンジニア</option>
          <option value="営業">営業</option>
          <option value="デザイン">デザイン</option>
          <option value="マーケティング">マーケティング</option>
          <option value="財務・経理">財務・経理</option>
          <option value="人事">人事</option>
          <option value="カスタマーサポート">カスタマーサポート</option>
          <option value="製造">製造</option>
          <option value="医療・介護">医療・介護</option>
        </select>
        <label htmlFor="money">年収（万円）</label>
        <input
          type="number"
          id="money"
          name="money"
          className="rounded border-2 border-gray-300 p-2 w-64"
        />
        <label htmlFor="name">求人タイトル</label>
        <input
          type="text"
          id="name"
          name="name"
          className="rounded border-2 border-gray-300 p-2"
        />
        <button type="submit" className="rounded bg-blue-500 text-white p-2 w-64 my-4">
          投稿
        </button>
      </form>
    </div>
  );
 };


  return (
    <>
      <Header />
      <PostForm />
    </>
  );
};
