const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const fs = require('fs');
const options = {}; /* see below */

fs.readdir('C:/OSPanel/domains/camozzi.test/parsePDF/pdf', function (err, files) {
    if (err) throw err;

    for (let file of files) {
        let filename = 'C:/OSPanel/domains/camozzi.test/parsePDF/text/' + file + '.txt';
        let path = 'C:/OSPanel/domains/camozzi.test/parsePDF/pdf/' + file;
        // console.log(file);

        const buffer = fs.readFileSync(path);

        pdfExtract.extractBuffer(buffer, options, (err, data) => {
            if (err) return console.log(err);

            let text = '';
            for (let page of data.pages){
                for (let elem of page.content) {
                    text += elem.str + '\n';
                }

            }
            fs.writeFile(filename, text, (err) => {
                if (err) throw err;
            });
        });
    }
});