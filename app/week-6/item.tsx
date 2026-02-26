export interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="flex justify-between items-center border-2 border-black rounded-lg p-3">
      <div>
        <p className="font-extrabold text-black">{name}</p>
        <p className="uppercase border-black text-sm text-yellow-500">{category}</p>
      </div>
      <span className="font-medium">x{quantity}</span>
    </li>
  );
}
