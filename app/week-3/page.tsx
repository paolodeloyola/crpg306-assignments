import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-3xl font-bold text-center">
          Shopping List
        </h1>

        <div className="rounded-lg bg-white p-4 shadow">
          <ItemList />
        </div>
      </div>
    </main>
  );
}
