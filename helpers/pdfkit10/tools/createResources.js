import fs from 'fs';
import path from 'path';
import create from './createPdf';

const storePath = path.join(__dirname, '/../../../resources/generated');

async function createResources() {
    let pdf = await create({
        placeholder: {
            signatureLength: 2,
        },
    });
    let stream = fs.createWriteStream(path.join(storePath, 'too-small-placeholder.pdf'));
    await new Promise(r => stream.end(pdf, r));
    console.info('too-small-placeholder');

    pdf = await create();
    stream = fs.createWriteStream(path.join(storePath, 'with-defaults.pdf'));
    await new Promise(r => stream.end(pdf, r));
    console.info('with-defaults');

    pdf = await create({text: 'helper generated this'});
    stream = fs.createWriteStream(path.join(storePath, 'with-changed-text.pdf'));
    await new Promise(r => stream.end(pdf, r));
    console.info('with-changed-text');
}

createResources();
// .then(() => process.exit(0))
// .catch((e) => {
//     console.error(e);
//     process.exit(1);
// });
