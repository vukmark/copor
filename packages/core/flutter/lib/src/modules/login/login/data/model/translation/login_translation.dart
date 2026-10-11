import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';

class LoginPageTranslation extends TranslationModel {
  static const String namespaceStatic = ModelNamespaces.Login;

  const LoginPageTranslation({required super.translationStringList});

  factory LoginPageTranslation.fromModel(TranslationModel model) {
    return LoginPageTranslation(translationStringList: model.translationStringList);
  }
  String get SUBMIT => getTranslation('SUBMIT');
  String get USERNAME => getTranslation('USERNAME');
  String get PASSWORD => getTranslation('PASSWORD');
  String get WELCOME_BACK => getTranslation('WELCOME_BACK');
  String get PLEASE_SIGN_IN_TO_CONTINUE => getTranslation('PLEASE_SIGN_IN_TO_CONTINUE');
  String get SELECT_LANGUAGE => getTranslation('SELECT_LANGUAGE');
  String get ENGLISH => getTranslation('ENGLISH');
  String get GERMAN => getTranslation('GERMAN');
  String get REMEMBER_ME => getTranslation('REMEMBER_ME');
  String get FORGOT_PASSWORD => getTranslation('FORGOT_PASSWORD');
  String get FORGOT_PASSWORD_TITLE => getTranslation('FORGOT_PASSWORD_TITLE');
  String get FORGOT_PASSWORD_USERNAME_MESSAGE => getTranslation('FORGOT_PASSWORD_USERNAME_MESSAGE');
  String get FORGOT_PASSWORD_CODE_TITLE => getTranslation('FORGOT_PASSWORD_CODE_TITLE');
  String get FORGOT_PASSWORD_CODE_SENT_MESSAGE =>
      getTranslation('FORGOT_PASSWORD_CODE_SENT_MESSAGE');
  String get FORGOT_PASSWORD_CODE_EXPIRATION_MESSAGE =>
      getTranslation('FORGOT_PASSWORD_CODE_EXPIRATION_MESSAGE');
  String get VERIFICATION_CODE => getTranslation('VERIFICATION_CODE');
  String get SET_NEW_PASSWORD_TITLE => getTranslation('SET_NEW_PASSWORD_TITLE');
  String get NEW_PASSWORD => getTranslation('NEW_PASSWORD');
  String get PASSWORDS_DO_NOT_MATCH => getTranslation('PASSWORDS_DO_NOT_MATCH');
  String get PASSWORD_REGEX_MESSAGE => getTranslation('PASSWORD_REGEX_MESSAGE');
  String get PASSWORD_CHANGED_SUCCESSFULLY => getTranslation('PASSWORD_CHANGED_SUCCESSFULLY');
  String get CONTINUE => getTranslation('CONTINUE');
  String get BACK => getTranslation('BACK');
  String get REGISTER => getTranslation('REGISTER');
  String get LOGIN => getTranslation('LOGIN');
  String get PLEASE_ENTER_YOUR_USERNAME => getTranslation('PLEASE_ENTER_YOUR_USERNAME');
  String get PLEASE_ENTER_YOUR_PASSWORD => getTranslation('PLEASE_ENTER_YOUR_PASSWORD');
  String get CHANGE_SERVER_URL => getTranslation('CHANGE_SERVER_URL');
  String get INCORRECT_USERNAME_OR_PASSWORD => getTranslation('INCORRECT_USERNAME_OR_PASSWORD');
  String get CONTACT_MANAGER => getTranslation('CONTACT_MANAGER');
  String get MESSAGE => getTranslation('MESSAGE');
  String get EMAIL_ADDRESS => getTranslation('EMAIL_ADDRESS');
  String get CANCEL => getTranslation('CANCEL');
  String get SEND => getTranslation('SEND');
  String get YOU_HAVE_BEEN_LOGGED_OUT => getTranslation('YOU_HAVE_BEEN_LOGGED_OUT');
  String get LOG_IN_AGAIN => getTranslation('LOG_IN_AGAIN');
  String get REGISTRATION => getTranslation('REGISTRATION');
  String get CONFIRM => getTranslation('CONFIRM');
  String get USER_ROLE => getTranslation('USER_ROLE');
  String get USER_GROUP => getTranslation('USER_GROUP');
  String get CONFIRM_PASSWORD => getTranslation('CONFIRM_PASSWORD');
  String get PERSONAL_INFORMATION => getTranslation('PERSONAL_INFORMATION');
  String get FIRST_NAME => getTranslation('FIRST_NAME');
  String get LAST_NAME => getTranslation('LAST_NAME');
  String get NICKNAME => getTranslation('NICKNAME');
  String get GENDER => getTranslation('GENDER');
  String get MALE => getTranslation('MALE');
  String get FEMALE => getTranslation('FEMALE');
  String get OTHER => getTranslation('OTHER');
  String get DATE_OF_BIRTH => getTranslation('DATE_OF_BIRTH');
  String get CONTACT_INFORMATION => getTranslation('CONTACT_INFORMATION');
  String get ADDRESS => getTranslation('ADDRESS');
  String get ADDRESS_EXTENDED => getTranslation('ADDRESS_EXTENDED');
  String get CITY => getTranslation('CITY');
  String get POSTAL_CODE => getTranslation('POSTAL_CODE');
  String get STATE => getTranslation('STATE');
  String get COUNTRY => getTranslation('COUNTRY');
  String get CITIZENSHIP => getTranslation('CITIZENSHIP');
  String get PHONE_HOME => getTranslation('PHONE_HOME');
  String get PHONE_MOBILE => getTranslation('PHONE_MOBILE');
  String get PHONE_ALTERNATIVE => getTranslation('PHONE_ALTERNATIVE');
  String get AGREE_TO_TERMS => getTranslation('AGREE_TO_TERMS');
  String get AGREE_TO_PRIVACY => getTranslation('AGREE_TO_PRIVACY');
  String get SUBMIT_REGISTRATION => getTranslation('SUBMIT_REGISTRATION');
  String get TERMS_AND_CONDITIONS => getTranslation('TERMS_AND_CONDITIONS');
  String get PRIVACY_POLICY => getTranslation('PRIVACY_POLICY');
  String get INVALID_REG_CODE_SNACK_BAR => getTranslation('INVALID_REG_CODE_SNACK_BAR');
  String get ERROR_OCCURRED => getTranslation('ERROR_OCCURRED');
  String get REGISTRATION_FAILED => getTranslation('REGISTRATION_FAILED');
  String get AGREE => getTranslation('AGREE');
  String get ROLE => getTranslation('ROLE');
  String get MORE => getTranslation('MORE');
  String get LESS => getTranslation('LESS');
  String get PLEASE_ENTER_VALID_EMAIL => getTranslation('PLEASE_ENTER_VALID_EMAIL');
  String get OPEN_ACCOUNT_BUTTON_HEADER => getTranslation('OPEN_ACCOUNT_BUTTON_HEADER');
  String get TENANT_ADMINISTRATOR => getTranslation('TENANT_ADMINISTRATOR');
  String get ACTIVATE_TENANT => getTranslation('ACTIVATE_TENANT');
  String get ACTIVATE_TENANT_EXPLANATION => getTranslation('ACTIVATE_TENANT_EXPLANATION');
  String get OPEN_ACCOUNT => getTranslation('OPEN_ACCOUNT');
  String get SUPPORT => getTranslation('SUPPORT');
  String get DOCUMENTS => getTranslation('DOCUMENTS');
  String get IMPRESSUM => getTranslation('IMPRESSUM');
  String get OPEN_ACCOUNT_EXPLANATION => getTranslation('OPEN_ACCOUNT_EXPLANATION');
  String get CHAT_FOR_HELP_EXPLANATION => getTranslation('CHAT_FOR_HELP_EXPLANATION');
  String get CAPS_LOCK_ON_MESSAGE => getTranslation('CAPS_LOCK_ON_MESSAGE');

  @override
  String get namespace => namespaceStatic;
}
