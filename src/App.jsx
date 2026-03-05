import { useMemo, useState } from "react";

const PACKS = [
  { id: "p5", qty: 5, unit: 3.0, discountLabel: "" },
  { id: "p10", qty: 10, unit: 2.8, discountLabel: "(-7%)" },
  { id: "p20", qty: 20, unit: 2.5, discountLabel: "(-17%)" },
  { id: "p50", qty: 50, unit: 2.2, discountLabel: "(-27%)" },
];

const i18n = {
  pt: {
    title: "PhotoMagia",
    subtitle: "Transforma as tuas fotos em ímanes mágicos ✨",
    email: "Email (para recibo)",
    pickPack: "Escolhe o pack",
    upload: "Carregar fotos",
    uploadHint: (n) => `Podes carregar até ${n} fotos (uma por íman).`,
    missing: (a, b) => `Faltam ${b - a} fotos para completar este pack.`,
    cart: "Carrinho",
    addToCart: "Adicionar ao carrinho",
    remove: "Remover",
    total: "Total",
    pay: "Pagar",
    inspiration: "Inspiração",
    how: "Como funciona",
    how1: "1) Escolhe o pack",
    how2: "2) Carrega as fotos",
    how3: "3) Paga e nós produzimos + enviamos",
  },
  en: {
    title: "PhotoMagia",
    subtitle: "Turn your photos into magical magnets ✨",
    email: "Email (receipt)",
    pickPack: "Choose a pack",
    upload: "Upload photos",
    uploadHint: (n) => `Upload up to ${n} photos (one per magnet).`,
    missing: (a, b) => `Missing ${b - a} photos to complete this pack.`,
    cart: "Cart",
    addToCart: "Add to cart",
    remove: "Remove",
    total: "Total",
    pay: "Pay",
    inspiration: "Inspiration",
    how: "How it works",
    how1: "1) Choose a pack",
    how2: "2) Upload photos",
    how3: "3) Pay — we produce & ship",
  },
  fr: {
    title: "PhotoMagia",
    subtitle: "Transformez vos photos en aimants magiques ✨",
    email: "Email (reçu)",
    pickPack: "Choisir un pack",
    upload: "Télécharger des photos",
    uploadHint: (n) => `Jusqu’à ${n} photos (une par aimant).`,
    missing: (a, b) => `Il manque ${b - a} photos pour compléter ce pack.`,
    cart: "Panier",
    addToCart: "Ajouter au panier",
    remove: "Retirer",
    total: "Total",
    pay: "Payer",
    inspiration: "Inspiration",
    how: "Comment ça marche",
    how1: "1) Choisir le pack",
    how2: "2) Télécharger les photos",
    how3: "3) Payer — on fabrique & on envoie",
  },
};

async function uploadToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !preset) {
    throw new Error("Faltam variáveis VITE_CLOUDINARY_CLOUD_NAME / VITE_CLOUDINARY_UPLOAD_PRESET");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);

  const resp = await fetch(url, { method: "POST", body: form });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data?.error?.message || "Upload falhou");
  return data.secure_url;
}

export default function App() {
  const [lang, setLang] = useState("pt");
  const t = i18n[lang];

  const [email, setEmail] = useState("");
  const [selectedPack, setSelectedPack] = useState(PACKS[1]); // default 10
  const [files, setFiles] = useState([]); // File[]
  const [uploading, setUploading] = useState(false);

  const [cart, setCart] = useState([]); // [{ pack, photos: [url] }]

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  const missingCount = Math.max(0, selectedPack.qty - files.length);

  const onPickFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    const sliced = picked.slice(0, selectedPack.qty);
    setFiles(sliced);
  };

  const clearUploads = () => setFiles([]);

  const addToCart = async () => {
    if (files.length === 0) return alert("Carrega pelo menos 1 foto.");
    if (files.length > selectedPack.qty) return alert("Tens fotos a mais para este pack.");

    setUploading(true);
    try {
      // Upload todas as fotos para Cloudinary
      const urls = [];
      for (const f of files) {
        // eslint-disable-next-line no-await-in-loop
        const u = await uploadToCloudinary(f);
        urls.push(u);
      }

      setCart((c) => [...c, { pack: selectedPack, photos: urls }]);
      clearUploads();
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  };

  const removeItem = (idx) => setCart((c) => c.filter((_, i) => i !== idx));

  const total = useMemo(
    () => cart.reduce((sum, it) => sum + it.pack.qty * it.pack.unit, 0),
    [cart]
  );

  const checkout = async () => {
    if (cart.length === 0) return alert("O carrinho está vazio.");

    const successUrl = `${window.location.origin}/?success=1`;
    const cancelUrl = `${window.location.origin}/?canceled=1`;

    const payload = {
      customerEmail: email || undefined,
      successUrl,
      cancelUrl,
      items: cart.map((it) => ({
        qtyPack: it.pack.qty,
        unitPrice: it.pack.unit,
        photos: it.photos,
      })),
    };

    const resp = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    if (!resp.ok) return alert(data?.error || "Erro ao iniciar checkout");
    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 text-gray-800">
      {/* Top bar */}
      <div className="flex justify-between items-center p-6">
        <div>
          <div className="text-3xl font-bold text-pink-700">{t.title}</div>
          <div className="text-sm text-purple-700/80">{t.subtitle}</div>
        </div>
        <div className="space-x-2">
          <button onClick={() => setLang("pt")} className="px-3 py-1 bg-white/80 rounded">PT</button>
          <button onClick={() => setLang("en")} className="px-3 py-1 bg-white/80 rounded">EN</button>
          <button onClick={() => setLang("fr")} className="px-3 py-1 bg-white/80 rounded">FR</button>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white/70 rounded-3xl p-6 shadow">
          <div className="font-semibold text-purple-800 mb-3">{t.how}</div>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="bg-white rounded-2xl p-4 shadow-sm">{t.how1}</div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">{t.how2}</div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">{t.how3}</div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-6">
        {/* Left: build order */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="font-semibold text-xl mb-4 text-purple-800">{t.pickPack}</div>

          <div className="flex flex-wrap gap-2 mb-6">
            {PACKS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPack(p);
                  setFiles([]); // para não ficar com fotos a mais quando muda pack
                }}
                className={[
                  "px-4 py-2 rounded-full border transition",
                  selectedPack.id === p.id
                    ? "bg-purple-700 text-white border-purple-700"
                    : "bg-white hover:bg-purple-50 border-purple-200",
                ].join(" ")}
              >
                {p.qty} — €{(p.qty * p.unit).toFixed(2)}{" "}
                <span className="text-xs opacity-80">{p.discountLabel}</span>
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-700 block mb-2">{t.email}</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-purple-200 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="email@exemplo.com"
            />
          </div>

          <div className="font-semibold mb-2 text-purple-800">{t.upload}</div>
          <div className="text-sm text-gray-600 mb-3">{t.uploadHint(selectedPack.qty)}</div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onPickFiles}
            className="block w-full text-sm"
          />

          {files.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  {files.length}/{selectedPack.qty} fotos
                  {missingCount > 0 && (
                    <span className="ml-2 text-pink-700 font-medium">
                      {t.missing(files.length, selectedPack.qty)}
                    </span>
                  )}
                </div>
                <button onClick={clearUploads} className="text-sm text-purple-700 underline">
                  limpar
                </button>
              </div>

              {/* Preview grid (square magnets) */}
              <div className="grid grid-cols-5 gap-2 mt-3">
                {previews.map((src, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-purple-200 bg-white shadow-sm">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            disabled={uploading}
            onClick={addToCart}
            className={[
              "mt-6 w-full py-3 rounded-2xl text-white font-semibold shadow-lg",
              uploading ? "bg-gray-400" : "bg-pink-600 hover:bg-pink-700",
            ].join(" ")}
          >
            {uploading ? "A enviar fotos..." : t.addToCart}
          </button>

          <div className="text-xs text-gray-500 mt-3">
            Dica: cada foto corresponde a 1 íman. Para packs grandes, podes carregar várias fotos.
          </div>
        </div>

        {/* Right: cart */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="font-semibold text-xl mb-4 text-purple-800">{t.cart}</div>

          {cart.length === 0 ? (
            <div className="text-gray-600">Ainda não adicionaste nada ao carrinho.</div>
          ) : (
            <div className="space-y-4">
              {cart.map((it, idx) => (
                <div key={idx} className="border border-purple-200 rounded-2xl p-4">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <div className="font-semibold text-purple-800">
                        Pack {it.pack.qty} — €{(it.pack.qty * it.pack.unit).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">{it.photos.length} fotos carregadas</div>
                    </div>
                    <button onClick={() => removeItem(idx)} className="text-sm text-pink-700 underline">
                      {t.remove}
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-2 mt-3">
                    {it.photos.slice(0, 12).map((u, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden border border-purple-200 bg-white">
                        <img src={u} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-purple-200">
                <span>{t.total}</span>
                <span>€{total.toFixed(2)}</span>
              </div>

              <button
                onClick={checkout}
                className="mt-2 w-full py-3 rounded-2xl text-white font-semibold shadow-lg bg-purple-700 hover:bg-purple-800"
              >
                {t.pay}
              </button>

              <div className="text-xs text-gray-500">
                No checkout vais escolher o envio (Portugal/Europa) e inserir a morada.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inspiration */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="bg-white/70 rounded-3xl p-6 shadow">
          <div className="font-semibold text-purple-800 mb-4">{t.inspiration}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["/inspiration/1.jpg", "/inspiration/2.jpg", "/inspiration/3.jpg", "/inspiration/4.jpg"].map((src) => (
              <div key={src} className="rounded-2xl overflow-hidden bg-white border border-purple-200">
                <img src={src} alt="" className="w-full h-36 object-cover" />
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-3">
            Coloca estas imagens na pasta <b>public/inspiration</b> com os nomes 1.jpg, 2.jpg, 3.jpg, 4.jpg.
          </div>
        </div>
      </div>

      <div className="text-center py-8 text-sm text-gray-700/80">
        © {new Date().getFullYear()} PhotoMagia — Ímanes 5×5cm — Base 3€ cada (packs com desconto)
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";

function App() {
  const [language, setLanguage] = useState("pt");
  const [selectedPack, setSelectedPack] = useState({ qty: 10, unit: 2.8, label: "10 Ímanes" });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const content = {
    pt: {
      title: "PhotoMagia",
      subtitle: "Transforma as tuas fotos em ímanes mágicos ✨",
      email: "Email (para recibo)",
      packages: "Pacotes Disponíveis",
      pay: "Pagar",
    },
    en: {
      title: "PhotoMagia",
      subtitle: "Turn your photos into magical magnets ✨",
      email: "Email (receipt)",
      packages: "Available Packages",
      pay: "Pay",
    },
    fr: {
      title: "PhotoMagia",
      subtitle: "Transformez vos photos en aimants magiques ✨",
      email: "Email (reçu)",
      packages: "Forfaits disponibles",
      pay: "Payer",
    },
  };

  const packs = [
    { qty: 5, unit: 3.0, label: "5 Ímanes", discount: "Sem desconto" },
    { qty: 10, unit: 2.8, label: "10 Ímanes", discount: "-7%" },
    { qty: 20, unit: 2.5, label: "20 Ímanes", discount: "-17%" },
    { qty: 50, unit: 2.2, label: "50 Ímanes", discount: "-27%" },
  ];

  const total = useMemo(() => selectedPack.qty * selectedPack.unit, [selectedPack]);

  const handlePay = async () => {
    setLoading(true);
    try {
      const successUrl = `${window.location.origin}/?success=1`;
      const cancelUrl = `${window.location.origin}/?canceled=1`;

      // Enviamos UM item (um pack) para o backend Stripe
      const payload = {
        customerEmail: email || undefined,
        successUrl,
        cancelUrl,
        items: [
          {
            qtyPack: selectedPack.qty,
            unitPrice: selectedPack.unit,
            photos: [], // depois ligamos Cloudinary e colocamos links aqui
          },
        ],
      };

      const resp = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();
      if (!resp.ok) {
        alert(data?.error || "Erro ao iniciar checkout");
        return;
      }

      window.location.href = data.url; // abre Stripe Checkout
    } catch (e) {
      alert(e?.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="text-center py-12 px-4">
        <h2 className="text-5xl font-bold mb-4 text-purple-700">
          {content[language].title}
        </h2>
        <p className="text-xl mb-8">{content[language].subtitle}</p>

        <div className="max-w-md mx-auto bg-white/80 rounded-2xl p-4 shadow">
          <label className="block text-left text-sm mb-2 text-gray-700">
            {content[language].email}
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@exemplo.com"
            className="w-full px-4 py-2 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>

      {/* Packages */}
      <div className="py-12 px-6 bg-white rounded-t-3xl shadow-xl">
        <h3 className="text-3xl font-bold text-center mb-10">
          {content[language].packages}
        </h3>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {packs.map((pack) => {
            const isSelected = pack.qty === selectedPack.qty;
            return (
              <button
                key={pack.qty}
                onClick={() => setSelectedPack(pack)}
                className={[
                  "text-left bg-gradient-to-br from-pink-50 to-purple-100 p-6 rounded-2xl shadow-md transition border",
                  isSelected ? "border-purple-600 ring-2 ring-purple-300" : "border-transparent hover:border-purple-200",
                ].join(" ")}
              >
                <h4 className="text-2xl font-bold mb-2">{pack.label}</h4>
                <p className="text-lg mb-2">€{(pack.qty * pack.unit).toFixed(2)}</p>
                <p className="text-sm text-green-700 mb-4">{pack.discount}</p>
                <div className="text-xs text-gray-600">
                  {pack.unit.toFixed(2)}€ / íman
                </div>
              </button>
            );
          })}
        </div>

        {/* Checkout box */}
        <div className="max-w-2xl mx-auto mt-10 bg-purple-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className={[
              "mt-4 w-full text-white px-6 py-3 rounded-full text-lg shadow-lg",
              loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700",
            ].join(" ")}
          >
            {loading ? "A abrir pagamento..." : content[language].pay}
          </button>

          <p className="text-xs text-gray-600 mt-3">
            No Stripe vais inserir a morada e escolher envio (Portugal/Europa).
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-sm text-gray-600">
        © {new Date().getFullYear()} PhotoMagia – Ímanes personalizados 5x5cm – 3€ cada (packs com desconto)
      </div>
    </div>
  );
}

export default App;