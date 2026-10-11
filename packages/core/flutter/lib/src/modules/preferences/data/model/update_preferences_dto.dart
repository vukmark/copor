import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/preferences/data/model/authentication_type_model.dart';
import 'package:copor_core/src/modules/preferences/data/model/contact_privacy_model.dart';
import 'package:copor_core/src/modules/preferences/data/model/preferences_model.dart';
import 'package:copor_core/src/modules/preferences/data/model/utils/theme_mode_converter.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

part 'update_preferences_dto.g.dart';

@JsonSerializable(includeIfNull: false)
class UpdatePreferencesDTO {
  @ThemeModeConverter()
  final ThemeMode? themeMode;
  final ContrastMode? contrast;
  final ColorSet? colorSet;
  final ContactPrivacyModel? contactPrivacy;
  final AuthenticationTypeModel? authentication;
  final FontSize? fontSize;
  final bool? useIcons;
  final String? language;
  final ActionFeedbackDuration? actionFeedbackDuration;
  final AppFontWeight? fontWeight;

  /// Module preferences to save (`<module>.<name>` → on/off); others keep
  /// their value on the server.
  final Map<String, bool>? modulePreferences;

  UpdatePreferencesDTO({
    this.themeMode,
    this.contrast,
    this.colorSet,
    this.contactPrivacy,
    this.authentication,
    this.fontSize,
    this.useIcons,
    this.language,
    this.actionFeedbackDuration,
    this.fontWeight,
    this.modulePreferences,
  });

  factory UpdatePreferencesDTO.empty() => UpdatePreferencesDTO(
    themeMode: ThemeMode.system,
    contrast: ContrastMode.auto,
    colorSet: ColorSet.SET22,
    contactPrivacy: ContactPrivacyModel.defaultContactPrivacy(),
    authentication: AuthenticationTypeModel.defaultAuthenticationType(),
    fontSize: FontSize.normal,
    useIcons: false,
    language: LanguageModel.defaultGerman().id,
    actionFeedbackDuration: ActionFeedbackDuration.off,
    fontWeight: AppFontWeight.normal,
  );

  factory UpdatePreferencesDTO.fromModel(PreferencesModel model) {
    return UpdatePreferencesDTO(
      themeMode: model.themeMode,
      contrast: model.contrastMode,
      contactPrivacy: model.contactPrivacy,
      authentication: model.authentication,
      colorSet: model.colorSet,
      fontSize: model.fontSize,
      useIcons: false,
      language: model.language,
      actionFeedbackDuration: model.actionFeedbackDuration,
      fontWeight: model.fontWeight,
      modulePreferences: model.modulePreferences,
    );
  }

  UpdatePreferencesDTO copyWith({
    ThemeMode? themeMode,
    ContrastMode? contrast,
    ColorSet? colorSet,
    ContactPrivacyModel? contactPrivacy,
    AuthenticationTypeModel? authentication,
    FontSize? fontSize,
    bool? useIcons,
    String? language,
    ActionFeedbackDuration? actionFeedbackDuration,
    AppFontWeight? fontWeight,
    Map<String, bool>? modulePreferences,
  }) {
    return UpdatePreferencesDTO(
      themeMode: themeMode ?? this.themeMode,
      contrast: contrast ?? this.contrast,
      colorSet: colorSet ?? this.colorSet,
      contactPrivacy: contactPrivacy ?? this.contactPrivacy,
      authentication: authentication ?? this.authentication,
      fontSize: fontSize ?? this.fontSize,
      useIcons: useIcons ?? this.useIcons,
      language: language ?? this.language,
      actionFeedbackDuration: actionFeedbackDuration ?? this.actionFeedbackDuration,
      fontWeight: fontWeight ?? this.fontWeight,
      modulePreferences: modulePreferences ?? this.modulePreferences,
    );
  }

  factory UpdatePreferencesDTO.fromJson(Map<String, dynamic> json) =>
      _$UpdatePreferencesDTOFromJson(json);

  Map<String, dynamic> toJson() => _$UpdatePreferencesDTOToJson(this);
}
