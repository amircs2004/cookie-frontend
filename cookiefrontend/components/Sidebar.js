
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block min-h-screen">
      <h1 className="text-xl font-bold text-blue-600 mb-8">Dashboard</h1>
      <nav className="space-y-4">
        <Link href="/update-profile" className="block p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition">
          Update Profile
        </Link>
        <Link href="/create-formulaire" className="block p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition">
          Create Formulaire
        </Link>
        <Link href="/explore-packs" className="block p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition">
          Explore Packs
        </Link>
      </nav>
    </aside>
  );
}