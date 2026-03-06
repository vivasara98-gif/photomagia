import { useMemo, useState } from "react";

export default function App() {
  const [language, setLanguage] = useState("pt");
  const [selectedPack, setSelectedPack] = useState(10);
  const [files, setFiles] = useState([]);

  const stripeLink = "https://buy.stripe.com/test_aFa7sMgcIbdsceM7XB0Fi00";

  const content = {
    pt: {
      brand: "PhotoMagia",
      title: "Guarda os teus momentos mais especiais em ímanes cheios de encanto",
      subtitle:
        "Delicados, personalizados e perfeitos para oferecer ou guardar como recordação.",
      upload: "Carregar fotos",
      preview: "Pré-visualização",
      choosePack: "Escolhe o teu pack",
      buy: "Comprar agora",
      popular: "Mais escolhido",
      inspiration: "Perfeito para momentos especiais",
      occasion1: "Casamentos",
      occasion2: "Bebés",
      occasion3: "Viagens",
      occasion4: "Aniversários",
      whyTitle: "Porque escolher PhotoMagia",
      why1Title: "Elegante e delicado",
      why1Text:
        "Um presente bonito e intemporal para transformar fotos em recordações especiais.",
      why2Title: "Feito com carinho",
      why2Text:
        "Cada íman é pensado para ficar bonito, harmonioso e cheio de significado.",
      why3Title: "Ideal para oferecer",
      why3Text:
        "Perfeito para surpreender alguém com um presente pessoal e memorável.",
      shippingTitle: "Envio",
      shipping1: "Portugal — envio disponível",
      shipping2: "Europa — envio disponível",
      footer: "Ímanes personalizados 5x5cm",
      selectPackFirst: "Escolhe primeiro o pack ideal.",
      uploadHint: "Cada foto corresponde a 1 íman.",
      selectedPhotos: "Fotos selecionadas",
      missingPhotos: "Faltam",
      exactPhotos: "Perfeito! Já tens o número certo de fotos para este pack.",
      tooManyPhotos: "Selecionaste fotos a mais para este pack.",
      needMorePhotos: "Seleciona o número total de fotos correspondente ao pack escolhido.",
      packReady: "Pack pronto para comprar",
      photosWord: "fotos",
      clearPhotos: "Limpar fotos",
    },
    en: {
      brand: "PhotoMagia",
      title: "Keep your most special moments in charming photo magnets",
      subtitle:
        "Delicate, personalized and perfect to gift or keep as a beautiful memory.",
      upload: "Upload photos",
      preview: "Preview",
      choosePack: "Choose your pack",
      buy: "Buy now",
      popular: "Most chosen",
      inspiration: "Perfect for special moments",
      occasion1: "Weddings",
      occasion2: "Babies",
      occasion3: "Travel",
      occasion4: "Birthdays",
      whyTitle: "Why choose PhotoMagia",
      why1Title: "Elegant and delicate",
      why1Text:
        "A beautiful and timeless gift to turn photos into special keepsakes.",
      why2Title: "Made with care",
      why2Text:
        "Each magnet is crafted to feel beautiful, balanced and meaningful.",
      why3Title: "Perfect to gift",
      why3Text:
        "A lovely way to surprise someone with a personal and memorable present.",
      shippingTitle: "Shipping",
      shipping1: "Portugal — shipping available",
      shipping2: "Europe — shipping available",
      footer: "Custom 5x5cm magnets",
      selectPackFirst: "Choose your ideal pack first.",
      uploadHint: "Each photo corresponds to 1 magnet.",
      selectedPhotos: "Selected photos",
      missingPhotos: "Missing",
      exactPhotos: "Perfect! You already have the right number of photos for this pack.",
      tooManyPhotos: "You selected too many photos for this pack.",
      needMorePhotos: "Select the total number of photos that matches the chosen pack.",
      packReady: "Pack ready to buy",
      photosWord: "photos",
      clearPhotos: "Clear photos",
    },
    fr: {
      brand: "PhotoMagia",
      title: "Gardez vos plus beaux moments dans des aimants pleins de charme",
      subtitle:
        "Délicats, personnalisés et parfaits à offrir ou à garder comme souvenir.",
      upload: "Télécharger des photos",
      preview: "Aperçu",
      choosePack: "Choisissez votre pack",
      buy: "Acheter maintenant",
      popular: "Le plus choisi",
      inspiration: "Parfait pour les moments spéciaux",
      occasion1: "Mariages",
      occasion2: "Bébés",
      occasion3: "Voyages",
      occasion4: "Anniversaires",
      whyTitle: "Pourquoi choisir PhotoMagia",
      why1Title: "Élégant et délicat",
      why1Text:
        "Un cadeau beau et intemporel pour transformer des photos en souvenirs précieux.",
      why2Title: "Réalisé avec soin",
      why2Text:
        "Chaque aimant est pensé pour être harmonieux, beau et plein de sens.",
      why3Title: "Parfait à offrir",
      why3Text:
        "Une jolie façon de surprendre quelqu’un avec un cadeau personnel et mémorable.",
      shippingTitle: "Livraison",
      shipping1: "Portugal — livraison disponible",
      shipping2: "Europe — livraison disponible",
      footer: "Aimants personnalisés 5x5cm",
      selectPackFirst: "Choisissez d'abord le pack idéal.",
      uploadHint: "Chaque photo correspond à 1 aimant.",
      selectedPhotos: "Photos sélectionnées",
      missingPhotos: "Il manque",
      exactPhotos: "Parfait ! Vous avez déjà le bon nombre de photos pour ce pack.",
      tooManyPhotos: "Vous avez sélectionné trop de photos pour ce pack.",
      needMorePhotos: "Sélectionnez le nombre total de photos correspondant au pack choisi.",
      packReady: "Pack prêt à acheter",
      photosWord: "photos",
      clearPhotos: "Effacer les photos",
    },
  };

  const packs = [
    { qty: 5, price: 15, unit: "3.00€ / íman", discount: "Sem desconto", featured: false },
    { qty: 10, price: 28, unit: "2.80€ / íman", discount: "-7%", featured: true },
    { qty: 20, price: 50, unit: "2.50€ / íman", discount: "-17%", featured: false },
    { qty: 50, price: 110, unit: "2.20€ / íman", discount: "-27%", featured: false },
  ];

  const current = content[language];
  const selectedPrice = packs.find((p) => p.qty === selectedPack)?.price ?? 28;
  const selectedCount = files.length;
  const missingCount = Math.max(selectedPack - selectedCount, 0);
  const tooMany = selectedCount > selectedPack;
  const exactMatch = selectedCount === selectedPack;
  const canBuy = exactMatch;

  const previewUrls = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  const handlePay = () => {
    if (!canBuy) return;
    window.location.href = stripeLink;
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected);
  };

  const clearPhotos = () => setFiles([]);

  return (
    <div className="min-h-screen bg-[#faf7f6] text-[#564844]">
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="PhotoMagia" className="h-20 object-contain" />
        </div>

        <div className="space-x-2">
          <button
            onClick={() => setLanguage("pt")}
            className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm text-[#7d6a64] border border-[#f1dfd8]"
          >
            PT
          </button>
          <button
            onClick={() => setLanguage("en")}
            className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm text-[#7d6a64] border border-[#f1dfd8]"
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("fr")}
            className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm text-[#7d6a64] border border-[#f1dfd8]"
          >
            FR
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-4 py-2 rounded-full bg-white shadow-sm text-sm text-[#c9a34d] mb-5 border border-[#f0e4ca]">
            Photo magnets • 5×5 cm
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#564844] max-w-xl">
            {current.title}
          </h1>

          <p className="mt-5 text-lg text-[#7d6a64] max-w-xl leading-relaxed">
            {current.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[current.occasion1, current.occasion2, current.occasion3, current.occasion4].map(
              (item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-white rounded-full shadow-sm text-sm text-[#7d6a64] border border-[#f1dfd8]"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-[#f1dfd8] p-6 md:p-8">
          <h2 className="text-xl font-semibold text-[#d98c82] mb-4">{current.upload}</h2>
          <p className="text-sm text-[#8f7c76]">{current.selectPackFirst}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold text-center text-[#564844] mb-10">
          {current.choosePack}
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {packs.map((pack) => {
            const active = selectedPack === pack.qty;

            return (
              <div
                key={pack.qty}
                className={`relative rounded-[2rem] p-6 border transition bg-white shadow-sm ${
                  active ? "border-[#d98c82] ring-2 ring-[#efd2cc]" : "border-[#f1dfd8]"
                } ${pack.featured ? "shadow-xl md:-mt-3" : ""}`}
              >
                {pack.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d98c82] text-white text-xs font-medium px-4 py-1.5 rounded-full shadow">
                    {current.popular}
                  </div>
                )}

                <div className="text-2xl font-semibold text-[#564844] mb-2">
                  {pack.qty} Ímanes
                </div>
                <div className="text-3xl font-semibold mb-2">€{pack.price.toFixed(2)}</div>
                <div className="text-emerald-600 text-sm mb-2">{pack.discount}</div>
                <div className="text-[#8f7c76] text-sm mb-6">{pack.unit}</div>

                <button
                  onClick={() => {
                    setSelectedPack(pack.qty);
                    setFiles([]);
                  }}
                  className={`w-full py-3 rounded-full transition font-medium ${
                    active
                      ? "bg-[#d98c82] text-white"
                      : "bg-[#fcf2ef] text-[#d98c82] hover:bg-[#f9e8e3]"
                  }`}
                >
                  Selecionar
                </button>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto mt-8 bg-white rounded-[2rem] shadow-lg border border-[#f1dfd8] p-6">
          <h3 className="text-xl font-semibold text-[#d98c82] mb-4">{current.upload}</h3>

          <label className="flex items-center justify-center w-full min-h-[150px] border-2 border-dashed border-[#e9c9c2] rounded-[1.5rem] cursor-pointer bg-[#fcf2ef] hover:bg-[#faece8] transition">
            <div className="text-center px-4">
              <div className="text-base font-medium text-[#d98c82]">{current.upload}</div>
              <div className="text-sm text-[#8f7c76] mt-1">JPG, PNG, HEIC</div>
              <div className="text-sm text-[#8f7c76] mt-2">
                {current.uploadHint}
              </div>
            </div>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
          </label>

          <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="text-sm text-[#7d6a64]">
              <span className="font-medium">{current.selectedPhotos}:</span> {selectedCount}/{selectedPack}
            </div>
            {selectedCount > 0 && (
              <button
                onClick={clearPhotos}
                className="text-sm text-[#d98c82] underline underline-offset-2"
              >
                {current.clearPhotos}
              </button>
            )}
          </div>

          {!selectedCount ? null : tooMany ? (
            <div className="mt-4 rounded-2xl bg-[#fff3ef] border border-[#f3d3cb] px-4 py-3 text-sm text-[#b26d60]">
              {current.tooManyPhotos}
            </div>
          ) : exactMatch ? (
            <div className="mt-4 rounded-2xl bg-[#f2fbf5] border border-[#cfead7] px-4 py-3 text-sm text-[#4f8b63]">
              {current.exactPhotos}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl bg-[#fff8ef] border border-[#f3e0bf] px-4 py-3 text-sm text-[#a57b3d]">
              {current.missingPhotos} {missingCount} {current.photosWord}. {current.needMorePhotos}
            </div>
          )}

          {previewUrls.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-[#8f7c76] mb-3">{current.preview}</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {previewUrls.map((src, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-[1.2rem] overflow-hidden border border-[#e9c9c2] shadow bg-white"
                  >
                    <img src={src} alt={`preview-${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-[2rem] shadow-lg border border-[#f1dfd8] p-6">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>€{selectedPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePay}
            disabled={!canBuy}
            className={`mt-5 w-full py-4 rounded-full text-lg font-medium shadow-lg transition ${
              canBuy
                ? "bg-gradient-to-r from-[#d98c82] to-[#c9a34d] hover:opacity-95 text-white"
                : "bg-[#eadfdb] text-[#9f8f89] cursor-not-allowed"
            }`}
          >
            {canBuy ? current.buy : current.packReady}
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-3xl font-semibold text-center text-[#564844] mb-8">
          {current.inspiration}
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[current.occasion1, current.occasion2, current.occasion3, current.occasion4].map(
            (item) => (
              <div
                key={item}
                className="bg-white rounded-[2rem] shadow-md overflow-hidden border border-[#f1dfd8]"
              >
                <div className="h-40 bg-gradient-to-br from-[#f7e6e3] to-[#f7f0df] flex items-center justify-center text-[#d98c82] font-medium text-lg">
                  {item}
                </div>
                <div className="p-4 text-sm text-[#7d6a64]">
                  Um detalhe delicado para guardar um momento especial.
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-3xl font-semibold text-center text-[#564844] mb-8">
          {current.whyTitle}
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[2rem] shadow-md p-6 text-center border border-[#f1dfd8]">
            <div className="text-lg font-semibold text-[#d98c82] mb-2">{current.why1Title}</div>
            <p className="text-sm text-[#7d6a64]">{current.why1Text}</p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-md p-6 text-center border border-[#f1dfd8]">
            <div className="text-lg font-semibold text-[#d98c82] mb-2">{current.why2Title}</div>
            <p className="text-sm text-[#7d6a64]">{current.why2Text}</p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-md p-6 text-center border border-[#f1dfd8]">
            <div className="text-lg font-semibold text-[#d98c82] mb-2">{current.why3Title}</div>
            <p className="text-sm text-[#7d6a64]">{current.why3Text}</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10 pb-16">
        <div className="bg-white rounded-[2rem] shadow-lg p-8 text-center border border-[#f1dfd8]">
          <h3 className="text-2xl font-semibold text-[#564844] mb-4">{current.shippingTitle}</h3>
          <p className="text-[#7d6a64] mb-2">{current.shipping1}</p>
          <p className="text-[#7d6a64]">{current.shipping2}</p>
        </div>
      </section>

      <footer className="text-center text-sm text-[#8f7c76] pb-10">
        © {new Date().getFullYear()} PhotoMagia — {current.footer}
      </footer>
    </div>
  );
}
