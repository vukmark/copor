// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'preferences_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PreferencesModel _$PreferencesModelFromJson(Map<String, dynamic> json) =>
    PreferencesModel(
      themeMode: const ThemeModeConverter().fromJson(
        (json['themeMode'] as num).toInt(),
      ),
      contrastMode: $enumDecode(_$ContrastModeEnumMap, json['contrast']),
      contactPrivacy: ContactPrivacyModel.fromJson(
        json['contactPrivacy'] as Map<String, dynamic>,
      ),
      authentication: AuthenticationTypeModel.fromJson(
        json['authentication'] as Map<String, dynamic>,
      ),
      colorSet: $enumDecode(_$ColorSetEnumMap, json['colorSet']),
      fontSize: $enumDecode(_$FontSizeEnumMap, json['fontSize']),
      useIcons: json['useIcons'] as bool,
      language: json['language'] as String,
      actionFeedbackDuration: $enumDecode(
        _$ActionFeedbackDurationEnumMap,
        json['actionFeedbackDuration'],
      ),
      fontWeight: $enumDecode(_$AppFontWeightEnumMap, json['fontWeight']),
      maxImageSize: (json['maxImageSize'] as num?)?.toInt() ?? 1,
      modulePreferences:
          (json['modulePreferences'] as Map<String, dynamic>?)?.map(
            (k, e) => MapEntry(k, e as bool),
          ) ??
          {},
      moduleConfig: json['moduleConfig'] as Map<String, dynamic>? ?? {},
    );

Map<String, dynamic> _$PreferencesModelToJson(PreferencesModel instance) =>
    <String, dynamic>{
      'themeMode': const ThemeModeConverter().toJson(instance.themeMode),
      'contrast': _$ContrastModeEnumMap[instance.contrastMode]!,
      'contactPrivacy': instance.contactPrivacy.toJson(),
      'authentication': instance.authentication.toJson(),
      'colorSet': _$ColorSetEnumMap[instance.colorSet]!,
      'fontSize': _$FontSizeEnumMap[instance.fontSize]!,
      'useIcons': instance.useIcons,
      'language': instance.language,
      'actionFeedbackDuration':
          _$ActionFeedbackDurationEnumMap[instance.actionFeedbackDuration]!,
      'fontWeight': _$AppFontWeightEnumMap[instance.fontWeight]!,
      'maxImageSize': instance.maxImageSize,
      'modulePreferences': instance.modulePreferences,
      'moduleConfig': instance.moduleConfig,
    };

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
