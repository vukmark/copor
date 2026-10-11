// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'copor_form_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FieldValue _$FieldValueFromJson(Map<String, dynamic> json) => FieldValue(
  text: json['text'] as String?,
  date: json['date'] as String?,
  color: json['color'] == null
      ? null
      : ColorFieldDTO.fromJson(json['color'] as Map<String, dynamic>),
  dropdown: (json['dropdown'] as List<dynamic>?)
      ?.map((e) => NamedIdModel<dynamic>.fromJson(e as Map<String, dynamic>))
      .toList(),
  number: (json['number'] as num?)?.toInt(),
  doubleNumber: (json['doubleNumber'] as num?)?.toDouble(),
  stateList: (json['stateList'] as List<dynamic>?)
      ?.map((e) => StateModelDTO.fromJson(e as Map<String, dynamic>))
      .toList(),
  checkbox: json['checkbox'] as bool?,
  phoneNumberList: (json['phoneNumberList'] as List<dynamic>?)
      ?.map((e) => PhoneNumberDTO.fromJson(e as Map<String, dynamic>))
      .toList(),
  searchableDropdown: json['searchableDropdown'] == null
      ? null
      : SimpleListKey.fromJson(
          json['searchableDropdown'] as Map<String, dynamic>,
        ),
  searchableMultiselect: json['searchableMultiselect'] == null
      ? null
      : SimpleListKey.fromJson(
          json['searchableMultiselect'] as Map<String, dynamic>,
        ),
  rangeSearchableMultiselect: json['rangeSearchableMultiselect'] == null
      ? null
      : SimpleListKey.fromJson(
          json['rangeSearchableMultiselect'] as Map<String, dynamic>,
        ),
  contract: json['contract'] == null
      ? null
      : ContractValueDTO.fromJson(json['contract'] as Map<String, dynamic>),
  triggerLength: (json['triggerLength'] as num?)?.toInt(),
  triggerLengths: (json['triggerLengths'] as List<dynamic>?)
      ?.map((e) => (e as num).toInt())
      .toList(),
  maxLength: (json['maxLength'] as num?)?.toInt(),
  validationEndpoint: json['validationEndpoint'] as String?,
  checkStatus: $enumDecodeNullable(
    _$TenantActivationCheckStatusEnumMap,
    json['checkStatus'],
  ),
  checkStatusMessage: json['checkStatusMessage'] as String?,
  textList: (json['textList'] as List<dynamic>?)
      ?.map((e) => e as String)
      .toList(),
  picture: json['picture'] as String?,
  uploadEndpoint: json['uploadEndpoint'] as String?,
)..isSuccess = json['isSuccess'] as bool?;

Map<String, dynamic> _$FieldValueToJson(FieldValue instance) =>
    <String, dynamic>{
      'isSuccess': instance.isSuccess,
      'color': instance.color,
      'checkbox': instance.checkbox,
      'text': instance.text,
      'date': instance.date,
      'dropdown': instance.dropdown,
      'doubleNumber': instance.doubleNumber,
      'number': instance.number,
      'stateList': instance.stateList,
      'phoneNumberList': instance.phoneNumberList,
      'searchableDropdown': instance.searchableDropdown,
      'searchableMultiselect': instance.searchableMultiselect,
      'rangeSearchableMultiselect': instance.rangeSearchableMultiselect,
      'contract': instance.contract,
      'triggerLength': instance.triggerLength,
      'triggerLengths': instance.triggerLengths,
      'maxLength': instance.maxLength,
      'validationEndpoint': instance.validationEndpoint,
      'checkStatus': _$TenantActivationCheckStatusEnumMap[instance.checkStatus],
      'checkStatusMessage': instance.checkStatusMessage,
      'textList': instance.textList,
      'picture': instance.picture,
      'uploadEndpoint': instance.uploadEndpoint,
    };

const _$TenantActivationCheckStatusEnumMap = {
  TenantActivationCheckStatus.INVALID: 'INVALID',
  TenantActivationCheckStatus.NOT_BASE_TENANT: 'NOT_BASE_TENANT',
  TenantActivationCheckStatus.ALREADY_ACTIVATED: 'ALREADY_ACTIVATED',
  TenantActivationCheckStatus.NOT_ACTIVATED: 'NOT_ACTIVATED',
  TenantActivationCheckStatus.FOUND: 'FOUND',
};

SimpleListKey _$SimpleListKeyFromJson(Map<String, dynamic> json) =>
    SimpleListKey(
      key: json['key'] as String,
      filters: (json['filters'] as List<dynamic>?)
          ?.map((e) => FilterModelDTO.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$SimpleListKeyToJson(SimpleListKey instance) =>
    <String, dynamic>{'key': instance.key, 'filters': instance.filters};

ColorFieldDTO _$ColorFieldDTOFromJson(Map<String, dynamic> json) =>
    ColorFieldDTO(
      colorSet: $enumDecode(_$ColorSetEnumMap, json['colorSet']),
      color: (json['color'] as num).toInt(),
    );

Map<String, dynamic> _$ColorFieldDTOToJson(ColorFieldDTO instance) =>
    <String, dynamic>{
      'colorSet': _$ColorSetEnumMap[instance.colorSet]!,
      'color': instance.color,
    };

const _$ColorSetEnumMap = {
  ColorSet.SET22: 'SET22',
  ColorSet.SET18: 'SET18',
  ColorSet.SET9: 'SET9',
  ColorSet.SET5: 'SET5',
};

ContractValueDTO _$ContractValueDTOFromJson(Map<String, dynamic> json) =>
    ContractValueDTO(
      contractType: json['contractType'] as String?,
      accepted: json['accepted'] as bool,
      contractRoute: json['contractRoute'] as String?,
      iconMessage: json['iconMessage'] as String?,
    );

Map<String, dynamic> _$ContractValueDTOToJson(ContractValueDTO instance) =>
    <String, dynamic>{
      'contractType': instance.contractType,
      'accepted': instance.accepted,
      'contractRoute': instance.contractRoute,
      'iconMessage': instance.iconMessage,
    };

PhoneNumberDTO _$PhoneNumberDTOFromJson(Map<String, dynamic> json) =>
    PhoneNumberDTO(
      id: json['id'] as String?,
      phoneNumber: json['phoneNumber'] as String,
      phoneNumberType: $enumDecode(
        _$PhoneNumberTypeEnumMap,
        json['phoneNumberType'],
      ),
    );

Map<String, dynamic> _$PhoneNumberDTOToJson(PhoneNumberDTO instance) =>
    <String, dynamic>{
      'id': instance.id,
      'phoneNumber': instance.phoneNumber,
      'phoneNumberType': _$PhoneNumberTypeEnumMap[instance.phoneNumberType]!,
    };

const _$PhoneNumberTypeEnumMap = {
  PhoneNumberType.PHONE_MOBILE: 'PHONE_MOBILE',
  PhoneNumberType.PHONE_HOME: 'PHONE_HOME',
  PhoneNumberType.PHONE_WORK: 'PHONE_WORK',
  PhoneNumberType.PHONE_OTHER: 'PHONE_OTHER',
};

StateModelDTO _$StateModelDTOFromJson(Map<String, dynamic> json) =>
    StateModelDTO(
      name: json['name'] as String,
      id: json['id'] as String,
      code: json['code'] as String,
    );

Map<String, dynamic> _$StateModelDTOToJson(StateModelDTO instance) =>
    <String, dynamic>{
      'name': instance.name,
      'id': instance.id,
      'code': instance.code,
    };

CoporFormDTO _$CoporFormDTOFromJson(Map<String, dynamic> json) =>
    CoporFormDTO(
      fields: (json['fields'] as List<dynamic>)
          .map((e) => CoporFormFieldDTO.fromJson(e as Map<String, dynamic>))
          .toList(),
      endpoint: json['endpoint'] as String,
    );

Map<String, dynamic> _$CoporFormDTOToJson(CoporFormDTO instance) =>
    <String, dynamic>{'fields': instance.fields, 'endpoint': instance.endpoint};

CoporFormFieldDTO _$CoporFormFieldDTOFromJson(Map<String, dynamic> json) =>
    CoporFormFieldDTO(
      type: $enumDecode(_$FieldTypeEnumMap, json['type']),
      label: json['label'] as String,
      currentValue: FieldValue.fromJson(
        json['currentValue'] as Map<String, dynamic>,
      ),
      requiredMessage: json['requiredMessage'] as String?,
      name: json['name'] as String,
      values: (json['values'] as List<dynamic>?)
          ?.map(
            (e) => NamedIdModel<dynamic>.fromJson(e as Map<String, dynamic>),
          )
          .toList(),
    );

Map<String, dynamic> _$CoporFormFieldDTOToJson(
  CoporFormFieldDTO instance,
) => <String, dynamic>{
  'type': _$FieldTypeEnumMap[instance.type]!,
  'label': instance.label,
  'name': instance.name,
  'currentValue': instance.currentValue,
  'requiredMessage': instance.requiredMessage,
  'values': instance.values,
};

const _$FieldTypeEnumMap = {
  FieldType.TEXT: 'TEXT',
  FieldType.TEXTBOX: 'TEXTBOX',
  FieldType.HTML_TEXT: 'HTML_TEXT',
  FieldType.EMAIL: 'EMAIL',
  FieldType.DATE: 'DATE',
  FieldType.DATE_TIME: 'DATE_TIME',
  FieldType.DROPDOWN: 'DROPDOWN',
  FieldType.MULTISELECT: 'MULTISELECT',
  FieldType.COLOR: 'COLOR',
  FieldType.CONTENT_ITEM: 'CONTENT_ITEM',
  FieldType.ROLE_MULTISELECT: 'ROLE_MULTISELECT',
  FieldType.COUNTRY: 'COUNTRY',
  FieldType.STATE: 'STATE',
  FieldType.NUMBER: 'NUMBER',
  FieldType.DOUBLE: 'DOUBLE',
  FieldType.DIVIDER: 'DIVIDER',
  FieldType.HIDDEN: 'HIDDEN',
  FieldType.SIZEDBOX: 'SIZEDBOX',
  FieldType.PHONE_NUMBER_LIST: 'PHONE_NUMBER_LIST',
  FieldType.SEARCHABLE_DROPDOWN: 'SEARCHABLE_DROPDOWN',
  FieldType.SEARCHABLE_MULTISELECT: 'SEARCHABLE_MULTISELECT',
  FieldType.RANGE_SEARCHABLE_MULTISELECT: 'RANGE_SEARCHABLE_MULTISELECT',
  FieldType.DISABLED_TEXT: 'DISABLED_TEXT',
  FieldType.CONTRACT: 'CONTRACT',
  FieldType.PASSWORD: 'PASSWORD',
  FieldType.SINGLE_PASSWORD: 'SINGLE_PASSWORD',
  FieldType.CITIZENSHIP: 'CITIZENSHIP',
  FieldType.HEADER: 'HEADER',
  FieldType.TEXT_LABEL: 'TEXT_LABEL',
  FieldType.VALIDATION_TEXT: 'VALIDATION_TEXT',
  FieldType.STATE_VALIDATION: 'STATE_VALIDATION',
  FieldType.DEPENDENT_VALIDATION_TEXT: 'DEPENDENT_VALIDATION_TEXT',
  FieldType.SUCCESS_LABEL: 'SUCCESS_LABEL',
  FieldType.DISABLED_DROPDOWN: 'DISABLED_DROPDOWN',
  FieldType.DISABLED_DEPENDENT_VALIDATION_TEXT:
      'DISABLED_DEPENDENT_VALIDATION_TEXT',
  FieldType.CREATE_REGION_BUTTON: 'CREATE_REGION_BUTTON',
  FieldType.TEXT_LIST: 'TEXT_LIST',
  FieldType.BLOCK_COMMON_PASSWORDS: 'BLOCK_COMMON_PASSWORDS',
  FieldType.PICTURE: 'PICTURE',
  FieldType.BOOLEAN: 'BOOLEAN',
};
