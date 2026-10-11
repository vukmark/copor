import {coreLocalesFolder} from '@copor/core/client/Resources/coreLocalesFolder';
import i18next, {i18n, TFunction} from 'i18next';
import middleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import path from 'node:path';
import {AsyncLocalStorage} from 'node:async_hooks';

export const i18nRequestContext = new AsyncLocalStorage<i18n>();

const originalT = i18next.t.bind(i18next);
const originalExists = i18next.exists.bind(i18next);
const originalSetDefaultNamespace = i18next.setDefaultNamespace.bind(i18next);

i18next.t = ((...args: Parameters<TFunction>) => {
	const scoped = i18nRequestContext.getStore();
	return scoped ? scoped.t(...args) : originalT(...args);
}) as TFunction;

i18next.exists = (...args: Parameters<typeof originalExists>) => {
	const scoped = i18nRequestContext.getStore();
	return scoped ? scoped.exists(...args) : originalExists(...args);
};

i18next.setDefaultNamespace = (ns: string) => {
	const scoped = i18nRequestContext.getStore();
	if (scoped) {
		setDefaultNamespaceSynced(scoped, ns);
		return i18next;
	}
	return originalSetDefaultNamespace(ns);
};

function setDefaultNamespaceSynced(instance: i18n, ns: string) {
	instance.setDefaultNamespace(ns);
	(instance as unknown as {translator: {options: {defaultNS: string}}}).translator.options.defaultNS = ns;
}

// Resolves once core's own namespaces (Resources/locales) are loaded; module
// translations are merged in after that (Core/Module/ModuleLocales.ts).
export const i18nReady = i18next
	.use(middleware.LanguageDetector)
	.use(Backend)
	.init({
		backend: {
			loadPath: path.join(coreLocalesFolder, '{{ns}}/{{lng}}.json')
		},
		preload: ['en', 'de'],
		fallbackLng: 'de',
		ns: ['default',
			'common',
			'country',
			'feature_flags',
			'login',
			'notification',
			'my_account',
			'registration',
			'administration',
			'language',
			'native_language',
			'region',
			'state',
			'tenant',
			'tag',
			'contract_type',
			'role',
			'user',
			'log',
			'search',
			'log_type',
			'error',
			'filter',
			'search',
			'form',
			'table',
			'info',
			'system_settings',
			'user_group',
			'permission',
			'contracts'],
		defaultNS: 'custom',
		detection: {
			order: ['header'],
			lookupHeader: 'accept-language'
		},
		debug: false

	}
	);
export default i18next;
