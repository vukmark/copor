import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {FormField, RequiredField, UsePredefinedValues} from '@copor/core/client/Core/Form/FormField';
import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {PublishStatusField} from '@copor/core/client/Core/Form/drop_down/PublishStatusField';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {TextBoxField} from '@copor/core/client/Core/Form/text_inputs/TextBoxField';

interface GetContentItemFormPresenterDTO {
	contentItem?: GetContentItemDTO;
	contentTypeList: NameAndIdDTO[];
	roleList: NameAndIdDTO[];
}

export class GetContentItemFormPresenter extends FormPresenter<GetContentItemFormPresenterDTO> {
	protected getEndpoint(): string {
		return '/content-item';
	}

	protected getFormFields(): FormField[] {
		const contentItem = this.input.contentItem;

		return [
			new TitleField(contentItem?.title ?? ''),
			new SummaryField(contentItem?.summary ?? ''),
			new ContentField(contentItem?.content ?? ''),
			new ContentTypeField(
				{id: '', name: ''},
				this.input.contentTypeList
			),
			new RoleTypeContentItemField(
				contentItem?.role?.map((r) => ({id: r.id, name: r.name})) ?? [],
				this.input.roleList
			),
			new PublishStatusField(contentItem?.publishStatus ?? PublishStatus.unpublished)
		];
	}
}

class TitleField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'TITLE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'TITLE';
	}

	protected getName(): string {
		return 'title';
	}
}

class SummaryField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'SUMMARY_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'SUMMARY';
	}

	protected getName(): string {
		return 'summary';
	}
}

class ContentField extends TextBoxField implements RequiredField {
	getRequiredMessage(): string {
		return 'CONTENT_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'CONTENT';
	}

	protected getName(): string {
		return 'content';
	}
}

class ContentTypeField extends FormField<string> implements RequiredField, UsePredefinedValues<string> {
	private readonly values: NameAndIdDTO<string>[];
	private readonly currentValue: NameAndIdDTO<string>;

	constructor(currentValue: NameAndIdDTO<string>, values: NameAndIdDTO<string>[]) {
		super();
		this.currentValue = currentValue;
		this.values = values;
	}

	getValues(): NameAndIdDTO<string>[] {
		return this.values;
	}

	getRequiredMessage(): string {
		return 'CONTENT_TYPE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'CONTENT_TYPE';
	}

	protected getName(): string {
		return 'contentType';
	}

	protected getCurrentValue(): FieldValueDTO<string> {
		return {dropdown: [this.currentValue]};
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.CONTENT_ITEM;
	}
}

class RoleTypeContentItemField extends FormField<string> implements UsePredefinedValues<string> {
	protected currentValue: NameAndIdDTO<string>[];
	protected values: NameAndIdDTO<string>[];

	constructor(input: NameAndIdDTO<string>[], values: NameAndIdDTO<string>[]) {
		super();
		this.currentValue = input;
		this.values = values;
	}

	getValues(): NameAndIdDTO<string>[] {
		return this.values;
	}

	protected getLabel(): string {
		return 'ROLE_TYPE';
	}

	protected getName(): string {
		return 'roleId';
	}

	protected getCurrentValue(): FieldValueDTO<string> {
		return {dropdown: this.currentValue};
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.ROLE_MULTISELECT;
	}
}