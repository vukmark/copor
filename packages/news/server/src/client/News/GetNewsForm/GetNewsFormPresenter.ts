import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {FormField, RequiredField} from '@copor/core/client/Core/Form/FormField';
import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {PublishStatusField} from '@copor/core/client/Core/Form/drop_down/PublishStatusField';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {
	HtmlTextField
} from '@copor/core/client/Core/Form/text_inputs/HtmlTextField';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {MultiSelectDropDownField} from '@copor/core/client/Core/Form/drop_down/MultiSelectDropDownField';
import i18next from 'i18next';

interface GetNewsFormPresenterDTO {
	news?: GetNewsDTO;
	roleList: NameAndIdDTO<string>[];
}

export class GetNewsFormPresenter
	extends FormPresenter<GetNewsFormPresenterDTO> {
	protected getEndpoint(): string {
		return '/news';
	}

	protected getFormFields(): FormField[] {
		const news = this.input.news;

		return [
			new TitleField(news?.title ?? ''),
			new SummaryField(news?.summary ?? ''),
			new ContentField(news?.content ?? ''),
			new RoleTypeField(
				(news?.role ?? []).map((sp) => ({
					id: sp.id,
					name: sp.name ? i18next.t(`translationStringList.${sp.name.replace(/\s+/g, '_').toUpperCase()}`) : ''
				})),
				this.input.roleList
			),
			new PublishStatusField(news?.publishStatus ?? PublishStatus.unpublished)
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

class ContentField extends HtmlTextField implements RequiredField {
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

class RoleTypeField extends MultiSelectDropDownField<string> implements RequiredField {
	getRequiredMessage(): string {
		return 'ROLE_TYPE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'ROLE_TYPE';
	}

	protected getName(): string {
		return 'roleId';
	}
}
