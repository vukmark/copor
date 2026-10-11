import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';

/// Strings for self-registration; the tenant-activation page shares this namespace.
class RegistrationPageTranslation extends TranslationModel {
  static const String namespaceStatic = ModelNamespaces.Registration;

  const RegistrationPageTranslation({required super.translationStringList});

  factory RegistrationPageTranslation.fromModel(TranslationModel model) {
    return RegistrationPageTranslation(translationStringList: model.translationStringList);
  }

  String get TENANT_ACTIVATION => getTranslation('TENANT_ACTIVATION');
  String get TENANT_ACTIVATION_TITLE => getTranslation('TENANT_ACTIVATION_TITLE');
  String get TENANT_ACTIVATION_WELCOME_TITLE => getTranslation('TENANT_ACTIVATION_WELCOME_TITLE');
  String get TENANT_ACTIVATION_WELCOME_INTRO => getTranslation('TENANT_ACTIVATION_WELCOME_INTRO');

  String get CONTINUE => getTranslation('CONTINUE');
  String get CANCEL => getTranslation('CANCEL');
  String get BACK => getTranslation('BACK');
  String get CREATE_AN_ACCOUNT => getTranslation('CREATE_AN_ACCOUNT');
  String get FIRST_NAME => getTranslation('FIRST_NAME');
  String get LAST_NAME => getTranslation('LAST_NAME');
  String get EMAIL => getTranslation('EMAIL');
  String get USERNAME => getTranslation('USERNAME');
  String get USERNAME_HINT => getTranslation('USERNAME_HINT');
  String get PASSWORD => getTranslation('PASSWORD');
  String get CONFIRM_PASSWORD => getTranslation('CONFIRM_PASSWORD');
  String get PASSWORDS_DO_NOT_MATCH => getTranslation('PASSWORDS_DO_NOT_MATCH');
  String get VERIFY_EMAIL_TITLE => getTranslation('VERIFY_EMAIL_TITLE');
  String get VERIFICATION_CODE_SENT_MESSAGE => getTranslation('VERIFICATION_CODE_SENT_MESSAGE');
  String get VERIFICATION_CODE_EXPIRATION_MESSAGE =>
      getTranslation('VERIFICATION_CODE_EXPIRATION_MESSAGE');
  String get VERIFICATION_CODE => getTranslation('VERIFICATION_CODE');
  String get VERIFY => getTranslation('VERIFY');
  String get RESEND_CODE => getTranslation('RESEND_CODE');
  String get CODE_RESENT => getTranslation('CODE_RESENT');
  String get REGISTRATION_SUCCESSFUL => getTranslation('REGISTRATION_SUCCESSFUL');

  @override
  String get namespace => namespaceStatic;
}
