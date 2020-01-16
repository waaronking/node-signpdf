import fs from 'fs';
import PDFDocument from 'pdfkit';
import signer from './signpdf';
import {pdfkitAddPlaceholder, extractSignature} from './helpers';
import SignPdfError from './SignPdfError';
// import createPdf from '.........createPdf.js'; // FIXME


describe('Helpers', () => {
    it('extract signature from signed pdf', async () => {
        const pdfBuffer = await createPdf({
            placeholder: {
                signatureLength: 1612,
            },
        });
        const p12Buffer = fs.readFileSync(`${__dirname}/../resources/certificate.p12`);

        const signedPdfBuffer = signer.sign(pdfBuffer, p12Buffer);
        const originalSignature = signer.lastSignature;

        const {signature} = extractSignature(signedPdfBuffer);
        expect(Buffer.from(signature, 'binary').toString('hex')).toBe(originalSignature);
    });

    it('expects PDF to contain a ByteRange placeholder', () => {
        try {
            extractSignature(Buffer.from('No BR placeholder'));
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfError.TYPE_PARSE);
        }
    });

    it('expects PDF to contain a byteRangeEnd', () => {
        try {
            extractSignature(Buffer.from('/ByteRange [   No End'));
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfError.TYPE_PARSE);
        }
    });
});
