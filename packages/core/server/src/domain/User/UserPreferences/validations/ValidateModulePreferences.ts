import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {findModulePreferenceDefinition} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceRegistry';
import {InvalidModulePreferenceException} from '@copor/core/domain/User/UserPreferences/exception/InvalidModulePreferenceException';

// Every key must be a preference of an included module, every value a boolean.
export class ValidateModulePreferences implements Validator {
	private readonly modulePreferences: Record<string, unknown> | undefined;

	constructor(modulePreferences: Record<string, unknown> | undefined) {
		this.modulePreferences = modulePreferences;
	}

	public validate(): Promise<void> {
		const invalid = Object.entries(this.modulePreferences ?? {})
			.some(([key, value]) => !findModulePreferenceDefinition(key) || typeof value !== 'boolean');

		return invalid ? Promise.reject(new InvalidModulePreferenceException()) : Promise.resolve();
	}
}
