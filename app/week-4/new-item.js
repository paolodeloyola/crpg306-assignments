"use client";

import React, { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const [nameTouched, setNameTouched] = useState(false);

  const cleanName = name.trim();
  const nameInvalid = cleanName.length < 2;
  const showError = nameTouched && nameInvalid;

  const formIncomplete = nameInvalid || quantity < 1 || quantity > 99;

  function handleSubmit(event) {
    event.preventDefault();

    // Force validation on submit
    setNameTouched(true);

    if (nameInvalid) {
      alert("Name must be at least 2 characters.");
      return;
    }

    const item = { name: cleanName, quantity, category };
    console.log(item);

    alert(
      `Name: ${item.name}\nQuantity: ${item.quantity}\nCategory: ${item.category}`,
    );

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 p-4">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-green-200 border border-green-600 rounded-xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-green-900 text-center">
          Add Item
        </h2>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-green-900">Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameTouched(false)}
            onBlur={() => setNameTouched(true)}
            required
            className={`w-full p-2 rounded bg-yellow-50 text-green-900 border ${
              showError ? "border-red-500" : "border-green-600"
            }`}
          />

          {showError && (
            <p className="mt-1 text-sm text-red-500">
              Must be at least 2 characters.
            </p>
          )}
        </div>

        {/* Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quantity */}
          <div>
            <label className="block mb-1 font-medium text-green-900">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="w-full p-2 border border-green-600 rounded bg-yellow-50 text-green-900"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium text-green-900">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-green-600 rounded bg-yellow-50 text-green-900"
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="frozen foods">Frozen Foods</option>
              <option value="canned goods">Canned Goods</option>
              <option value="dry goods">Dry Goods</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={formIncomplete}
          className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
