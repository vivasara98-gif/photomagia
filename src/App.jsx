import { useMemo, useState } from "react";

export default function App() {
  const [language, setLanguage] = useState("pt");
  const [selectedPack, setSelectedPack] = useState(10);
  const [file, setFile] = useState(null);

  const stripeLink = "https://buy.stripe.com/test_aFa7sMgcIbdsceM7XB0Fi00";

  const content = {
    pt: {
      brand: "PhotoMagia",
      title: "Transforma as tuas memórias em ímanes personalizados",
      subtitle:
        "Cria presentes únicos com as tuas fotos favoritas. Perfeito para aniversários, casamentos, bebés, viagens e momentos especiais.",
      upload: "Carregar foto",
      preview: "Pré-visualização",
      choosePack: "Escolhe o teu pack",
      buy: "Comprar agora",
      how: "Como funciona",
      step1: "Escolhe o pack ideal",
      step2: "Carrega a tua foto favorita",
      step3: "Finaliza a compra com segurança",
      inspiration: "Ideias que ficam lindas em íman",
      popular: "Mais popular",
      footer: "Ímanes personalizados 5x5cm",
      occasion1: "Casamentos",
      occasion2: "Bebés",
      occasion3: "Viagens",
      occasion4: "Aniversários",
      whyTitle: "Porque escolher PhotoMagia",
      why1Title: "Qualidade Premium",
      why1Text: "Ímanes resistentes com impressão de alta qualidade para durar muitos anos.",
      why2Title: "Presente Perfeito",
      why2Text: "Ideal para aniversários, casamentos, viagens e momentos especiais.",
      why3Title: "Produção Rápida",
      why3Text: "Produzimos rapidamente e enviamos para Portugal e Europa.",
      shippingTitle: "Envio",
      shipping1: "🇵🇹 Portugal — envio rápido",
      shipping2: "🇪🇺 Europa — disponível",
      faqTitle: "Perguntas Frequentes",
      faq1Q: "Qual o tamanho dos ímanes?",
      faq1A: "Todos os ímanes têm tamanho 5x5cm.",
      faq2Q: "Que tipo de fotos posso usar?",
      faq2A: "Qualquer foto pessoal, viagem, bebé, casamento ou animal de estimação.",
      faq3Q: "Quanto tempo demora?",
      faq3A: "Normalmente enviamos em poucos dias após receber a encomenda.",
    },
    en: {
      brand: "PhotoMagia",
      title: "Turn your memories into personalized magnets",
      subtitle:
        "Create unique gifts with your favorite photos. Perfect for birthdays, weddings, babies, travel and special moments.",
      upload: "Upload photo",
      preview: "Preview",
      choosePack: "Choose your pack",
      buy: "Buy now",
      how: "How it works",
      step1: "Choose your ideal pack",
      step2: "Upload your favorite photo",
      step3: "Complete your purchase securely",
      inspiration: "Ideas that look beautiful as magnets",
      popular: "Most popular",
      footer: "Custom 5x5cm magnets",
      occasion1: "Weddings",
      occasion2: "Babies",
      occasion3: "Travel",
      occasion4: "Birthdays",
      whyTitle: "Why choose PhotoMagia",
      why1Title: "Premium Quality",
      why1Text: "Durable magnets with high-quality printing made to last.",
      why2Title: "Perfect Gift",
      why2Text: "Ideal for birthdays, weddings, travel and special moments.",
      why3Title: "Fast Production",
      why3Text: "We produce quickly and ship to Portugal and Europe.",
      shippingTitle: "Shipping",
      shipping1: "🇵🇹 Portugal — fast shipping",
      shipping2: "🇪🇺 Europe — available",
      faqTitle: "Frequently Asked Questions",
      faq1Q: "What size are the magnets?",
      faq1A: "All magnets are 5x5cm.",
      faq2Q: "What kind of photos can I use?",
      faq2A: "Any personal photo, travel, baby, wedding or pet picture.",
      faq3Q: "How long does it take?",
      faq3A: "We usually ship within a few days after receiving the order.",
    },
    fr: {
      brand: "PhotoMagia",
      title: "Transformez vos souvenirs en aimants personnalisés",
      subtitle:
        "Créez des cadeaux uniques avec vos photos préférées. Parfait pour anniversaires, mariages, bébés, voyages et moments spéciaux.",
      upload: "Télécharger une photo",
      preview: "Aperçu",
      choosePack: "Choisissez votre pack",
      buy: "Acheter maintenant",
      how: "Comment ça marche",
      step1: "Choisissez le pack idéal",
      step2: "Téléchargez votre photo préférée",
      step3: "Finalisez l'achat en toute sécurité",
      inspiration: "Des idées parfaites pour vos aimants",
      popular: "Le plus populaire",
      footer: "Aimants personnalisés 5x5cm",
      occasion1: "Mariages",
      occasion2: "Bébés",
      occasion3: "Voyages",
      occasion4: "Anniversaires",
      whyTitle: "Pourquoi choisir PhotoMagia",
      why1Title: "Qualité Premium",
      why1Text: "Aimants résistants avec impression de haute qualité.",
      why2Title: "Cadeau Parfait",
      why2Text: "Idéal pour anniversaires, mariages, voyages et moments spéciaux.",
      why3Title: "Production Rapide",
      why3Text: "Nous produisons rapidement et expédions au Portugal et en Europe.",
      shippingTitle: "Livraison",
      shipping1: "🇵🇹 Portugal — livraison rapide",
      shipping2: "🇪🇺 Europe — disponible",
      faqTitle: "Questions fréquentes",
      faq1Q: "Quelle est la taille des aimants ?",
      faq1A: "Tous les aimants mesurent 5x5cm.",
      faq2Q: "Quel type de photos puis-je utiliser ?",
      faq2A: "Toute photo personnelle, voyage, bébé, mariage ou animal.",
      faq3Q: "Combien de temps cela prend-il ?",
      faq3A: "Nous expédions généralement quelques jours après la commande.",
    },
  };

  const packs = [
    { qty: 5, price: 15, unit: "3.00€ / íman", discount: "Sem desconto", highlight: false },
    { qty: 10, price: 28, unit: "2.80€ / íman", discount: "-7%", highlight: true },
    { qty: 20, price: 50, unit: "2.50€ / íman", discount: "-17%", highlight: false },
    { qty: 50, price: 110, unit: "2.20€ / íman", discount: "-27%", highlight: false },
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-violet-50 text-gray-800">
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-3xl font-bold text-violet-700">{current.brand}</div>
        <div className="space-x-2">
          <button onClick={() => setLanguage("pt")} className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm">PT</button>
          <button onClick={() => setLanguage("en")} className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm">EN</button>
          <button onClick={() => setLanguage("fr")} className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm">FR</button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-white shadow-sm text-sm text-violet-700 mb-5">
            Photo magnets • 5×5 cm
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-violet-800 leading-tight">{current.title}</h1>
          <p className="mt-5 text-lg text-gray-600 max-w-xl">{current.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-white rounded-full shadow-sm text-sm">{current.occasion1}</div>
            <div className="px-4 py-2 bg-white rounded-full shadow-sm text-sm">{current.occasion2}</div>
            <div className="px-4 py-2 bg-white rounded-full shadow-sm text-sm">{current.occasion3}</div>
            <div className="px-4 py-2 bg-white rounded-full shadow-sm text-sm">{current.occasion4}</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-violet-100 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-violet-700 mb-4">{current.upload}</h2>

          <label className="flex items-center justify-center w-full min-h-[140px] border-2 border-dashed border-violet-200 rounded-2xl cursor-pointer bg-violet-50/50 hover:bg-violet-50 transition">
            <div className="text-center px-4">
              <div className="text-base font-medium text-violet-700">{current.upload}</div>
              <div className="text-sm text-gray-500 mt-1">JPG, PNG, HEIC</div>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          {previewUrl && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">{current.preview}</p>
              <div className="w-44 h-44 rounded-3xl overflow-hidden border border-violet-200 shadow-md bg-white">
                <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <button
            onClick={handlePay}
            className="mt-6 w-full bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-95 text-white py-4 rounded-full text-lg font-semibold shadow-lg"
          >
            {current.buy}
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-violet-800 mb-10">{current.choosePack}</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {packs.map((pack) => {
            const active = selectedPack === pack.qty;
            return (
              <div
                key={pack.qty}
                className={`relative rounded-3xl p-6 border shadow-sm transition ${
                  active ? "border-violet-500 ring-2 ring-violet-300 bg-white" : "border-gray-200 bg-white"
                } ${pack.highlight ? "md:-mt-3 shadow-xl" : ""}`}
              >
                {pack.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow">
                    {current.popular}
                  </div>
                )}

                <div className="text-2xl font-bold mb-2 text-violet-800">{pack.qty} Ímanes</div>
                <div className="text-3xl font-bold mb-2">€{pack.price.toFixed(2)}</div>
                <div className="text-green-600 text-sm mb-2">{pack.discount}</div>
                <div className="text-gray-500 text-sm mb-6">{pack.unit}</div>

                <button
                  onClick={() => setSelectedPack(pack.qty)}
                  className={`w-full py-3 rounded-full font-medium transition ${
                    active ? "bg-violet-700 text-white" : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                  }`}
                >
                  Selecionar
                </button>
              </div>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-3xl shadow-lg border border-violet-100 p-6">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>€{packs.find((p) => p.qty === selectedPack)?.price.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePay}
            className="mt-5 w-full bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-95 text-white py-4 rounded-full text-lg font-semibold shadow-lg"
          >
            {current.buy}
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-3xl font-bold text-center text-violet-800 mb-8">{current.inspiration}</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[current.occasion1, current.occasion2, current.occasion3, current.occasion4].map((item, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-md overflow-hidden border border-violet-100">
              <div className="h-40 bg-gradient-to-br from-pink-100 to-violet-100 flex items-center justify-center text-violet-700 font-semibold text-lg">
                {item}
              </div>
              <div className="p-4 text-sm text-gray-600">
                Ideia perfeita para transformar memórias especiais em presentes únicos.
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-3xl font-bold text-center text-violet-800 mb-8">{current.whyTitle}</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl shadow-md p-6 text-center">
            <div className="text-lg font-semibold text-violet-700 mb-2">{current.why1Title}</div>
            <p className="text-sm text-gray-600">{current.why1Text}</p>
          </div>
          <div className="bg-white rounded-3xl shadow-md p-6 text-center">
            <div className="text-lg font-semibold text-violet-700 mb-2">{current.why2Title}</div>
            <p className="text-sm text-gray-600">{current.why2Text}</p>
          </div>
          <div className="bg-white rounded-3xl shadow-md p-6 text-center">
            <div className="text-lg font-semibold text-violet-700 mb-2">{current.why3Title}</div>
            <p className="text-sm text-gray-600">{current.why3Text}</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-violet-800 mb-4">{current.shippingTitle}</h3>
          <p className="text-gray-600 mb-2">{current.shipping1}</p>
          <p className="text-gray-600">{current.shipping2}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10 pb-16">
        <h3 className="text-3xl font-bold text-center text-violet-800 mb-8">{current.faqTitle}</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="font-semibold">{current.faq1Q}</div>
            <div className="text-sm text-gray-600">{current.faq1A}</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="font-semibold">{current.faq2Q}</div>
            <div className="text-sm text-gray-600">{current.faq2A}</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="font-semibold">{current.faq3Q}</div>
            <div className="text-sm text-gray-600">{current.faq3A}</div>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 pb-10">
        © {new Date().getFullYear()} PhotoMagia — {current.footer}
      </footer>
    </div>
  );
}