import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', ram: '1', coupon: '' });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const qrisUrl = '/qris.jpg';
  const danaNumber = '082324949193';

  const ramOptions = [
    { value: '1', label: '1 GB - Rp2.000' },
    { value: '2', label: '2 GB - Rp3.000' },
    { value: '3', label: '3 GB - Rp4.000' },
    { value: '4', label: '4 GB - Rp5.000' },
    { value: '5', label: '5 GB - Rp6.000' },
    { value: '6', label: '6 GB - Rp7.000' },
    { value: '7', label: '7 GB - Rp8.000' },
    { value: '8', label: '8 GB - Rp9.000' },
    { value: 'unlimited', label: 'Unlimited - Rp10.000' }
  ];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Beli Panel Pterodactyl</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nama Pembeli</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Pilih RAM</label>
            <select
              name="ram"
              value={form.ram}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {ramOptions.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Kode Kupon (Opsional)</label>
            <input
              type="text"
              name="coupon"
              value={form.coupon}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan kode kupon"
            />
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-1">Pembayaran</h2>
            <p>Transfer ke Dana: <strong>{danaNumber}</strong></p>
            <img src={qrisUrl} alt="QRIS" className="w-48 mt-2 rounded border" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700 transition"
          >
            {loading ? 'Memproses...' : 'Lanjut & Konfirmasi Pembayaran'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </main>
  );
}
