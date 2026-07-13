import Link from 'next/link';



export default function Home() {
  return (
    // Flexbox centers the content on the screen
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          HELLO THERE
        </h1>
        
        <p className="text-gray-600 mb-8">
          Welcome to the Smart Wagon System. Please continue to your dashboard.
        </p>

        <Link 
          href="/auth"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
        >
          Go to Login / Register
        </Link>
      </div>
    </div>
  );
}