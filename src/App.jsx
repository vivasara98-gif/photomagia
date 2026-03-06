import { useState } from "react";

export default function App() {
  const stripeLink = "https://buy.stripe.com/test_aFa7sMgcIbdsceM7XB0Fi00";

  const packages = [
    { qty: 5, price: 15, discount: "Sem desconto" },
    { qty: 10, price: 28, discount: "-7%" },
    { qty: 20, price: 50, discount: "-17%" },
    { qty: 50, price: 110, discount: "-27%" }
  ];

  const handlePay = () => {
    window.location.href = stripeLink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 text-gray-800">

      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-purple-700">PhotoMagia</h1>
        <p className="text-lg mt-4">Transforma as tuas fotos em ímanes mágicos ✨</p>
      </div>

      {/* Upload */}
      <div className="text-center mb-16">
        <input type="file" className="mb-4"/>
        <br/>
        <button className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg">
          Enviar foto
        </button>
      </div>

      {/* Packages */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6 pb-20">
        {packages.map((pack, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">

            <h2 className="text-2xl font-bold mb-2">
              {pack.qty} Ímanes
            </h2>

            <p className="text-xl font-semibold mb-2">
              €{pack.price}
            </p>

            <p className="text-green-600 mb-4">
              {pack.discount}
            </p>

            <button
              onClick={handlePay}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full"
            >
              Comprar
            </button>

          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-sm pb-10 text-gray-600">
        © {new Date().getFullYear()} PhotoMagia
      </div>

    </div>
  );
}