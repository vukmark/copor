import {coreLocalesFolder} from '@copor/core/client/Resources/coreLocalesFolder';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import i18next, {i18n} from 'i18next';
import {mergeModuleLocales, readModuleLocales} from '@copor/core/client/Core/Module/ModuleLocales';
import {allModules} from '../../../src/modules';

const CORE_LOCALES = coreLocalesFolder;

function writeJson(file: string, data: object): void {
	fs.mkdirSync(path.dirname(file), {recursive: true});
	fs.writeFileSync(file, JSON.stringify(data));
}

async function instanceWith(resources: Record<string, Record<string, object>>): Promise<i18n> {
	const instance = i18next.createInstance();

	await instance.init({resources, lng: 'en', fallbackLng: false, initImmediate: false});
	return instance;
}

describe('ModuleLocales', () => {
	let folder: string;

	beforeEach(() => {
		folder = fs.mkdtempSync(path.join(os.tmpdir(), 'module-locales-'));
	});

	afterEach(() => fs.rmSync(folder, {recursive: true, force: true}));

	it('reads every <namespace>/<language>.json of a module', () => {
		writeJson(path.join(folder, 'sample', 'en.json'), {translationStringList: {HELLO: 'Hello'}});
		writeJson(path.join(folder, 'sample', 'de.json'), {translationStringList: {HELLO: 'Hallo'}});
		writeJson(path.join(folder, 'common', 'en.json'), {translationStringList: {EXTRA: 'Extra'}});

		const bundles = readModuleLocales([{name: 'sample', localesFolder: folder}, {name: 'without'}]);

		expect(bundles).toHaveLength(3);
		expect(bundles).toContainEqual({
			module: 'sample', language: 'de', namespace: 'sample', resources: {translationStringList: {HELLO: 'Hallo'}}
		});
	});

	it('adds a module namespace and merges keys into a shared one, keeping core\'s', async () => {
		const instance = await instanceWith({en: {common: {translationStringList: {SAVE: 'Save'}}}});

		mergeModuleLocales(instance, [
			{module: 'sample', language: 'en', namespace: 'common', resources: {translationStringList: {CALL: 'Call'}}},
			{module: 'sample', language: 'en', namespace: 'sample', resources: {translationStringList: {HELLO: 'Hello'}}}
		]);

		expect(instance.getResourceBundle('en', 'common')).toEqual({translationStringList: {SAVE: 'Save', CALL: 'Call'}});
		expect(instance.getResource('en', 'sample', 'translationStringList.HELLO')).toBe('Hello');
	});

	it('refuses a key core already defines', async () => {
		const instance = await instanceWith({en: {common: {translationStringList: {SAVE: 'Save'}}}});

		expect(() => mergeModuleLocales(instance, [
			{module: 'sample', language: 'en', namespace: 'common', resources: {translationStringList: {SAVE: 'Store'}}}
		])).toThrow('Module "sample" defines translation common:translationStringList.SAVE (en), which already exists');
	});

	it('refuses a key another module already merged', async () => {
		const instance = await instanceWith({en: {}});
		const bundle = {language: 'en', namespace: 'error', resources: {SomeException: 'Oops'}};

		expect(() => mergeModuleLocales(instance, [{module: 'first', ...bundle}, {module: 'second', ...bundle}]))
			.toThrow('Module "second" defines translation error:SomeException (en)');
	});

	it('merges every module\'s real translations into core\'s without a duplicate', async () => {
		const resources: Record<string, Record<string, object>> = {en: {}, de: {}};

		for (const namespace of fs.readdirSync(CORE_LOCALES)) {
			for (const language of ['en', 'de']) {
				const file = path.join(CORE_LOCALES, namespace, `${language}.json`);

				if (fs.existsSync(file))
					resources[language][namespace] = JSON.parse(fs.readFileSync(file, 'utf-8')) as object;
			}
		}
		const instance = await instanceWith(resources);

		expect(() => mergeModuleLocales(instance, readModuleLocales(allModules))).not.toThrow();
		expect(instance.getResource('en', 'vu_meet', 'translationStringList')).toBeDefined();
		expect(instance.getResource('de', 'common', 'translationStringList.CALLING')).toBeDefined();
		expect(instance.getResource('en', 'error', 'InvalidToDoException')).toBeDefined();
		expect(instance.getResource('en', 'permission', 'translationStringList.vu_meet')).toBeDefined();
		expect(instance.getResource('en', 'permission', 'translationStringList.core')).toBeDefined();
	});
});
