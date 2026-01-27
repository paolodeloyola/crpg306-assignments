import Link from "next/link";

export default function StudentInfo() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Name: Paolo Manalastas</h1>

      <p className="mt-2">
        <Link
          href="https://github.com/paolodeloyola/crpg306-assignments"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Repository
        </Link>
      </p>
    </div>
  );
}
