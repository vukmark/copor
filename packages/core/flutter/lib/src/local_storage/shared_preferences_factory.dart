import 'dart:convert';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/preferences/data/model/preferences_model.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/login/server_picker/data/model/translation/server_picker_translation.dart';
import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesFactory {
  static final SharedPreferencesFactory _instance = SharedPreferencesFactory._internal();
  factory SharedPreferencesFactory() => _instance;
  SharedPreferencesFactory._internal();

  late KeyGenerator _keyGenerator;
  SharedPreferences? _prefs;
  bool _initialized = false;

  Future<void> initialize(KeyGenerator keyGenerator) async {
    if (_initialized) return;

    _keyGenerator = keyGenerator;
    _prefs = await SharedPreferences.getInstance();
    await _clearSharedPreferencesOnUpdate(_prefs!);
    await _initializeDefaultConfig(_prefs!);
    await _initializeDefaultLocales(_prefs!);
    await _initializeDefaultLanguages(_prefs!);
    /*
    await _initializeEmptyTokens(_prefs!);
*/
    await _initializeDefaultPreferences(_prefs!);
    _initialized = true;
  }

  SharedPreferences getSharedPreferences() {
    if (!_initialized) {
      throw Exception("SharedPreferencesFactory must be initialized before use.");
    }
    return _prefs!;
  }

  Future<void> _clearSharedPreferencesOnUpdate(SharedPreferences prefs) async {
    final packageInfo = await PackageInfo.fromPlatform();

    final storedVersion = prefs.getString('currentAppVersion');
    final currentVersion = packageInfo.version;

    if (storedVersion == null || storedVersion != currentVersion) {
      await prefs.clear();
      await prefs.setString('currentAppVersion', currentVersion);
    }
  }

  Future<void> _initializeDefaultConfig(SharedPreferences prefs) async {
    final packageInfo = await PackageInfo.fromPlatform();
    final version = packageInfo.version;
    final configKey = _keyGenerator.generateKey(ConfigModel.namespaceStatic, null);
    if (!prefs.containsKey(configKey)) {
      final defaultConfig = ConfigModel.defaultConfig(version: version);
      final success = await prefs.setString(configKey, json.encode(defaultConfig));
      if (!success) {
        throw Exception("Failed to initialize default config in SharedPreferences");
      }
    }
  }

  Future<void> _initializeDefaultPreferences(SharedPreferences prefs) async {
    final preferencesKey = _keyGenerator.generateKey(PreferencesModel.namespaceStatic, null);
    if (!prefs.containsKey(preferencesKey)) {
      final defaultPreferences = PreferencesModel.defaultPreferences();
      final success = await prefs.setString(preferencesKey, json.encode(defaultPreferences));
      if (!success) {
        throw Exception("Failed to initialize default config in SharedPreferences");
      }
    }
  }

  Future<void> _initializeDefaultLanguages(SharedPreferences prefs) async {
    final languageListKey = _keyGenerator.generateKey(LanguageModel.namespaceStatic, null);
    if (!prefs.containsKey(languageListKey)) {
      final defaultPreferences = [LanguageModel.defaultEnglish(), LanguageModel.defaultGerman()];
      final success = await prefs.setString(languageListKey, json.encode(defaultPreferences));
      if (!success) {
        throw Exception("Failed to initialize default config in SharedPreferences");
      }
    }
  }

  /*
  Future<void> _initializeEmptyTokens(SharedPreferences prefs) async {
    final authorizationTokensKey = _keyGenerator.generateKey(
        AuthorizationTokensModel.namespaceStatic, null);
    if (!prefs.containsKey(authorizationTokensKey)) {
      final emptyTokens = AuthorizationTokensModel.emptyTokens();
      final success = await prefs.setString(
          authorizationTokensKey, json.encode(emptyTokens));
      if (!success) {
        throw Exception(
            "Failed to initialize default config in SharedPreferences");
      }
    }
  }
*/

  Future<void> _initializeDefaultLocales(SharedPreferences prefs) async {
    final List<MapEntry<TranslationModel, String>> defaultTranslations = [
      MapEntry(ServerPickerPageTranslation.defaultEnglish(), 'en'),
      MapEntry(ServerPickerPageTranslation.defaultGerman(), 'de'),
      MapEntry(CommonTranslation.defaultEnglish(), 'en'),
      MapEntry(CommonTranslation.defaultGerman(), 'de'),
    ];

    for (final entry in defaultTranslations) {
      final model = entry.key;
      final languageCode = entry.value;
      final translationKey = _keyGenerator.generateKey(model.namespace, languageCode);
      if (!prefs.containsKey(translationKey)) {
        final success = await prefs.setString(translationKey, json.encode(model));
        if (!success) {
          throw Exception("Failed to initialize default translation for key: $translationKey");
        }
      }
    }
  }
}
