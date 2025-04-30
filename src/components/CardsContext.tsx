"use client"
//useCntextを使って、コンポーネント間で状態を共有するためのコンテキストを作成
// useContextを使うことで、コンポーネント間で状態を共有する
import React, { createContext, useContext, useState, useEffect } from "react";

type Card = {
  name: string;
  category: string;
  money: string;
}

type CardsContextType = {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) throw new Error("useCards must be used within CardsProvider");
  return context;
};

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response: Response = await fetch("/api");
      const data = await response.json();
      console.log(data);
      setCards(data.data);
    };
    fetchData();
  }, []);

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};