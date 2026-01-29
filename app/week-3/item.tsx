export interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="flex justify-between items-center border rounded-lg p-3">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{category}</p>
      </div>
      <span className="font-medium">x{quantity}</span>
    </li>
  );
}
