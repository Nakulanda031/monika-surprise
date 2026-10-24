// Usage: npm run qr -- https://your-deployed-site.example
import QRCode from 'qrcode';
const url = process.argv[2];
if (!url || !/^https:\/\//i.test(url) || /localhost|127\.0\.0\.1|192\.168\.|10\.\d|\.local/i.test(url)) {
  console.error('Give the final public HTTPS URL, e.g. npm run qr -- https://monika.netlify.app\n(localhost / http / private-network addresses are rejected.)');
  process.exit(1);
}
await QRCode.toFile('qr-code.png', url, { width: 1024, margin: 2, color: { dark: '#253451', light: '#FFFFFF' } });
await QRCode.toFile('qr-code.svg', url, { type: 'svg', margin: 2, color: { dark: '#253451', light: '#FFFFFF' } });
console.log('Created qr-code.png and qr-code.svg for', url, '\nPrint with: "Scan this… a little surprise is waiting for you. 💗"');
