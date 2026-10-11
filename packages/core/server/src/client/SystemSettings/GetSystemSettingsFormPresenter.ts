import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {SystemSettingsFormPresenter} from '@copor/core/client/Interface/Presenter';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export abstract class GetSystemSettingsFormPresenter<Input> extends FormPresenter<Input>
	implements SystemSettingsFormPresenter<GetFormViewModel> {
	protected getEndpoint(): string {
		return '/system-settings/' + this.getSystemSettingsType();
	}

	abstract getSystemSettingsType(): SystemSettingsType;
}