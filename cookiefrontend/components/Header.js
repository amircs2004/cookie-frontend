export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700">My Dashboard</h2>
      <button className="text-red-500 font-medium hover:underline">
        Log Out
      </button>
    </header>
  );
}
