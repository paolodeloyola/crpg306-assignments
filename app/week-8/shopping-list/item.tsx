export interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li
      onClick={() => {
        console.log("LI CLICKED:", name);
        onSelect();
      }}
      className="flex justify-between items-center border-2 border-black rounded-lg p-3 cursor-pointer"
    >
      <div>
        <p className="font-extrabold text-black">{name}</p>
        <p className="uppercase border-black text-sm text-yellow-500">{category}</p>
      </div>
      <span className="font-medium">x{quantity}</span>
    </li>
  );
}