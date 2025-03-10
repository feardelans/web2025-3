const fs = require('fs');
const https = require('https');

const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/ovdp?json';

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        fs.writeFileSync('data.json', data, 'utf8');
        console.log('Файл data.json успішно збережено.');
    });
}).on('error', (err) => {
    console.error('Помилка завантаження JSON:', err.message);
});
