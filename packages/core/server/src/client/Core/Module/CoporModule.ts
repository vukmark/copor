import {RouterConstructor} from '@copor/core/client/Interface/RouterInstance';
import {Container} from '@copor/core/client/Interface/Container';
import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {ModuleEventSubscribers} from '@copor/core/client/Core/Module/ModuleEvents';
import {ModuleFilterLists} from '@copor/core/client/Core/Module/ModuleFilterLists';
import {ModulePreferenceDefinitionDTO} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceDefinitionDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export interface ModuleRoute {
	path: string,
	router: RouterConstructor<Container>,
}

// An optional feature the app can include or leave out. Core never imports a
// module by name; it only loops over the modules the app lists in its
// `src/modules.ts` (and its own `coreModules.ts`).
export interface CoporModule {
	name: string,
	dependsOn?: string[],
	routes?: ModuleRoute[],
	// Absolute path to the module's Kysely migrations. They run after core's,
	// tracked in their own `kysely_migration_<name>` table, and may reference
	// core tables only, never another module's.
	migrationsFolder?: string,
	// Keys must start with `<name>.`; a permission may depend on core's or on
	// those of a module listed in dependsOn.
	permissions?: PermissionDefinitionDTO[],
	// Features (frontend routes) the module unlocks, with their view permission
	// and optional side-menu / administration-dashboard entry.
	features?: FeatureDefinitionDTO[],
	// Reactions to events core announces (see ModuleEvents.ts), e.g. removing
	// the module's own rows that reference a deleted core record.
	eventSubscribers?: ModuleEventSubscribers,
	// Filter lists served at `GET /filter/:page`, keyed by page. A page must not
	// be a core FilterablePages value or another module's page.
	filterLists?: ModuleFilterLists,
	// Runs once at startup, after the WebSocket server is up (e.g. VuMeet's
	// stale-call sweep).
	onServerStart?: () => void,
	// Unread counts this module adds to GET /notification/count (bell and
	// nav badges), keyed like `vuMeet`.
	notificationCounters?: (userId: string) => Promise<Record<string, number>>,
	// Absolute path to the module's translations, laid out like core's
	// `Resources/locales`: `<namespace>/<language>.json`. Merged into the same
	// namespaces at startup (ModuleLocales.ts): a module's own namespace (e.g.
	// `vu_meet`) or its keys in a shared one (`common`, `error`, `log_type`, …).
	// A key that core or another module already defines stops startup.
	localesFolder?: string,
	// Per-user on/off settings (keys `<name>.`), stored by core in
	// `user_module_preference` and returned with the user's preferences
	// (`modulePreferences`). Check one with KyselyModulePreferencesHelper.
	preferences?: ModulePreferenceDefinitionDTO[],
	// Settings the app needs from this module (e.g. its upload limit), returned
	// with the user's preferences under `moduleConfig.<name>`.
	clientConfig?: (appContext: AppContext) => Record<string, unknown>,
}
