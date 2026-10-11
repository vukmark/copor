import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';

const DEFAULT_TIME_ZONE = 'Europe/Berlin';

let currentTimeZone: string = DEFAULT_TIME_ZONE;

export class AppTimeZoneStore {
	static get(): string {
		return currentTimeZone;
	}

	static set(timeZone: string): void {
		currentTimeZone = timeZone;
	}
}

// Every TimeTransformer subclass across the codebase reads the configured
// time zone through this provider — registering it here, as a side effect of
// importing this module, guarantees it's wired before any request is handled.
TimeTransformer.setTimeZoneProvider(() => AppTimeZoneStore.get());
