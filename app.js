const fs = require('fs');
const { program } = require('commander');

program
    .requiredOption('-i, --input <path>', 'Шлях до JSON файлу')
    .option('-o, --output <path>', 'Шлях для збереження результату')
    .option('-d, --display', 'Вивести результат у консоль');

program.parse(process.argv);
const options = program.opts();

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

const jsonData = JSON.parse(fs.readFileSync(options.input, 'utf8'));
const results = jsonData.map(item => `${item.StockCode}-${item.ValCode}-${item.Attraction}`);

if (options.output) {
    fs.writeFileSync(options.output, results.join('\n'), 'utf8');
}

if (options.display) {
    console.log(results.join('\n'));
}
