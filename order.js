import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'data', 'config.json');
let config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

function getPrice(ram) {
  const prices = {
    '1': 2000, '2': 3000, '3': 4000, '4': 5000,
    '5': 6000, '6': 7000, '7': 8000, '8': 9000,
    'unlimited': 10000
  };
  return prices[ram] || null;
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, ram, coupon } = req.body;
  const basePrice = getPrice(ram);
  if (!basePrice) return res.status(400).json({ error: 'Invalid RAM selected' });

  const discount = config.coupons[coupon?.toUpperCase()] || 0;
  const finalPrice = basePrice - discount;

  // Simulasi verifikasi pembayaran dummy
  const paymentVerified = false;

  if (!paymentVerified) {
    return res.status(200).json({ status: 'waiting', message: 'Menunggu pembayaran', finalPrice });
  }

  // Jika sudah bayar, kirim panel (dummy)
  res.status(200).json({
    status: 'success',
    message: 'Panel dikirim!',
    server: {
      ram,
      name,
      username: 'dummy_user',
      password: 'dummy_pass'
    }
  });
}
