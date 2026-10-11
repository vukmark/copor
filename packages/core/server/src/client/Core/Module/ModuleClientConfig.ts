import {AppContext} from '@copor/core/client/Interface/AppContext';

// Each module's `clientConfig`, keyed by module name; GET /user/preferences
// returns them as `moduleConfig`.
type ClientConfigProvider = (appContext: AppContext) => Record<string, unknown>;

const providers = new Map<string, ClientConfigProvider>();

export function registerModuleClientConfig(moduleName: string, provider: ClientConfigProvider | undefined): void {
	if (provider)
		providers.set(moduleName, provider);
}

export function getModuleClientConfig(appContext: AppContext): Record<string, Record<string, unknown>> {
	return Object.fromEntries([... providers].map(([moduleName, provider]) => [moduleName, provider(appContext)]));
}

// Tests only.
export function clearModuleClientConfig(): void {
	providers.clear();
}
