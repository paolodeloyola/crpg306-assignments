"use client";

import { useMemo, useState } from "react";
import Item from "./item";

// added item seelct 
interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

interface ItemListProps {
  items: ItemType[];
  onItemSelect: (item: ItemType) => void;
}

export default function ItemList({ items = [], onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = useMemo(() => {
    const copy = [...items];

    if (sortBy === "name") {
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "category") {
      return copy.sort((a, b) => a.category.localeCompare(b.category));
    }

    return copy;
  }, [items, sortBy]);

  const groupedItems = useMemo(() => {
    return items.reduce((groups: Record<string, ItemType[]>, item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }

      groups[item.category].push(item);
      return groups;
    }, {});
  }, [items]);

  const sortedCategories = useMemo(() => {
    return Object.keys(groupedItems).sort((a, b) => a.localeCompare(b));
  }, [groupedItems]);

  return (
    <div>
      {/* BUTTONS */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded ${
            sortBy === "name" ? "bg-purple-600 text-white" : "bg-purple-200"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded ${
            sortBy === "category" ? "bg-purple-600 text-white" : "bg-purple-200"
          }`}
        >
          Sort by Category
        </button>

        <button
          onClick={() => setSortBy("group")}
          className={`px-4 py-2 rounded ${
            sortBy === "group" ? "bg-purple-600 text-white" : "bg-purple-200"
          }`}
        >
          Group by Category
        </button>
      </div>

      {sortBy === "group" ? (
        <div className="space-y-6">
          {sortedCategories.map((category) => {
            const itemsInCategory = [...groupedItems[category]].sort((a, b) =>
              a.name.localeCompare(b.name)
            );

            return (
              <div key={category}>
                <h2 className="text-lg font-extrabold capitalize mb-3 text-black py-1 px-2 inline-block">
                  {category}
                </h2>

                <ul className="space-y-2">
                  {itemsInCategory.map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                      onSelect={() => onItemSelect(item)} //click click
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <ul className="space-y-3">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}