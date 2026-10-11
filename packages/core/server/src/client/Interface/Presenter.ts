import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export interface Presenter<ViewModel> {
	present(): ViewModel
}

export interface SystemSettingsFormPresenter<ViewModel> extends Presenter<ViewModel> {
	getSystemSettingsType(): SystemSettingsType;
}
