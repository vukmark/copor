import {InfoField} from '@copor/core/client/Core/Info/InfoField';
import {InfoFieldType} from '@copor/core/client/Core/Info/InfoFieldType';
import {InfoFieldValueDTO} from '@copor/core/client/Core/Info/InfoFieldDTO';

export class KeyValueField extends InfoField {
	private readonly key: string;
	private readonly value: unknown;

	constructor(key: string, value: unknown) {
		super();
		this.key = key;
		this.value = value;
	}

	protected getLabel(): string {
		return this.key;
	}

	protected getValue(): InfoFieldValueDTO<string> {
		const text = typeof this.value === 'object' && this.value !== null
			? Object.entries(this.value as Record<string, unknown>)
				.map(([subKey, subValue]) => `${subKey}: ${String(subValue)}`)
				.join(', ')
			: String(this.value);

		return {text};
	}

	protected getFieldType(): InfoFieldType {
		return InfoFieldType.COPYABLE_TEXT;
	}
}
