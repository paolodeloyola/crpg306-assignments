"use client";

import { useState } from "react";
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
      .split(",")[0]                // remove ", 1 kg"
      .trim()
      .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "") // remove emojis
      .replace(/\s+/g, " ")        // clean extra spaces
      .trim();

    console.log("Selected ingredient:", cleanedName);

    setSelectedItemName(cleanedName);
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
            {/* Left side */}
            <div className="flex-1 space-y-4">
              <div className="border-4 border-black bg-yellow-100 shadow-[6px_6px_0_#000] p-4">
                <NewItem onAddItem={handleAddItem} />
              </div>

              <div className="border-4 border-black bg-gray-100 shadow-[6px_6px_0_#000] p-4">
                <ItemList items={items} onItemSelect={handleItemSelect} />
              </div>
            </div>

            {/* Right side */}
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