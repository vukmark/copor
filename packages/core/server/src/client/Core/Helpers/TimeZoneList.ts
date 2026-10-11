import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export class TimeZoneList {
	static get(): NameAndIdDTO<string>[] {
		return Intl.supportedValuesOf('timeZone').map((timeZone) => ({
			id: timeZone,
			name: timeZone
		}));
	}
}
