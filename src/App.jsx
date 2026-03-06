import { useMemo, useState } from "react";

export default function App() {
  const [language, setLanguage] = useState("pt");
  const [selectedPack, setSelectedPack] = useState({ qty: 10, unit: 2.8, label: "10 Ímanes", discount: "-7%" });
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

  const handlePay = () => {
  window.location.href = "https://buy.stripe.com/test_aFa7sMgcIbdsceM7XB0Fi00";
};
    setLoading(true);
    try {
      const successUrl = `${window.location.origin}/?success=1`;
      const cancelUrl = `${window.location.origin}/?canceled=1`;

      const payload = {
        customerEmail: email || undefined,
        successUrl,
        cancelUrl,
        items: [
          {
            qtyPack: selectedPack.qty,
            unitPrice: selectedPack.unit,
            photos: [],
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

      window.location.href = data.url;
    } catch (e) {
      alert(e?.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 text-gray-800">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-pink-600">PhotoMagia</h1>
        <div className="space-x-2">
          <button onClick={() => setLanguage("pt")} className="px-3 py-1 bg-white rounded">PT</button>
          <button onClick={() => setLanguage("en")} className="px-3 py-1 bg-white rounded">EN</button>
          <button onClick={() => setLanguage("fr")} className="px-3 py-1 bg-white rounded">FR</button>
        </div>
      </div>

      <div className="text-center py-12 px-4">
        <h2 className="text-5xl font-bold mb-4 text-purple-700">{content[language].title}</h2>
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

      <div className="py-12 px-6 bg-white rounded-t-3xl shadow-xl">
        <h3 className="text-3xl font-bold text-center mb-10">{content[language].packages}</h3>

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
                <div className="text-xs text-gray-600">{pack.unit.toFixed(2)}€ / íman</div>
              </button>
            );
          })}
        </div>

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
            No checkout vais inserir a morada e escolher envio (Portugal/Europa).
          </p>
        </div>
      </div>

      <div className="text-center py-8 text-sm text-gray-600">
        © {new Date().getFullYear()} PhotoMagia – Ímanes personalizados 5x5cm – 3€ cada (packs com desconto)
      </div>
    </div>
  );
}