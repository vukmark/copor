import {FormField, RequiredField} from '@copor/core/client/Core/Form/FormField';
import {NumberField} from '@copor/core/client/Core/Form/number_inputs/NumberField';
import {YesNoDropDownField} from '@copor/core/client/Core/Form/bool_inputs/YesNoDropDownField';
import {TextListField} from '@copor/core/client/Core/Form/text_inputs/TextListField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetSystemSettingsFormPresenter} from '@copor/core/client/SystemSettings/GetSystemSettingsFormPresenter';

export class GetPasswordSystemSettingsFormPresenter extends GetSystemSettingsFormPresenter<GetPasswordSystemSettingsDTO> {
	getSystemSettingsType(): SystemSettingsType {
		return SystemSettingsType.PASSWORD;
	}

	protected getFormFields(): FormField[] {
		return [
			new MinPasswordLengthField(this.input.minPasswordLength),
			new MaxPasswordLengthField(this.input.maxPasswordLength),
			new MinLowercaseLettersField(this.input.minLowercaseLetters),
			new MinUppercaseLettersField(this.input.minUppercaseLetters),
			new MinDigitsField(this.input.minDigits),
			new MinSpecialCharactersField(this.input.minSpecialCharacters),
			new AllowSpacesField(this.input.allowSpaces),
			new DisallowUsernameInPasswordField(this.input.disallowUsernameInPassword),
			new DisallowEmailOrNameInPasswordField(this.input.disallowEmailOrNameInPassword),
			new BlockCommonPasswordsField(this.input.blockCommonPasswords),
			new CommonPasswordsField(this.input.commonPasswords),
			new MaxRepeatedCharactersField(this.input.maxRepeatedCharacters),
			new PasswordHistoryCountField(this.input.passwordHistoryCount)
		];
	}
}

class MinPasswordLengthField extends NumberField implements RequiredField {
	getRequiredMessage(): string {
		return 'MIN_PASSWORD_LENGTH_REQUIRED';
	}

	protected getLabel(): string {
		return 'MIN_PASSWORD_LENGTH';
	}

	protected getName(): string {
		return 'minPasswordLength';
	}
}

class MaxPasswordLengthField extends NumberField {
	protected getLabel(): string {
		return 'MAX_PASSWORD_LENGTH';
	}

	protected getName(): string {
		return 'maxPasswordLength';
	}
}

class MinLowercaseLettersField extends NumberField implements RequiredField {
	getRequiredMessage(): string {
		return 'MIN_LOWERCASE_LETTERS_REQUIRED';
	}

	protected getLabel(): string {
		return 'MIN_LOWERCASE_LETTERS';
	}

	protected getName(): string {
		return 'minLowercaseLetters';
	}
}

class MinUppercaseLettersField extends NumberField implements RequiredField {
	getRequiredMessage(): string {
		return 'MIN_UPPERCASE_LETTERS_REQUIRED';
	}

	protected getLabel(): string {
		return 'MIN_UPPERCASE_LETTERS';
	}

	protected getName(): string {
		return 'minUppercaseLetters';
	}
}

class MinDigitsField extends NumberField implements RequiredField {
	getRequiredMessage(): string {
		return 'MIN_DIGITS_REQUIRED';
	}

	protected getLabel(): string {
		return 'MIN_DIGITS';
	}

	protected getName(): string {
		return 'minDigits';
	}
}

class MinSpecialCharactersField extends NumberField implements RequiredField {
	getRequiredMessage(): string {
		return 'MIN_SPECIAL_CHARACTERS_REQUIRED';
	}

	protected getLabel(): string {
		return 'MIN_SPECIAL_CHARACTERS';
	}

	protected getName(): string {
		return 'minSpecialCharacters';
	}
}

class AllowSpacesField extends YesNoDropDownField {
	protected getLabel(): string {
		return 'ALLOW_SPACES';
	}

	protected getName(): string {
		return 'allowSpaces';
	}
}

class DisallowUsernameInPasswordField extends YesNoDropDownField {
	protected getLabel(): string {
		return 'DISALLOW_USERNAME_IN_PASSWORD';
	}

	protected getName(): string {
		return 'disallowUsernameInPassword';
	}
}

class DisallowEmailOrNameInPasswordField extends YesNoDropDownField {
	protected getLabel(): string {
		return 'DISALLOW_EMAIL_OR_NAME_IN_PASSWORD';
	}

	protected getName(): string {
		return 'disallowEmailOrNameInPassword';
	}
}

class BlockCommonPasswordsField extends YesNoDropDownField {
	protected getFieldType(): FormFieldType {
		return FormFieldType.BLOCK_COMMON_PASSWORDS;
	}

	protected getLabel(): string {
		return 'BLOCK_COMMON_PASSWORDS';
	}

	protected getName(): string {
		return 'blockCommonPasswords';
	}
}

class CommonPasswordsField extends TextListField {
	protected getLabel(): string {
		return 'COMMON_PASSWORDS';
	}

	protected getName(): string {
		return 'commonPasswords';
	}
}

class MaxRepeatedCharactersField extends NumberField {
	protected getLabel(): string {
		return 'MAX_REPEATED_CHARACTERS';
	}

	protected getName(): string {
		return 'maxRepeatedCharacters';
	}
}

class PasswordHistoryCountField extends NumberField {
	protected getLabel(): string {
		return 'PASSWORD_HISTORY_COUNT';
	}

	protected getName(): string {
		return 'passwordHistoryCount';
	}
}
