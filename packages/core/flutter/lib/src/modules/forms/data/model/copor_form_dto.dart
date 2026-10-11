import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_model_dto.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'copor_form_dto.g.dart';

enum FieldType {
  @JsonValue("TEXT")
  TEXT,
  @JsonValue("TEXTBOX")
  TEXTBOX,
  @JsonValue("HTML_TEXT")
  HTML_TEXT,
  @JsonValue("EMAIL")
  EMAIL,
  @JsonValue("DATE")
  DATE,
  @JsonValue("DATE_TIME")
  DATE_TIME,
  @JsonValue("DROPDOWN")
  DROPDOWN,
  @JsonValue("MULTISELECT")
  MULTISELECT,
  @JsonValue("COLOR")
  COLOR,
  @JsonValue("CONTENT_ITEM")
  CONTENT_ITEM,
  @JsonValue("ROLE_MULTISELECT")
  ROLE_MULTISELECT,
  @JsonValue("COUNTRY")
  COUNTRY,
  @JsonValue("STATE")
  STATE,
  @JsonValue("NUMBER")
  NUMBER,
  @JsonValue("DOUBLE")
  DOUBLE,
  @JsonValue("DIVIDER")
  DIVIDER,
  @JsonValue("HIDDEN")
  HIDDEN,
  @JsonValue("SIZEDBOX")
  SIZEDBOX,
  @JsonValue("PHONE_NUMBER_LIST")
  PHONE_NUMBER_LIST,
  @JsonValue("SEARCHABLE_DROPDOWN")
  SEARCHABLE_DROPDOWN,
  @JsonValue("SEARCHABLE_MULTISELECT")
  SEARCHABLE_MULTISELECT,
  @JsonValue("RANGE_SEARCHABLE_MULTISELECT")
  RANGE_SEARCHABLE_MULTISELECT,
  @JsonValue("DISABLED_TEXT")
  DISABLED_TEXT,
  @JsonValue("CONTRACT")
  CONTRACT,
  @JsonValue("PASSWORD")
  PASSWORD,
  @JsonValue("SINGLE_PASSWORD")
  SINGLE_PASSWORD,
  @JsonValue("CITIZENSHIP")
  CITIZENSHIP,
  @JsonValue("HEADER")
  HEADER,
  @JsonValue("TEXT_LABEL")
  TEXT_LABEL,
  @JsonValue("VALIDATION_TEXT")
  VALIDATION_TEXT,
  @JsonValue('STATE_VALIDATION')
  STATE_VALIDATION,
  @JsonValue('DEPENDENT_VALIDATION_TEXT')
  DEPENDENT_VALIDATION_TEXT,
  @JsonValue('SUCCESS_LABEL')
  SUCCESS_LABEL,
  @JsonValue('DISABLED_DROPDOWN')
  DISABLED_DROPDOWN,
  @JsonValue('DISABLED_DEPENDENT_VALIDATION_TEXT')
  DISABLED_DEPENDENT_VALIDATION_TEXT,
  @JsonValue('CREATE_REGION_BUTTON')
  CREATE_REGION_BUTTON,
  @JsonValue('TEXT_LIST')
  TEXT_LIST,
  @JsonValue('BLOCK_COMMON_PASSWORDS')
  BLOCK_COMMON_PASSWORDS,
  @JsonValue('PICTURE')
  PICTURE,
  @JsonValue('BOOLEAN')
  BOOLEAN,
}

enum TenantActivationCheckStatus {
  @JsonValue('INVALID')
  INVALID,
  @JsonValue('NOT_BASE_TENANT')
  NOT_BASE_TENANT,
  @JsonValue('ALREADY_ACTIVATED')
  ALREADY_ACTIVATED,
  @JsonValue('NOT_ACTIVATED')
  NOT_ACTIVATED,
  @JsonValue('FOUND')
  FOUND,
}

@JsonSerializable()
class FieldValue {
  bool? isSuccess;
  ColorFieldDTO? color;
  bool? checkbox;
  String? text;
  String? date;
  List<NamedIdModel>? dropdown;
  double? doubleNumber;
  int? number;
  List<StateModelDTO>? stateList;
  List<PhoneNumberDTO>? phoneNumberList;
  SimpleListKey? searchableDropdown;
  SimpleListKey? searchableMultiselect;
  SimpleListKey? rangeSearchableMultiselect;
  ContractValueDTO? contract;
  int? triggerLength;
  List<int>? triggerLengths;
  int? maxLength;
  String? validationEndpoint;
  TenantActivationCheckStatus? checkStatus;
  String? checkStatusMessage;
  List<String>? textList;
  String? picture;
  String? uploadEndpoint;

  FieldValue({
    this.text,
    this.date,
    this.color,
    this.dropdown,
    this.number,
    this.doubleNumber,
    this.stateList,
    this.checkbox,
    this.phoneNumberList,
    this.searchableDropdown,
    this.searchableMultiselect,
    this.rangeSearchableMultiselect,
    this.contract,
    this.triggerLength,
    this.triggerLengths,
    this.maxLength,
    this.validationEndpoint,
    this.checkStatus,
    this.checkStatusMessage,
    this.textList,
    this.picture,
    this.uploadEndpoint,
  });

  FieldValue copyWith({
    bool? isSuccess,
    ColorFieldDTO? color,
    bool? checkbox,
    String? text,
    String? date,
    List<NamedIdModel>? dropdown,
    double? doubleNumber,
    int? number,
    List<StateModelDTO>? stateList,
    List<PhoneNumberDTO>? phoneNumberList,
    SimpleListKey? searchableDropdown,
    SimpleListKey? searchableMultiselect,
    SimpleListKey? rangeSearchableMultiselect,
    ContractValueDTO? contract,
    int? triggerLength,
    List<int>? triggerLengths,
    int? maxLength,
    String? validationEndpoint,
    TenantActivationCheckStatus? checkStatus,
    String? checkStatusMessage,
    List<String>? textList,
    String? picture,
    String? uploadEndpoint,
  }) {
    return FieldValue(
      text: text ?? this.text,
      date: date ?? this.date,
      color: color ?? this.color,
      dropdown: dropdown ?? this.dropdown,
      number: number ?? this.number,
      doubleNumber: doubleNumber ?? this.doubleNumber,
      stateList: stateList ?? this.stateList,
      checkbox: checkbox ?? this.checkbox,
      phoneNumberList: phoneNumberList ?? this.phoneNumberList,
      searchableDropdown: searchableDropdown ?? this.searchableDropdown,
      searchableMultiselect: searchableMultiselect ?? this.searchableMultiselect,
      rangeSearchableMultiselect: rangeSearchableMultiselect ?? this.rangeSearchableMultiselect,
      contract: contract ?? this.contract,
      triggerLength: triggerLength ?? this.triggerLength,
      triggerLengths: triggerLengths ?? this.triggerLengths,
      maxLength: maxLength ?? this.maxLength,
      validationEndpoint: validationEndpoint ?? this.validationEndpoint,
      checkStatus: checkStatus ?? this.checkStatus,
      checkStatusMessage: checkStatusMessage ?? this.checkStatusMessage,
      textList: textList ?? this.textList,
      picture: picture ?? this.picture,
      uploadEndpoint: uploadEndpoint ?? this.uploadEndpoint,
    )..isSuccess = isSuccess ?? this.isSuccess;
  }

  factory FieldValue.fromJson(Map<String, dynamic> json) => _$FieldValueFromJson(json);

  Map<String, dynamic> toJson() => _$FieldValueToJson(this);
}

@JsonSerializable()
class SimpleListKey {
  final String key;
  final List<FilterModelDTO>? filters;

  SimpleListKey({required this.key, this.filters});

  factory SimpleListKey.empty() => SimpleListKey(key: '');

  factory SimpleListKey.fromJson(JSON json) => _$SimpleListKeyFromJson(json);

  SimpleListKey copyWith({String? key, List<FilterModelDTO>? filters}) {
    return SimpleListKey(key: key ?? this.key, filters: filters ?? this.filters);
  }
}

@JsonSerializable()
class ColorFieldDTO {
  final ColorSet colorSet;
  final int color;

  ColorFieldDTO({required this.colorSet, required this.color});

  factory ColorFieldDTO.empty() => ColorFieldDTO(colorSet: ColorSet.SET22, color: 21);

  factory ColorFieldDTO.fromJson(JSON json) => _$ColorFieldDTOFromJson(json);

  ColorFieldDTO copyWith({int? color, ColorSet? colorSet}) {
    return ColorFieldDTO(color: color ?? this.color, colorSet: colorSet ?? this.colorSet);
  }
}

@JsonSerializable()
class ContractValueDTO {
  final String? contractType;
  final bool accepted;
  final String? contractRoute;
  final String? iconMessage;

  const ContractValueDTO({
    this.contractType,
    required this.accepted,
    this.contractRoute,
    this.iconMessage,
  });

  factory ContractValueDTO.fromJson(JSON json) => _$ContractValueDTOFromJson(json);

  Map<String, dynamic> toJson() => _$ContractValueDTOToJson(this);

  ContractValueDTO copyWith({
    String? contractType,
    bool? accepted,
    String? contractRoute,
    String? iconMessage,
  }) {
    return ContractValueDTO(
      contractType: contractType ?? this.contractType,
      accepted: accepted ?? this.accepted,
      contractRoute: contractRoute ?? this.contractRoute,
      iconMessage: iconMessage ?? this.iconMessage,
    );
  }
}

enum PhoneNumberType {
  @JsonValue("PHONE_MOBILE")
  PHONE_MOBILE,
  @JsonValue("PHONE_HOME")
  PHONE_HOME,
  @JsonValue("PHONE_WORK")
  PHONE_WORK,
  @JsonValue("PHONE_OTHER")
  PHONE_OTHER,
}

@JsonSerializable()
class PhoneNumberDTO {
  final String? id;
  final String phoneNumber;
  final PhoneNumberType phoneNumberType;

  PhoneNumberDTO({this.id, required this.phoneNumber, required this.phoneNumberType});

  factory PhoneNumberDTO.fromJson(JSON json) => _$PhoneNumberDTOFromJson(json);

  Map<String, dynamic> toJson() => _$PhoneNumberDTOToJson(this);
}

@JsonSerializable()
class StateModelDTO {
  final String name;
  final String id;
  final String code;

  StateModelDTO({required this.name, required this.id, required this.code});

  factory StateModelDTO.empty() => StateModelDTO(name: '', id: '', code: '');

  factory StateModelDTO.fromJson(JSON json) => _$StateModelDTOFromJson(json);
}

@JsonSerializable()
class CoporFormDTO {
  final List<CoporFormFieldDTO> fields;
  final String endpoint;

  CoporFormDTO({required this.fields, required this.endpoint});

  CoporFormDTO copyWith({List<CoporFormFieldDTO>? fields, String? endpoint}) {
    return CoporFormDTO(fields: fields ?? this.fields, endpoint: endpoint ?? this.endpoint);
  }

  factory CoporFormDTO.fromJson(JSON json) => _$CoporFormDTOFromJson(json);

  Map<String, dynamic> toJson() => _$CoporFormDTOToJson(this);
}

@JsonSerializable()
class CoporFormFieldDTO {
  final FieldType type;
  final String label;
  final String name;
  final FieldValue currentValue;
  final String? requiredMessage;
  final List<NamedIdModel<dynamic>>? values;

  CoporFormFieldDTO({
    required this.type,
    required this.label,
    required this.currentValue,
    this.requiredMessage,
    required this.name,
    this.values,
  });

  factory CoporFormFieldDTO.fromJson(JSON json) {
    return _$CoporFormFieldDTOFromJson(json);
  }

  Map<String, dynamic> toJson() => _$CoporFormFieldDTOToJson(this);
}
