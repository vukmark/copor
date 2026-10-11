// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'update_preferences_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UpdatePreferencesDTO _$UpdatePreferencesDTOFromJson(
  Map<String, dynamic> json,
) => UpdatePreferencesDTO(
  themeMode: _$JsonConverterFromJson<int, ThemeMode>(
    json['themeMode'],
    const ThemeModeConverter().fromJson,
  ),
  contrast: $enumDecodeNullable(_$ContrastModeEnumMap, json['contrast']),
  colorSet: $enumDecodeNullable(_$ColorSetEnumMap, json['colorSet']),
  contactPrivacy: json['contactPrivacy'] == null
      ? null
      : ContactPrivacyModel.fromJson(
          json['contactPrivacy'] as Map<String, dynamic>,
        ),
  authentication: json['authentication'] == null
      ? null
      : AuthenticationTypeModel.fromJson(
          json['authentication'] as Map<String, dynamic>,
        ),
  fontSize: $enumDecodeNullable(_$FontSizeEnumMap, json['fontSize']),
  useIcons: json['useIcons'] as bool?,
  language: json['language'] as String?,
  actionFeedbackDuration: $enumDecodeNullable(
    _$ActionFeedbackDurationEnumMap,
    json['actionFeedbackDuration'],
  ),
  fontWeight: $enumDecodeNullable(_$AppFontWeightEnumMap, json['fontWeight']),
  modulePreferences: (json['modulePreferences'] as Map<String, dynamic>?)?.map(
    (k, e) => MapEntry(k, e as bool),
  ),
);

Map<String, dynamic> _$UpdatePreferencesDTOToJson(
  UpdatePreferencesDTO instance,
) => <String, dynamic>{
  'themeMode': ?_$JsonConverterToJson<int, ThemeMode>(
    instance.themeMode,
    const ThemeModeConverter().toJson,
  ),
  'contrast': ?_$ContrastModeEnumMap[instance.contrast],
  'colorSet': ?_$ColorSetEnumMap[instance.colorSet],
  'contactPrivacy': ?instance.contactPrivacy,
  'authentication': ?instance.authentication,
  'fontSize': ?_$FontSizeEnumMap[instance.fontSize],
  'useIcons': ?instance.useIcons,
  'language': ?instance.language,
  'actionFeedbackDuration':
      ?_$ActionFeedbackDurationEnumMap[instance.actionFeedbackDuration],
  'fontWeight': ?_$AppFontWeightEnumMap[instance.fontWeight],
  'modulePreferences': ?instance.modulePreferences,
};

Value? _$JsonConverterFromJson<Json, Value>(
  Object? json,
  Value? Function(Json json) fromJson,
) => json == null ? null : fromJson(json as Json);

const _$ContrastModeEnumMap = {
  ContrastMode.auto: 0,
  ContrastMode.normal: 1,
  ContrastMode.high: 2,
};

const _$ColorSetEnumMap = {
  ColorSet.SET22: 'SET22',
  ColorSet.SET18: 'SET18',
  ColorSet.SET9: 'SET9',
  ColorSet.SET5: 'SET5',
};

const _$FontSizeEnumMap = {
  FontSize.xs: 'XS',
  FontSize.sm: 'SM',
  FontSize.normal: 'NORMAL',
  FontSize.lg: 'LG',
  FontSize.xl: 'XL',
  FontSize.xxl: 'XXL',
};

const _$ActionFeedbackDurationEnumMap = {
  ActionFeedbackDuration.off: 'OFF',
  ActionFeedbackDuration.fiveSeconds: 'FIVE_SECONDS',
  ActionFeedbackDuration.twentySeconds: 'TWENTY_SECONDS',
};

const _$AppFontWeightEnumMap = {
  AppFontWeight.light: 'LIGHT',
  AppFontWeight.normal: 'NORMAL',
  AppFontWeight.bold: 'BOLD',
};

Json? _$JsonConverterToJson<Json, Value>(
  Value? value,
  Json? Function(Value value) toJson,
) => value == null ? null : toJson(value);
