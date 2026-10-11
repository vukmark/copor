import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/preferences/data/model/authentication_type_model.dart';
import 'package:copor_core/src/modules/preferences/data/model/contact_privacy_model.dart';
import 'package:copor_core/src/modules/preferences/data/model/utils/theme_mode_converter.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

part 'preferences_model.g.dart';

@JsonSerializable(explicitToJson: true)
class PreferencesModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.Preferences;

  @ThemeModeConverter()
  final ThemeMode themeMode;
  @JsonKey(name: 'contrast')
  final ContrastMode contrastMode;
  final ContactPrivacyModel contactPrivacy;
  final AuthenticationTypeModel authentication;
  final ColorSet colorSet;
  final FontSize fontSize;
  final bool useIcons;
  final String language;
  final ActionFeedbackDuration actionFeedbackDuration;
  final AppFontWeight fontWeight;

  /// Core's image upload limit in MB (profile image, form image fields).
  @JsonKey(defaultValue: 1)
  final int maxImageSize;

  /// Every included module's on/off preference, keyed `<module>.<name>`
  /// (e.g. `vu_meet.messagePushNotifications`); a module adds its toggles to
  /// My Account through `CoporModule.preferenceSections`.
  @JsonKey(defaultValue: <String, bool>{})
  final Map<String, bool> modulePreferences;

  /// Settings each module hands the app, per module name (e.g.
  /// `{'cloud': {'maxFileSize': 64}}`). Read-only; never sent back.
  @JsonKey(defaultValue: <String, dynamic>{})
  final Map<String, dynamic> moduleConfig;

  const PreferencesModel({
    required this.themeMode,
    required this.contrastMode,
    required this.contactPrivacy,
    required this.authentication,
    required this.colorSet,
    required this.fontSize,
    required this.useIcons,
    required this.language,
    required this.actionFeedbackDuration,
    required this.fontWeight,
    required this.maxImageSize,
    required this.modulePreferences,
    required this.moduleConfig,
  });

  factory PreferencesModel.defaultPreferences() {
    return PreferencesModel(
      themeMode: ThemeMode.system,
      contrastMode: ContrastMode.normal,
      contactPrivacy: ContactPrivacyModel.defaultContactPrivacy(),
      authentication: AuthenticationTypeModel.defaultAuthenticationType(),
      colorSet: ColorSet.SET22,
      fontSize: FontSize.normal,
      useIcons: false,
      language: LanguageModel.defaultGerman().id,
      actionFeedbackDuration: ActionFeedbackDuration.off,
      fontWeight: AppFontWeight.normal,
      maxImageSize: 1,
      modulePreferences: const {},
      moduleConfig: const {},
    );
  }

  PreferencesModel resetToDefaultsExceptPrivacy() {
    final defaultPrefs = PreferencesModel.defaultPreferences();

    return defaultPrefs.copyWith(
      contactPrivacy: contactPrivacy,
      authentication: authentication,
      modulePreferences: modulePreferences,
      maxImageSize: maxImageSize,
      moduleConfig: moduleConfig,
    );
  }

  /// A module preference's value; on when the server didn't send it.
  bool modulePreference(String key) => modulePreferences[key] ?? true;

  /// A module's upload limit in MB (`moduleConfig.<module>.maxFileSize`), 1
  /// when the module didn't send one.
  int moduleMaxFileSize(String module) {
    final config = moduleConfig[module];
    final maxFileSize = config is Map ? config['maxFileSize'] : null;
    return maxFileSize is num ? maxFileSize.toInt() : 1;
  }

  factory PreferencesModel.fromJson(JSON json) => _$PreferencesModelFromJson(json);

  @override
  JSON toJson() => _$PreferencesModelToJson(this);

  PreferencesModel copyWith({
    ThemeMode? themeMode,
    ContrastMode? contrastMode,
    ContactPrivacyModel? contactPrivacy,
    AuthenticationTypeModel? authentication,
    ColorSet? colorSet,
    FontSize? fontSize,
    bool? useIcons,
    String? language,
    ActionFeedbackDuration? actionFeedbackDuration,
    AppFontWeight? fontWeight,
    int? maxImageSize,
    Map<String, bool>? modulePreferences,
    Map<String, dynamic>? moduleConfig,
  }) {
    return PreferencesModel(
      themeMode: themeMode ?? this.themeMode,
      contrastMode: contrastMode ?? this.contrastMode,
      contactPrivacy: contactPrivacy ?? this.contactPrivacy,
      authentication: authentication ?? this.authentication,
      colorSet: colorSet ?? this.colorSet,
      fontSize: fontSize ?? this.fontSize,
      useIcons: useIcons ?? this.useIcons,
      language: language ?? this.language,
      actionFeedbackDuration: actionFeedbackDuration ?? this.actionFeedbackDuration,
      fontWeight: fontWeight ?? this.fontWeight,
      maxImageSize: maxImageSize ?? this.maxImageSize,
      modulePreferences: modulePreferences ?? this.modulePreferences,
      moduleConfig: moduleConfig ?? this.moduleConfig,
    );
  }

  @override
  List<Object?> get props => [
    themeMode,
    contrastMode,
    contactPrivacy,
    authentication,
    colorSet,
    fontSize,
    useIcons,
    language,
    actionFeedbackDuration,
    fontWeight,
    maxImageSize,
    modulePreferences,
    moduleConfig,
  ];

  @override
  String get namespace => namespaceStatic;
}
