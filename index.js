const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Definisikan nomor yang diizinkan
const allowedNumber = '6287788014212@c.us'; // Ganti dengan nomor yang diizinkan

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [ '--no-sandbox', '--disable-gpu', ],
    },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', }
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    // Cek apakah nomor pengirim sesuai dengan nomor yang diizinkan
    if (message.from === allowedNumber) {
        if (message.body.toLowerCase() === 'ping') {
            message.reply('pong');
        }
    } else {
        console.log(`Pesan dari ${message.from} diabaikan.`);
    }
});

client.initialize();
