import {FormField, RequiredField, UsePredefinedValues} from '@copor/core/client/Core/Form/FormField';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {PublishStatusHelper} from '@copor/core/client/Core/Helpers/PublishStatus';

export class PublishStatusField extends FormField implements UsePredefinedValues<PublishStatus>, RequiredField {
	private readonly currentValue: NameAndIdDTO<PublishStatus>;

	constructor(publishStatus: PublishStatus) {
		super();
		this.currentValue = {
			id: publishStatus,
			name: this.getTranslation(publishStatus)
		};
	}

	getRequiredMessage(): string {
		return 'PUBLISH_STATUS_IS_REQUIRED';
	}

	getValues(): NameAndIdDTO<PublishStatus>[] {
		return PublishStatusHelper.toNameAndIdDTO();
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.DROPDOWN;
	}

	protected getCurrentValue(): FieldValueDTO<PublishStatus> {
		return {dropdown: [this.currentValue]};
	}

	protected getLabel(): string {
		return 'PUBLISH_STATUS';
	}

	protected getName(): string {
		return 'publishStatus';
	}
}

