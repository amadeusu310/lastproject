"use client";
import { useState } from "react";
import { useCards } from "./CardsContext"

export default function Home() {
  const { cards, setCards } = useCards();
  const [categories, setCategory] = useState<string[]>([]);
  const [select, setSelect] = useState<string>("300");

  const onChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCategory([...categories, event.target.value]);
    } else {
      setCategory(categories.filter((category) => category !== event.target.value));
    }
  };

  const PulldownMenu: React.FC = () => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelect(event.target.value);
    };

    return (
      <div className="flex-col flex p-2">
        <label htmlFor="salary-select" className="font-bold text-xl">
          年収
        </label>
        <select title="Choose a salary" value={select} onChange={handleSelect} className="w-1/2 ">
          <option value="300">300万円以上</option>
          <option value="500">500万円以上</option>
          <option value="700">700万円以上</option>
        </select>
      </div>
    );
  };

  const Sidebar: React.FC = () => {
    const isChecked = (value: string): boolean => {
      return categories.includes(value);
    };

    return (
      <div className="flex flex-col bg-gray-200 w-1/4  min-h-screen ">
        <p className="font-bold text-xl p-1">求人カテゴリ</p>
        {[
          "事務",
          "エンジニア",
          "営業",
          "デザイン",
          "マーケティング",
          "財務・経理",
          "人事",
          "カスタマーサポート",
          "製造",
          "医療・介護",
        ].map((category) => (
          <div className="p-1" key={category}>
            <label>
              <input
                type="checkbox"
                name="category"
                value={category}
                onChange={onChangeCategory}
                checked={isChecked(category)}
              />
              {category}
            </label>
          </div>
        ))}
        <PulldownMenu />
      </div>
    );
  };

  let filteredCards = cards;
  if (categories.length > 0) {
    filteredCards = filteredCards.filter((card) => categories.includes(card.category));
  }
  filteredCards = filteredCards.filter((card) => {
    return Number(card.money) >= Number(select);
  });

  const Filter: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 10;

    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCards.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems: number = filteredCards.length;
    const totalPages: number = Math.ceil(totalItems / itemsPerPage);
    const handleCurrentPage = (num: number): void => {
      if (num > 0 && num <= totalPages) {
        setCurrentPage(num);
      }
    };

    return (
      <div className=" w-3/4 min-h-screen ">
        <div>
          <p className="font-bold text-xl">求人一覧</p>
          <p>{`該当件数:${totalItems}件`}</p>
        </div>
        <div className=" flex flex-col ">
          {currentItems.map((card) => (
            <div className="border-gray-300 border-2 p-2 m-2 w-8777 border-radius rounded">
              <div>{card.name}</div>
              <div>カテゴリ:{card.category}</div>
              <div>年収{card.money}万円</div>
            </div>
          ))}
        </div>
        <div className="  flex justify-center p-2 m-2">
          <button onClick={() => handleCurrentPage(currentPage - 1)} className="text-xl">
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => handleCurrentPage(page)} className="text-xl" type="button">
              {page}
            </button>
          ))}
          <button onClick={() => handleCurrentPage(currentPage + 1)} className="text-xl" type="button">
            {">"}
          </button>
        </div>
      </div>
    );
  };
  return (
   
      
      <div className="flex min-h-screen">
        <Sidebar />
        <Filter />
      </div>
    
  );
}