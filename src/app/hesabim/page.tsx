export default function Page() {
  return (
    <div className="bg-[#f5f5f7] min-h-screen text-gray-900 font-sans pb-24 py-12">
      <main className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
          <h1 className="text-4xl font-black mb-4 capitalize">Çok Yakında</h1>
          <p className="text-gray-500 mb-8">Bu sayfa şu anda yapım aşamasındadır. En kısa sürede eklenecektir.</p>
          <a href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition shadow-lg">Ana Sayfaya Dön</a>
        </div>
      </main>
    </div>
  );
}
