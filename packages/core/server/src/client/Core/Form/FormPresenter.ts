import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import i18next from 'i18next';
import {FormField} from '@copor/core/client/Core/Form/FormField';

export abstract class FormPresenter<T> extends PresenterInstance<T, GetFormViewModel> {
	present(): GetFormViewModel {
		i18next.setDefaultNamespace('form');

		return {
			fields: this.getPresentedFields().map((field) => field.getField()),
			endpoint: this.getEndpoint()
		};
	}

	protected getPresentedFields(): FormField[] {
		return this.getFormFields();
	}

	protected abstract getEndpoint(): string;

	protected abstract getFormFields(): FormField[];
}
