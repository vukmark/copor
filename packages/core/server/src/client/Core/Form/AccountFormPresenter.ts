import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {FormField} from '@copor/core/client/Core/Form/FormField';
import {HiddenText} from '@copor/core/client/Core/Form/text_inputs/HiddenText';
import {AccountFormVariant, FORM_VARIANT_FIELD_NAME} from '@copor/core/client/Core/Form/AccountFormVariant';

export abstract class AccountFormPresenter<T> extends FormPresenter<T> {
	public getClearableFieldNames(): string[] {
		return this.getPresentedFields()
			.filter((field) => field.isClearable())
			.map((field) => field.getField().name)
			.filter((name) => name !== '');
	}

	public abstract getVariant(): AccountFormVariant;

	protected getPresentedFields(): FormField[] {
		return [
			... this.getFormFields(),
			new HiddenText(this.getVariant(), '', FORM_VARIANT_FIELD_NAME)
		];
	}
}
