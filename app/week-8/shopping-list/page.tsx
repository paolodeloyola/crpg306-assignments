"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const { user } = useUserAuth();

  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  function handleAddItem(newItem: Omit<ItemType, "id"> | ItemType) {
    const itemWithId: ItemType = {
      id: "id" in newItem ? newItem.id : Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
    };

    setItems((prev) => [...prev, itemWithId]);
  }

  function handleItemSelect(item: ItemType) {
    const cleanedName = item.name
      .split(",")[0]
      .trim()
      .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "")
      .replace(/\s+/g, " ")
      .trim();

    console.log("Selected ingredient:", cleanedName);

    setSelectedItemName(cleanedName);
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white border border-gray-300 rounded-md p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            You are not logged in
          </h1>
          <p className="text-gray-600 mb-6">
            Login to view the shopping list.
          </p>
          <Link
            href="/week-8"
            className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 font-mono bg-purple-300">
      <div className="mx-auto max-w-5xl">
        <div className="border-4 border-black bg-white shadow-[8px_8px_0_#000] p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl font-extrabold tracking-wide text-fuchsia-600 drop-shadow-[2px_2px_0_#000]">
              Shopping List
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="border-4 border-black bg-yellow-100 shadow-[6px_6px_0_#000] p-4">
                <NewItem onAddItem={handleAddItem} />
              </div>

              <div className="border-4 border-black bg-gray-100 shadow-[6px_6px_0_#000] p-4">
                <ItemList items={items} onItemSelect={handleItemSelect} />
              </div>
            </div>

            <div className="w-full lg:w-1/3 border-4 border-black bg-green-100 shadow-[6px_6px_0_#000] p-4">
              <p className="mb-2 text-sm text-black">
                Selected: {selectedItemName || "(none)"}
              </p>
              <MealIdeas ingredient={selectedItemName} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}