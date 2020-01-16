import fs from 'fs';
import path from 'path';
import plainAddPlaceholder from './index';

describe('plainAddPlaceholder', () => {
    const resources = path.join(__dirname, '/../../../resources');

    it('adds placeholder to a prepared document', () => {
        const input = fs.readFileSync(path.join(resources, 'w3dummy.pdf'));
        expect(input.indexOf('/ByteRange')).toBe(-1);
        const output = plainAddPlaceholder({pdfBuffer: input, reason: 'Because I can'});
        expect(output).toBeInstanceOf(Buffer);
        expect(output.indexOf('/ByteRange')).not.toBe(-1);
    });

    // TODO: This is quite limited testing. Need more.
});
