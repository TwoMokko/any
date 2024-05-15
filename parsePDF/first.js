const fs = require('fs');
const pdf = require('pdf-parse');
const pdfjs = require('pdfjs')

let filename = '';
let text = '';

let path = 'C:/OSPanel/domains/camozzi.test/parsePDF/pdf/serie_615_ar.pdf'
let dataBuffer = fs.readFileSync(path);
let ar = path.split('/');
filename = ar[ar.length - 1] + '.txt';

console.log(filename);

pdf(dataBuffer).then(function(data) {
    // console.log(data.text);
    text = data.text;
    const f = 'C:/OSPanel/domains/camozzi.test/parsePDF/pdf/serie_615_ar.pdf.txt';
    fs.writeFile(f, text, (err) => {
        if (err) throw err;
    });
});

// let data = {
//     filename: filename,
//     text: text
// }