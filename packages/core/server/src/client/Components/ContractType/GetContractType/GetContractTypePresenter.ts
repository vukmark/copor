import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {GetContractTypeViewModel} from './GetContractTypeViewModel';

export class GetContractTypePresenter extends PresenterInstance<GetContractTypeDTO, GetContractTypeViewModel> {
	present(): GetContractTypeViewModel {
		return {
			... this.input
		};
	}
}
