"use client";

import { CardsProvider } from "./CardsContext";
import Home from "./Home"; // Homeはさらに分割してもOK

export default function HomeClient() {
  return (
    <CardsProvider>
      <Home />
    </CardsProvider>
  );
}