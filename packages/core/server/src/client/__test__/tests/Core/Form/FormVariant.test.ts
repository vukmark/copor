import {AccountFormVariant} from '../../../../Core/Form/AccountFormVariant';
import {FormFieldType} from '../../../../Core/Form/FormFieldType';
import {FormField} from '../../../../Core/Form/FormField';
import {FieldValueDTO} from '../../../../Core/Form/FormFieldDTO';
import {
	AccountInformationFormVariantResolver
} from '../../../../AccountInformation/AccountInformationFormVariantResolver';
import {AppContext} from '../../../../Interface/AppContext';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

class StubField extends FormField {
	private readonly fieldType: FormFieldType;

	constructor(fieldType: FormFieldType) {
		super();
		this.fieldType = fieldType;
	}

	protected getFieldType(): FormFieldType {
		return this.fieldType;
	}

	protected getCurrentValue(): FieldValueDTO {
		return {};
	}

	protected getLabel(): string {
		return 'STUB';
	}

	protected getName(): string {
		return 'stub';
	}
}

describe('AccountInformationFormVariantResolver', () => {
	const context = {envVariables: {}} as unknown as AppContext;
	const roleTypes = Object.values(RoleType);

	it('resolves every declared AccountFormVariant from some role pair', () => {
		const resolvedVariants = new Set(
			roleTypes.flatMap((targetRole) =>
				roleTypes
					.map((actorRole) => AccountInformationFormVariantResolver.resolve(targetRole, actorRole, context))
					.filter((variant): variant is AccountFormVariant => variant !== undefined)
			)
		);

		expect([... resolvedVariants].sort()).toStrictEqual(Object.values(AccountFormVariant).sort());
	});

	it('gives every role pair the generic personal form', () => {
		for (const targetRole of roleTypes) {
			for (const actorRole of roleTypes) {
				expect(AccountInformationFormVariantResolver.resolve(targetRole, actorRole, context))
					.toBe(AccountFormVariant.PERSONAL);
			}
		}
	});
});

describe('FormField.isClearable', () => {
	const nonClearable = [
		FormFieldType.DISABLED_TEXT,
		FormFieldType.PICTURE,
		FormFieldType.HEADER,
		FormFieldType.TEXT_LABEL,
		FormFieldType.SUCCESS_LABEL,
		FormFieldType.CREATE_REGION_BUTTON,
		FormFieldType.DIVIDER,
		FormFieldType.SIZEDBOX,
		FormFieldType.HIDDEN,
		FormFieldType.TEXT,
		FormFieldType.TEXTBOX,
		FormFieldType.EMAIL,
		FormFieldType.NUMBER,
		FormFieldType.DOUBLE,
		FormFieldType.DATE,
		FormFieldType.MULTISELECT,
		FormFieldType.DISABLED_DROPDOWN
	];

	it.each(nonClearable)('treats %s as not clearable', (fieldType) => {
		expect(new StubField(fieldType).isClearable()).toBe(false);
	});

	it.each([
		FormFieldType.COUNTRY,
		FormFieldType.STATE,
		FormFieldType.CITIZENSHIP,
		FormFieldType.DROPDOWN,
		FormFieldType.SEARCHABLE_DROPDOWN,
		FormFieldType.CONTENT_ITEM
	])('treats %s as clearable', (fieldType) => {
		expect(new StubField(fieldType).isClearable()).toBe(true);
	});
});
