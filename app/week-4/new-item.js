"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  return <div>{name}</div>;
}
