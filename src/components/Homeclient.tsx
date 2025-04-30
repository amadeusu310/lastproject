"use client";

import { CardsProvider } from "./CardsContext";
import Home from "./Home"; 

export default function HomeClient() {
  return (// HomeClientコンポーネントは、CardsProviderでラップされたHomeコンポーネントを返す
    // これにより、CardsProvider内で定義された状態や関数がHomeコンポーネントで利用可能になる    
    <CardsProvider>
      <Home />
    </CardsProvider>
  );
}