// import addPlaceholder from './src/pdfkitAddPlaceholder';
import fs from 'fs';
import create from './pdfkitCreatePdf';

describe('createResources', () => {
    const storePath = `${__dirname}/../../resources/generated`;
    test('too-small-placehodler', async () => {
        const pdf = await create({
            placeholder: {
                signatureLength: 2,
            },
        });
        fs.createWriteStream(`${storePath}/too-small-placeholder.pdf`).end(pdf);
    });
    test('with-defaults', async () => {
        const pdf = await create();
        fs.createWriteStream(`${storePath}/with-defaults.pdf`).end(pdf);
    });
    test('with-changed-text', async () => {
        const pdf = await create({text: 'helper generated this'});
        fs.createWriteStream(`${storePath}/with-changed-text.pdf`).end(pdf);
    });
});
