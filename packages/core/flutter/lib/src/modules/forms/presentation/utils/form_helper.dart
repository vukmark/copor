import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/modules/forms/data/model/dt_input.dart';
import 'package:copor_core/src/modules/forms/data/model/input_field_model.dart';
import 'package:flutter/widgets.dart';

class FormHelper {
  final List<CoporFormFieldDTO> formFields;

  FormHelper({required this.formFields});

  static List<InputFieldModel> getFormContent(List<CoporFormFieldDTO> formFields) {
    final List<InputFieldModel> inputs = [];

    for (CoporFormFieldDTO field in formFields) {
      switch (field.type) {
        case FieldType.TEXT:
          inputs.add(
            DTInput.text(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier(field.currentValue.text ?? ''),
            ),
          );
          break;
        case FieldType.VALIDATION_TEXT:
          inputs.add(
            DTInput.validationText(
              validationEndpoint: field.currentValue.validationEndpoint!,
              triggerLengths: field.currentValue.triggerLengths!,
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier(field.currentValue.text ?? ''),
            ),
          );
          break;
        case FieldType.PICTURE:
          inputs.add(
            DTInput.image(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<MediaFileModel?>(null),
              uploadEndpoint: field.currentValue.uploadEndpoint ?? '',
              currentImageUrl: field.currentValue.picture ?? '',
            ),
          );
          break;
        case FieldType.STATE_VALIDATION:
          final firstDropdownItem = field.currentValue.dropdown?.firstOrNull;

          inputs.add(
            StateValidationInput(
              label: field.label,
              name: field.name,
              controller: ValueNotifier<NamedIdModel<String>>(
                NamedIdModel<String>(
                  id: firstDropdownItem?.id?.toString() ?? '',
                  name: firstDropdownItem?.name.toString() ?? '',
                ),
              ),
              requiredMessage: field.requiredMessage,
              items: (field.values as List? ?? [])
                  .map((i) => NamedIdModel<String>(id: i.id.toString(), name: i.name.toString()))
                  .toList(),
            ),
          );
          break;
        case FieldType.DEPENDENT_VALIDATION_TEXT:
          inputs.add(
            DependentValidationTextInput(
              name: field.name,
              label: field.label,
              controller: ValueNotifier(field.currentValue.text ?? ''),
              requiredMessage: field.requiredMessage,
              triggerLength: field.currentValue.triggerLength ?? 1,
              maxLength: field.currentValue.maxLength,
              validationEndpoint: field.currentValue.validationEndpoint ?? '/',
              isSuccess: field.currentValue.isSuccess,
              checkStatus: field.currentValue.checkStatus,
              checkStatusMessage: field.currentValue.checkStatusMessage,
            ),
          );
          break;
        case FieldType.DISABLED_DEPENDENT_VALIDATION_TEXT:
          inputs.add(
            DependentValidationTextInput(
              isEnabled: false,
              name: field.name,
              label: field.label,
              controller: ValueNotifier(field.currentValue.text ?? ''),
              requiredMessage: field.requiredMessage,
              triggerLength: field.currentValue.triggerLength ?? 1,
              validationEndpoint: field.currentValue.validationEndpoint ?? '/',
              isSuccess: field.currentValue.isSuccess,
              checkStatus: field.currentValue.checkStatus,
              checkStatusMessage: field.currentValue.checkStatusMessage,
            ),
          );
          break;
        case FieldType.DISABLED_TEXT:
          inputs.add(
            DTInput.disabled(
              isSuccess: field.currentValue.isSuccess,
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier(field.currentValue.text ?? ''),
            ),
          );
          break;
        case FieldType.DISABLED_DROPDOWN:
          final dropValue =
              (field.currentValue.dropdown != null && field.currentValue.dropdown!.isNotEmpty)
              ? field.currentValue.dropdown!.first
              : NamedIdModel.empty();
          inputs.add(
            DisabledDropdownInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<NamedIdModel<dynamic>>(dropValue),
              items: field.values ?? [],
            ),
          );
          break;
        case FieldType.NUMBER:
          inputs.add(
            DTInput.number(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier(field.currentValue.number ?? 0),
            ),
          );
          break;
        case FieldType.TEXTBOX:
          inputs.add(
            DTInput.textBox(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier(field.currentValue.text ?? ''),
            ),
          );
          break;
        case FieldType.HTML_TEXT:
          inputs.add(
            HtmlInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier(field.currentValue.text ?? ''),
            ),
          );
          break;
        case FieldType.DROPDOWN:
          final dropValue =
              (field.currentValue.dropdown != null && field.currentValue.dropdown!.isNotEmpty)
              ? field.currentValue.dropdown!.first
              : NamedIdModel.empty();
          inputs.add(
            DTInput.dropdown<dynamic>(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<NamedIdModel<dynamic>>(dropValue),
              items: field.values ?? [],
            ),
          );
          break;
        case FieldType.BOOLEAN:
          final boolValue =
              (field.currentValue.dropdown != null && field.currentValue.dropdown!.isNotEmpty) &&
              field.currentValue.dropdown!.first.id == true;
          inputs.add(
            BooleanDropdownInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<bool>(boolValue),
              items: field.values ?? [],
            ),
          );
          break;
        case FieldType.COLOR:
          inputs.add(
            ColorInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier(field.currentValue.color ?? ColorFieldDTO.empty()),
            ),
          );
          break;
        case FieldType.MULTISELECT:
          inputs.add(
            DTInput.multiselect<dynamic>(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<List<NamedIdModel<dynamic>>>(
                field.currentValue.dropdown ?? [],
              ),
              items: field.values!,
            ),
          );
          break;
        case FieldType.DOUBLE:
          inputs.add(
            DTInput.decimal(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier(field.currentValue.doubleNumber ?? 0.0),
            ),
          );
          break;
        case FieldType.CONTENT_ITEM:
          NamedIdModel<String> initialValue = NamedIdModel<String>.empty();
          if (field.currentValue.dropdown != null && field.currentValue.dropdown!.isNotEmpty) {
            final item = field.currentValue.dropdown!.first;
            initialValue = NamedIdModel<String>(id: item.id, name: item.name);
          }
          final List<NamedIdModel<String>> contentTypeItems = field.values!
              .map((i) => NamedIdModel<String>(id: i.id, name: i.name))
              .toList();
          inputs.add(
            ContentItemInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<NamedIdModel<String>>(initialValue),
              items: contentTypeItems,
            ),
          );
          break;
        case FieldType.ROLE_MULTISELECT:
          inputs.add(
            RoleMultiselectInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<List<NamedIdModel<dynamic>>>(
                field.currentValue.dropdown ?? [],
              ),
            ),
          );
          break;
        case FieldType.COUNTRY:
          NamedIdModel<String> initialValue = NamedIdModel<String>.empty();
          if (field.currentValue.dropdown != null && field.currentValue.dropdown!.isNotEmpty) {
            final item = field.currentValue.dropdown!.first;
            initialValue = NamedIdModel<String>(id: item.id, name: item.name);
          }

          final List<NamedIdModel<String>> countryItems = field.values!
              .map((i) => NamedIdModel<String>(id: i.id, name: i.name))
              .toList();

          inputs.add(
            CountryInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<NamedIdModel<String>>(initialValue),
              items: countryItems,
            ),
          );
          break;
        case FieldType.STATE:
          NamedIdModel<String> initialValue = NamedIdModel<String>.empty();
          if (field.currentValue.dropdown != null && field.currentValue.dropdown!.isNotEmpty) {
            final item = field.currentValue.dropdown!.first;
            initialValue = NamedIdModel<String>(id: item.id, name: item.name);
          }

          final List<NamedIdModel<String>> stateItems = field.values!
              .map((i) => NamedIdModel<String>(id: i.id, name: i.name))
              .toList();

          inputs.add(
            StateInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<NamedIdModel<String>>(initialValue),
              items: stateItems,
            ),
          );
          break;

        case FieldType.EMAIL:
          inputs.add(
            DTInput.email(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier(field.currentValue.text ?? ''),
            ),
          );
          break;
        case FieldType.DATE:
          final date = field.currentValue.date;
          inputs.add(
            DTInput.date(
              label: field.label,
              name: field.name,
              controller: ValueNotifier(date == null || date.isEmpty ? null : DateTime.parse(date)),
              requiredMessage: field.requiredMessage,
            ),
          );
          break;
        case FieldType.DATE_TIME:
          final date = field.currentValue.date;
          inputs.add(
            DTInput.dateTime(
              label: field.label,
              name: field.name,
              controller: ValueNotifier(date == null || date.isEmpty ? null : DateTime.parse(date)),
              requiredMessage: field.requiredMessage,
            ),
          );
          break;
        case FieldType.PHONE_NUMBER_LIST:
          inputs.add(
            PhoneNumberListInput(
              label: field.label,
              name: field.name,
              controller: ValueNotifier(field.currentValue.phoneNumberList ?? []),
              requiredMessage: field.requiredMessage,
            ),
          );
          break;
        case FieldType.HIDDEN:
          inputs.add(
            DTInput.hidden(
              name: field.name,
              label: field.label,
              controller: ValueNotifier<String>(field.currentValue.text ?? ''),
              requiredMessage: '',
            ),
          );
          break;
        case FieldType.CREATE_REGION_BUTTON:
          inputs.add(
            CreateRegionButtonInput(
              name: field.name,
              label: field.label,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<String>(''),
            ),
          );
          break;
        case FieldType.HEADER:
          inputs.add(
            DTInput.header(
              name: field.name,
              label: field.label,
              controller: ValueNotifier<String>(field.currentValue.text ?? ''),
            ),
          );
          break;
        case FieldType.TEXT_LABEL:
          inputs.add(
            TextLabelInput(
              name: '',
              label: field.currentValue.text ?? '',
              controller: ValueNotifier<String>(field.currentValue.text ?? ''),
            ),
          );
          break;
        case FieldType.BLOCK_COMMON_PASSWORDS:
          final dropValue =
              (field.currentValue.dropdown != null && field.currentValue.dropdown!.isNotEmpty)
              ? field.currentValue.dropdown!.first
              : NamedIdModel.empty();
          inputs.add(
            BlockCommonPasswordsDropdown(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<NamedIdModel>(dropValue),
              items: field.values ?? [],
            ),
          );
          break;
        case FieldType.TEXT_LIST:
          inputs.add(
            TextListInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<List<String>>(field.currentValue.textList ?? []),
            ),
          );
          break;
        case FieldType.SEARCHABLE_DROPDOWN:
          final dropValue =
              (field.currentValue.dropdown != null && field.currentValue.dropdown!.isNotEmpty)
              ? field.currentValue.dropdown!.first
              : NamedIdModel.empty();
          inputs.add(
            SearchableDropdownInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<NamedIdModel>(dropValue),
              searchableDropdownType: field.currentValue.searchableDropdown?.key ?? '',
              searchableDropdownFilters: field.currentValue.searchableDropdown?.filters ?? const [],
            ),
          );
          break;
        case FieldType.SEARCHABLE_MULTISELECT:
          inputs.add(
            SearchableMultiselectInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<List<NamedIdModel>>(field.currentValue.dropdown ?? []),
              searchableDropdownType: field.currentValue.searchableMultiselect?.key ?? '',
              searchableDropdownFilters:
                  field.currentValue.searchableMultiselect?.filters ?? const [],
            ),
          );
          break;
        case FieldType.RANGE_SEARCHABLE_MULTISELECT:
          inputs.add(
            RangeSearchableMultiselectInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<List<NamedIdModel>>(field.currentValue.dropdown ?? []),
              searchableDropdownType: field.currentValue.rangeSearchableMultiselect?.key ?? '',
              searchableDropdownFilters:
                  field.currentValue.rangeSearchableMultiselect?.filters ?? const [],
            ),
          );
          break;
        case FieldType.CONTRACT:
          inputs.add(
            ContractSwitch(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<ContractValueDTO>(
                field.currentValue.contract ??
                    ContractValueDTO(contractType: null, accepted: false),
              ),
            ),
          );
          break;
        case FieldType.PASSWORD:
          inputs.add(
            PasswordInput(
              name: field.name,
              label: field.label,
              controller: ValueNotifier(field.currentValue.text ?? ''),
              requiredMessage: field.requiredMessage,
            ),
          );
          break;
        case FieldType.SINGLE_PASSWORD:
          inputs.add(
            SinglePasswordInput(
              name: field.name,
              label: field.label,
              controller: ValueNotifier(field.currentValue.text ?? ''),
              requiredMessage: field.requiredMessage,
            ),
          );
          break;
        case FieldType.CITIZENSHIP:
          NamedIdModel<String> initialValue = NamedIdModel<String>.empty();
          if (field.currentValue.dropdown != null && field.currentValue.dropdown!.isNotEmpty) {
            final item = field.currentValue.dropdown!.first;
            initialValue = NamedIdModel<String>(id: item.id, name: item.name);
          }

          final List<NamedIdModel<String>> citizenshipItems = field.values!
              .map((i) => NamedIdModel<String>(id: i.id, name: i.name))
              .toList();

          inputs.add(
            CitizenshipInput(
              label: field.label,
              name: field.name,
              requiredMessage: field.requiredMessage,
              controller: ValueNotifier<NamedIdModel<String>>(initialValue),
              items: citizenshipItems,
            ),
          );
          break;
        case FieldType.SUCCESS_LABEL:
          inputs.add(
            SuccessLabel(
              message: field.currentValue.text ?? '',
              label: '',
              name: '',
              controller: ValueNotifier<String>(''),
              requiredMessage: '',
            ),
          );

        default:
          break;
      }
    }
    return inputs;
  }
}
