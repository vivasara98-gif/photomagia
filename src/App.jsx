import { useState } from "react";

function App() {
  const [language, setLanguage] = useState("pt");

  const content = {
    pt: {
      title: "PhotoMagia",
      subtitle: "Transforma as tuas fotos em ímanes mágicos ✨",
      upload: "Fazer Upload da Foto",
      packages: "Pacotes Disponíveis",
      buy: "Encomendar",
    },
    en: {
      title: "PhotoMagia",
      subtitle: "Turn your photos into magical magnets ✨",
      upload: "Upload Photo",
      packages: "Available Packages",
      buy: "Order Now",
    },
    fr: {
      title: "PhotoMagia",
      subtitle: "Transformez vos photos en aimants magiques ✨",
      upload: "Télécharger la photo",
      packages: "Forfaits disponibles",
      buy: "Commander",
    },
  };

  const packages = [
    { qty: 5, price: 15, discount: "Sem desconto" },
    { qty: 10, price: 28, discount: "7% desconto" },
    { qty: 20, price: 50, discount: "17% desconto" },
    { qty: 50, price: 110, discount: "27% desconto" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 text-gray-800">
      
      {/* Navbar */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-pink-600">PhotoMagia</h1>
        <div className="space-x-2">
          <button onClick={() => setLanguage("pt")} className="px-3 py-1 bg-white rounded">PT</button>
          <button onClick={() => setLanguage("en")} className="px-3 py-1 bg-white rounded">EN</button>
          <button onClick={() => setLanguage("fr")} className="px-3 py-1 bg-white rounded">FR</button>
        </div>
      </div>

      {/* Hero */}
      <div className="text-center py-16 px-4">
        <h2 className="text-5xl font-bold mb-4 text-purple-700">
          {content[language].title}
        </h2>
        <p className="text-xl mb-8">{content[language].subtitle}</p>

        <input type="file" className="mb-4" />
        <br />
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-lg shadow-lg">
          {content[language].upload}
        </button>
      </div>

      {/* Packages */}
      <div className="py-16 px-6 bg-white rounded-t-3xl shadow-xl">
        <h3 className="text-3xl font-bold text-center mb-12">
          {content[language].packages}
        </h3>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {packages.map((pack, index) => (
            <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-100 p-6 rounded-2xl shadow-md text-center">
              <h4 className="text-2xl font-bold mb-2">{pack.qty} Ímanes</h4>
              <p className="text-lg mb-2">{pack.price}€</p>
              <p className="text-sm text-green-600 mb-4">{pack.discount}</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full">
                {content[language].buy}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-sm text-gray-600">
        © 2026 PhotoMagia – Ímanes personalizados 5x5cm – 3€ cada
      </div>
    </div>
  );
}

export default App;