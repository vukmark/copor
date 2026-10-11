import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {DescriptionField} from '@copor/core/client/Core/Form/text_inputs/DescriptionField';
import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {FormField} from '@copor/core/client/Core/Form/FormField';
import {NameField} from '@copor/core/client/Core/Form/text_inputs/NameField';
import {ColorField} from '@copor/core/client/Core/Form/color_inputs/ColorField';
import {ColorHelper} from '@copor/core/client/Core/Helpers/ColorHelper';

export class GetTagFormPresenter
	extends FormPresenter<GetTagDTO> {
	protected getEndpoint(): string {
		return '/tag';
	}

	protected getFormFields(): FormField[] {
		return [
			new NameField(this.input.name),
			new DescriptionField(this.input.description ?? ''),
			new ColorField(
				{color: this.input.color, colorSet: this.input.colorSet},
				ColorHelper.toNameAndIdDTO()
			)
		];
	}
}