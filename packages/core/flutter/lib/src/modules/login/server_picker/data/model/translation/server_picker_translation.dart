import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';

class ServerPickerPageTranslation extends TranslationModel {
  static const String namespaceStatic = ModelNamespaces.ServerPicker;
  const ServerPickerPageTranslation({required super.translationStringList});

  factory ServerPickerPageTranslation.fromModel(TranslationModel model) {
    return ServerPickerPageTranslation(translationStringList: model.translationStringList);
  }

  String get ENTER_SERVER_URL => getTranslation('enterServerURL');
  String get SERVER_URL => getTranslation('serverURL');
  String get CONTINUE_LABEL => getTranslation('continueLabel');
  String get PLEASE_ENTER_A_VALID_SERVER_URL => getTranslation('pleaseEnterAValidServerURL');
  String get REMEMBER_SERVER => getTranslation('rememberServer');
  String get CHOOSE_SERVER => getTranslation('chooseServer');
  String get SELECT_LANGUAGE => getTranslation('selectLanguage');
  String get CANCEL => getTranslation('cancel');
  String get SOMETHING_WENT_WRONG => getTranslation('somethingWentWrong');
  String get PLEASE_TRY_AGAIN_LATER => getTranslation('pleaseTryAgainLater');
  String get NO_INTERNET_CONNECTION => getTranslation('noInternetConnection');
  String get CHECK_CONNECTION_AND_TRY_AGAIN => getTranslation('checkConnectionAndTryAgain');
  String get BACK_TO_SERVER_PICKER => getTranslation('backToServerPicker');
  String get BACK_TO_LOGIN => getTranslation('backToLogin');

  factory ServerPickerPageTranslation.defaultEnglish() => ServerPickerPageTranslation(
    translationStringList: {
      'enterServerURL': 'Enter server URL',
      'serverURL': 'Server URL',
      'continueLabel': 'Continue',
      'pleaseEnterAValidServerURL': 'Please enter a valid server URL',
      'rememberServer': 'Remember server',
      'chooseServer': 'Choose server',
      'selectLanguage': 'Select language',
      'cancel': 'Cancel',
      'somethingWentWrong': 'Something went wrong',
      'pleaseTryAgainLater': 'Please try again later.',
      'noInternetConnection': 'No internet connection',
      'checkConnectionAndTryAgain': 'Check your connection and try again.',
      'backToServerPicker': 'Back to server picker',
      'backToLogin': 'Back to login',
    },
  );

  factory ServerPickerPageTranslation.defaultGerman() => ServerPickerPageTranslation(
    translationStringList: {
      'enterServerURL': 'Server-URL eingeben',
      'serverURL': 'Server-URL',
      'continueLabel': 'Weiter',
      'pleaseEnterAValidServerURL': 'Bitte geben Sie eine gültige Server-URL ein',
      'rememberServer': 'Server merken',
      'chooseServer': 'Server auswählen',
      'selectLanguage': 'Sprache auswählen',
      'cancel': 'Abbrechen',
      'somethingWentWrong': 'Etwas ist schiefgelaufen',
      'pleaseTryAgainLater': 'Bitte versuchen Sie es später erneut.',
      'noInternetConnection': 'Keine Internetverbindung',
      'checkConnectionAndTryAgain': 'Überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
      'backToServerPicker': 'Zurück zur Server-Auswahl',
      'backToLogin': 'Zurück zur Anmeldung',
    },
  );

  @override
  String get namespace => namespaceStatic;
}
