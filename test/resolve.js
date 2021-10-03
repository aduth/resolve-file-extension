import { expect } from 'chai';
import { join } from 'path';
import { fileURLToPath, URL } from 'url';
import { getFilePath } from '../resolve.js';

/**
 * Resolves a file path from the project root directory.
 *
 * @param {string} file File path.
 *
 * @return {string} Resolved file.
 */
const resolveRoot = (file) => fileURLToPath(new URL(join('..', file), import.meta.url));

describe('getFilePath', () => {
	context('without extensions', () => {
		it('resolves to the first matching file', async () => {
			const result = await getFilePath(resolveRoot('package'));

			expect(result).to.equal(resolveRoot('package.json'));
		});

		it('resolves to undefined if no file exists', async () => {
			const result = await getFilePath(resolveRoot('missing'));

			expect(result).to.be.undefined;
		});
	});

	context('with extensions', () => {
		it('resolves to the first matching file', async () => {
			const result = await getFilePath(resolveRoot('package'), ['.yml', '.json']);

			expect(result).to.equal(resolveRoot('package.json'));
		});

		it('resolves to undefined if no file exists', async () => {
			const result = await getFilePath(resolveRoot('missing'), ['.yml', '.json']);

			expect(result).to.be.undefined;
		});
	});
});
