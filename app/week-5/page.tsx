import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen p-6 font-mono bg-purple-300">
      <div className="mx-auto max-w-2xl">
        <div className="border-4 border-black bg-white shadow-[8px_8px_0_#000] p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl font-extrabold tracking-wide text-fuchsia-600 drop-shadow-[2px_2px_0_#000]">
                Shopping List
            </h1>
          </div>

          <div className="border-4 border-black bg-gray-100 shadow-[6px_6px_0_#000] p-4">
            <ItemList />
          </div>

        </div>
      </div>
    </main>
  );
}
