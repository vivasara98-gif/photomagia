import { useMemo, useState } from "react";

export default function App() {
  const [language, setLanguage] = useState("pt");
  const [selectedPack, setSelectedPack] = useState(10);
  const [file, setFile] = useState(null);

  const stripeLink = "https://buy.stripe.com/test_aFa7sMgcIbdsceM7XB0Fi00";

  const content = {
    pt: {
      brand: "PhotoMagia",
      title: "Transforma memórias especiais em ímanes delicados",
      subtitle:
        "Cria um presente bonito, pessoal e cheio de significado com as tuas fotos favoritas.",
      upload: "Carregar foto",
      preview: "Pré-visualização",
      choosePack: "Escolhe o teu pack",
      buy: "Comprar agora",
      popular: "Mais querido",
      how: "Como funciona",
      step1: "Escolhe o pack",
      step2: "Carrega a tua foto",
      step3: "Finaliza a encomenda",
      inspiration: "Perfeito para momentos especiais",
      occasion1: "Casamentos",
      occasion2: "Bebés",
      occasion3: "Viagens",
      occasion4: "Aniversários",
      whyTitle: "Porque vais adorar",
      why1Title: "Delicado e especial",
      why1Text: "Cada íman transforma uma memória numa pequena peça cheia de emoção.",
      why2Title: "Bonito para oferecer",
      why2Text: "Uma lembrança perfeita para surpreender alguém com algo pessoal.",
      why3Title: "Feito com carinho",
      why3Text: "Produzido com atenção ao detalhe para que cada momento fique bonito.",
      shippingTitle: "Envio",
      shipping1: "Portugal — envio disponível",
      shipping2: "Europa — envio disponível",
      footer: "Ímanes personalizados 5x5cm",
    },
    en: {
      brand: "PhotoMagia",
      title: "Turn special memories into delicate magnets",
      subtitle:
        "Create a beautiful, personal and meaningful gift with your favorite photos.",
      upload: "Upload photo",
      preview: "Preview",
      choosePack: "Choose your pack",
      buy: "Buy now",
      popular: "Most loved",
      how: "How it works",
      step1: "Choose your pack",
      step2: "Upload your photo",
      step3: "Complete your order",
      inspiration: "Perfect for special moments",
      occasion1: "Weddings",
      occasion2: "Babies",
      occasion3: "Travel",
      occasion4: "Birthdays",
      whyTitle: "Why you’ll love it",
      why1Title: "Delicate and special",
      why1Text: "Each magnet turns a memory into a small piece full of emotion.",
      why2Title: "Beautiful to gift",
      why2Text: "A perfect keepsake to surprise someone with something personal.",
      why3Title: "Made with care",
      why3Text: "Produced with attention to detail so every moment looks beautiful.",
      shippingTitle: "Shipping",
      shipping1: "Portugal — shipping available",
      shipping2: "Europe — shipping available",
      footer: "Custom 5x5cm magnets",
    },
    fr: {
      brand: "PhotoMagia",
      title: "Transformez vos souvenirs en aimants délicats",
      subtitle:
        "Créez un cadeau beau, personnel et plein de sens avec vos photos préférées.",
      upload: "Télécharger une photo",
      preview: "Aperçu",
      choosePack: "Choisissez votre pack",
      buy: "Acheter maintenant",
      popular: "Le plus aimé",
      how: "Comment ça marche",
      step1: "Choisissez le pack",
      step2: "Téléchargez votre photo",
      step3: "Finalisez la commande",
      inspiration: "Parfait pour les moments spéciaux",
      occasion1: "Mariages",
      occasion2: "Bébés",
      occasion3: "Voyages",
      occasion4: "Anniversaires",
      whyTitle: "Pourquoi vous allez adorer",
      why1Title: "Délicat et spécial",
      why1Text: "Chaque aimant transforme un souvenir en petite pièce pleine d’émotion.",
      why2Title: "Beau à offrir",
      why2Text: "Un souvenir parfait pour surprendre quelqu’un avec quelque chose de personnel.",
      why3Title: "Fait avec soin",
      why3Text: "Réalisé avec attention pour que chaque moment soit magnifique.",
      shippingTitle: "Livraison",
      shipping1: "Portugal — livraison disponible",
      shipping2: "Europe — livraison disponible",
      footer: "Aimants personnalisés 5x5cm",
    },
  };

  const packs = [
    { qty: 5, price: 15, unit: "3.00€ / íman", discount: "Sem desconto", featured: false },
    { qty: 10, price: 28, unit: "2.80€ / íman", discount: "-7%", featured: true },
    { qty: 20, price: 50, unit: "2.50€ / íman", discount: "-17%", featured: false },
    { qty: 50, price: 110, unit: "2.20€ / íman", discount: "-27%", featured: false },
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

  const selectedPrice = packs.find((p) => p.qty === selectedPack)?.price ?? 28;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white text-gray-800">
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-3xl font-semibold text-rose-500 tracking-tight">{current.brand}</div>
        <div className="space-x-2">
          <button onClick={() => setLanguage("pt")} className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm text-gray-700">
            PT
          </button>
          <button onClick={() => setLanguage("en")} className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm text-gray-700">
            EN
          </button>
          <button onClick={() => setLanguage("fr")} className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm text-gray-700">
            FR
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-4 py-2 rounded-full bg-white shadow-sm text-sm text-rose-500 mb-5">
            Ímanes delicados • 5×5 cm
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-gray-800">
            {current.title}
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-xl leading-relaxed">
            {current.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[current.occasion1, current.occasion2, current.occasion3, current.occasion4].map((item) => (
              <span
                key={item}
                className="px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-[2rem] shadow-xl border border-rose-100 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-rose-500 mb-4">{current.upload}</h2>

          <label className="flex items-center justify-center w-full min-h-[150px] border-2 border-dashed border-rose-200 rounded-[1.5rem] cursor-pointer bg-rose-50 hover:bg-rose-100/60 transition">
            <div className="text-center px-4">
              <div className="text-base font-medium text-rose-500">{current.upload}</div>
              <div className="text-sm text-gray-500 mt-1">JPG, PNG, HEIC</div>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          {previewUrl && (
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">{current.preview}</p>
              <div className="w-44 h-44 rounded-[1.5rem] overflow-hidden border border-rose-200 shadow bg-white">
                <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <button
            onClick={handlePay}
            className="mt-6 w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:opacity-95 text-white py-4 rounded-full text-lg font-medium shadow-lg"
          >
            {current.buy}
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          {current.choosePack}
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {packs.map((pack) => {
            const active = selectedPack === pack.qty;
            return (
              <div
                key={pack.qty}
                className={`relative rounded-[2rem] p-6 border transition bg-white shadow-sm ${
                  active ? "border-rose-300 ring-2 ring-rose-200" : "border-rose-100"
                } ${pack.featured ? "shadow-xl md:-mt-3" : ""}`}
              >
                {pack.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-400 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow">
                    {current.popular}
                  </div>
                )}

                <div className="text-2xl font-semibold text-gray-800 mb-2">{pack.qty} Ímanes</div>
                <div className="text-3xl font-semibold mb-2">€{pack.price.toFixed(2)}</div>
                <div className="text-emerald-600 text-sm mb-2">{pack.discount}</div>
                <div className="text-gray-500 text-sm mb-6">{pack.unit}</div>

                <button
                  onClick={() => setSelectedPack(pack.qty)}
                  className={`w-full py-3 rounded-full transition font-medium ${
                    active
                      ? "bg-rose-400 text-white"
                      : "bg-rose-50 text-rose-500 hover:bg-rose-100"
                  }`}
                >
                  Selecionar
                </button>
              </div>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-[2rem] shadow-lg border border-rose-100 p-6">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>€{selectedPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePay}
            className="mt-5 w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:opacity-95 text-white py-4 rounded-full text-lg font-medium shadow-lg"
          >
            {current.buy}
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          {current.inspiration}
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[current.occasion1, current.occasion2, current.occasion3, current.occasion4].map((item) => (
            <div key={item} className="bg-white rounded-[2rem] shadow-md overflow-hidden border border-rose-100">
              <div className="h-40 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-rose-500 font-medium text-lg">
                {item}
              </div>
              <div className="p-4 text-sm text-gray-600">
                Um detalhe delicado para guardar um momento especial.
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          {current.whyTitle}
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[2rem] shadow-md p-6 text-center border border-rose-100">
            <div className="text-lg font-semibold text-rose-500 mb-2">{current.why1Title}</div>
            <p className="text-sm text-gray-600">{current.why1Text}</p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-md p-6 text-center border border-rose-100">
            <div className="text-lg font-semibold text-rose-500 mb-2">{current.why2Title}</div>
            <p className="text-sm text-gray-600">{current.why2Text}</p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-md p-6 text-center border border-rose-100">
            <div className="text-lg font-semibold text-rose-500 mb-2">{current.why3Title}</div>
            <p className="text-sm text-gray-600">{current.why3Text}</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10 pb-16">
        <div className="bg-white rounded-[2rem] shadow-lg p-8 text-center border border-rose-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">{current.shippingTitle}</h3>
          <p className="text-gray-600 mb-2">{current.shipping1}</p>
          <p className="text-gray-600">{current.shipping2}</p>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 pb-10">
        © {new Date().getFullYear()} PhotoMagia — {current.footer}
      </footer>
    </div>
  );
}