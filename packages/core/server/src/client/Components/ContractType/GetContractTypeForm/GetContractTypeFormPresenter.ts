import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {NameField} from '@copor/core/client/Core/Form/text_inputs/NameField';
import {FormField, RequiredField} from '@copor/core/client/Core/Form/FormField';
import {DescriptionField} from '@copor/core/client/Core/Form/text_inputs/DescriptionField';
import {PublishStatusField} from '@copor/core/client/Core/Form/drop_down/PublishStatusField';
import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';


export class GetContractTypeFormPresenter
	extends FormPresenter<GetContractTypeDTO> {
	protected getEndpoint(): string {
		return '/contract-type';
	}
	protected getFormFields(): FormField[] {
		return [
			new NameField(this.input.name),
			new DescriptionField(this.input.description ?? ''),
			new RequiredContractTypeFileField(this.input.file),
			new PublishStatusField(this.input.publishStatus)
		];
	}
}

class ContractTypeFileField extends TextField {
	protected getLabel(): string {
		return 'FILE';
	}

	protected getName(): string {
		return 'file';
	}
}

class RequiredContractTypeFileField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'CONTRACT_TYPE_FILE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'FILE';
	}

	protected getName(): string {
		return 'file';
	}
}