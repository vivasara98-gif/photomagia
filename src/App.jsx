import { useMemo, useState } from "react";

export default function App() {
  const [language, setLanguage] = useState("pt");
  const [selectedPack, setSelectedPack] = useState(10);
  const [file, setFile] = useState(null);

  const stripeLink = "https://buy.stripe.com/test_aFa7sMgcIbdsceM7XB0Fi00";

  const content = {
    pt: {
      title: "PhotoMagia",
      subtitle: "Transforma as tuas fotos em ímanes mágicos ✨",
      upload: "Carregar foto",
      choosePack: "Escolhe o teu pack",
      buy: "Comprar agora",
      howItWorks: "Como funciona",
      step1: "1. Escolhe o pack",
      step2: "2. Carrega a tua foto",
      step3: "3. Finaliza a compra",
      preview: "Pré-visualização",
      footer: "Ímanes personalizados 5x5cm",
    },
    en: {
      title: "PhotoMagia",
      subtitle: "Turn your photos into magical magnets ✨",
      upload: "Upload photo",
      choosePack: "Choose your pack",
      buy: "Buy now",
      howItWorks: "How it works",
      step1: "1. Choose your pack",
      step2: "2. Upload your photo",
      step3: "3. Complete your purchase",
      preview: "Preview",
      footer: "Custom 5x5cm magnets",
    },
    fr: {
      title: "PhotoMagia",
      subtitle: "Transformez vos photos en aimants magiques ✨",
      upload: "Télécharger une photo",
      choosePack: "Choisissez votre pack",
      buy: "Acheter maintenant",
      howItWorks: "Comment ça marche",
      step1: "1. Choisissez le pack",
      step2: "2. Téléchargez votre photo",
      step3: "3. Finalisez l'achat",
      preview: "Aperçu",
      footer: "Aimants personnalisés 5x5cm",
    },
  };

  const packs = [
    { qty: 5, price: 15, unit: "3.00€ / íman", discount: "Sem desconto" },
    { qty: 10, price: 28, unit: "2.80€ / íman", discount: "-7%" },
    { qty: 20, price: 50, unit: "2.50€ / íman", discount: "-17%" },
    { qty: 50, price: 110, unit: "2.20€ / íman", discount: "-27%" },
  ];

  const current = content[language];
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  const handlePay = () => {
    window.location.href = stripeLink;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100 text-gray-800">
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-3xl font-bold text-purple-700">PhotoMagia</div>
        <div className="space-x-2">
          <button onClick={() => setLanguage("pt")} className="px-3 py-1 bg-white rounded-full shadow text-sm">
            PT
          </button>
          <button onClick={() => setLanguage("en")} className="px-3 py-1 bg-white rounded-full shadow text-sm">
            EN
          </button>
          <button onClick={() => setLanguage("fr")} className="px-3 py-1 bg-white rounded-full shadow text-sm">
            FR
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold text-purple-800 leading-tight">
            {current.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {current.subtitle}
          </p>

          <div className="mt-8 bg-white rounded-3xl shadow-lg p-6 border border-purple-100">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">
              {current.upload}
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm mb-4"
            />

            {previewUrl && (
              <div>
                <p className="text-sm text-gray-600 mb-3">{current.preview}</p>
                <div className="w-40 h-40 rounded-2xl overflow-hidden border border-purple-200 shadow">
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-8">
            {current.choosePack}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {packs.map((pack) => {
              const active = selectedPack === pack.qty;
              return (
                <button
                  key={pack.qty}
                  onClick={() => setSelectedPack(pack.qty)}
                  className={`text-left rounded-2xl p-5 border transition shadow-sm ${
                    active
                      ? "border-purple-500 ring-2 ring-purple-300 bg-purple-50"
                      : "border-gray-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <div className="text-2xl font-bold mb-2">{pack.qty} Ímanes</div>
                  <div className="text-xl mb-2">€{pack.price.toFixed(2)}</div>
                  <div className="text-green-600 text-sm mb-2">{pack.discount}</div>
                  <div className="text-gray-500 text-sm">{pack.unit}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 bg-purple-50 rounded-2xl p-5 border border-purple-200">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>
                €
                {packs.find((p) => p.qty === selectedPack)?.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handlePay}
              className="mt-5 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white py-4 rounded-full text-lg font-semibold shadow-lg"
            >
              {current.buy}
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-2xl font-bold text-center text-purple-800 mb-8">
          {current.howItWorks}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="text-lg font-semibold">{current.step1}</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="text-lg font-semibold">{current.step2}</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="text-lg font-semibold">{current.step3}</div>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 pb-10">
        © {new Date().getFullYear()} PhotoMagia — {current.footer}
      </footer>
    </div>
  );
}