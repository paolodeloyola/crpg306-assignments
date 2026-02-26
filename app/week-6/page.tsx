"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  function handleAddItem(newItem: Omit<ItemType, "id"> | ItemType) {
    const itemWithId: ItemType = {
      id: "id" in newItem ? newItem.id : Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
    };

    setItems((prev) => [...prev, itemWithId]);
  }

  return (
    <main className="min-h-screen p-6 font-mono bg-purple-300">
      <div className="mx-auto max-w-2xl">
        <div className="border-4 border-black bg-white shadow-[8px_8px_0_#000] p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl font-extrabold tracking-wide text-fuchsia-600 drop-shadow-[2px_2px_0_#000]">
              Shopping List
            </h1>
          </div>

          {/* NewItem form */}
          <div className="mb-4 border-4 border-black bg-yellow-100 shadow-[6px_6px_0_#000] p-4">
            <NewItem onAddItem={handleAddItem} />
          </div>

          {/* Item list */}
          <div className="border-4 border-black bg-gray-100 shadow-[6px_6px_0_#000] p-4">
            <ItemList items={items} />
          </div>
        </div>
      </div>
    </main>
  );
}