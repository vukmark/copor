import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_contacts/src/config/contact_name_spaces.dart';

class ContactPageTranslation extends TranslationModel {
  static const String namespaceStatic = ContactNamespaces.Contact;

  const ContactPageTranslation({required super.translationStringList});

  factory ContactPageTranslation.fromModel(TranslationModel model) {
    return ContactPageTranslation(translationStringList: model.translationStringList);
  }

  String get CONTACT => getTranslation('CONTACT');
  String get CONTACTS => getTranslation('CONTACTS');
  String get SEARCH_CONTACT => getTranslation('SEARCH_CONTACT');
  String get ROLE => getTranslation('ROLE');
  String get DESCRIPTION => getTranslation('DESCRIPTION');
  String get ID => getTranslation('ID');
  String get FULL_NAME => getTranslation('FULL_NAME');
  String get LOCATION => getTranslation('LOCATION');
  String get EMAIL => getTranslation('EMAIL');
  String get OFFICE_PHONE => getTranslation('OFFICE_PHONE');
  String get MOBILE_PHONE => getTranslation('MOBILE_PHONE');
  String get HOME_PHONE => getTranslation('HOME_PHONE');
  String get PHONE => getTranslation('PHONE');
  String get TENANT => getTranslation('TENANT');
  String get SELECT_CONTACT => getTranslation('SELECT_CONTACT');
  String get CONTACT_DETAILS => getTranslation('CONTACT_DETAILS');
  String get SEND_MESSAGE => getTranslation('SEND_MESSAGE');
  String get DOWNLOAD_CONTACT => getTranslation('DOWNLOAD_CONTACT');
  String get SHARE_VCARD => getTranslation('SHARE_VCARD');
  String get QRCODE_VCARD => getTranslation('QRCODE_VCARD');
  String get VCARD_DOWNLOAD_ERR => getTranslation('VCARD_DOWNLOAD_ERR');
  String get VCARD_SHARE_ERR => getTranslation('VCARD_SHARE_ERR');
  String get NO_CONTACTS_FOUND => getTranslation('NO_CONTACTS_FOUND');
  String get ERROR => getTranslation('ERROR');
  String get MISSING_CONTACT_ID => getTranslation('MISSING_CONTACT_ID');

  @override
  String get namespace => namespaceStatic;
}
