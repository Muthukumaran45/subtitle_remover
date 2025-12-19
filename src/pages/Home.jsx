function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-600 to-blue-700 relative">

      <div className="absolute inset-[10%] bg-white rounded-2xl shadow-2xl p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>This card always stays inside with 10% margin around.</p>
      </div>

    </div>
  );
}

export default Home;
