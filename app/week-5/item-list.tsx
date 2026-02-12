"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function ItemList() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  // step 2
  const [sortBy, setSortBy] = useState("name");

  // step 3
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }

    return 0;
  });

  // Third button
  const groupedItems = items.reduce((groups: Record<string, ItemType[]>, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }

    groups[item.category].push(item);
    return groups;
  }, {});

  // Step5
  const sortedCategories = Object.keys(groupedItems).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div>
      {/* Step 4 */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded ${
            sortBy === "name" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded ${
            sortBy === "category" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Category
        </button>

        {/* NEW BUTTON FOR GROUPING */}
        <button
          onClick={() => setSortBy("group")}
          className={`px-4 py-2 rounded ${
            sortBy === "group" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Group by Category
        </button>
      </div>

      {/* STEP 5 */}
      {sortBy === "group" ? (
        <div className="space-y-6">
          {sortedCategories.map((category) => (
            <div key={category}>
              <h2 className="text-lg font-bold capitalize mb-2">
                {category}
              </h2>

              <ul className="space-y-2">
                {groupedItems[category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
