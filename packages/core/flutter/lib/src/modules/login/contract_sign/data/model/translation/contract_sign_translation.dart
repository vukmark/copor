import 'package:copor_core/src/data/model/translation/translation_model.dart';

class ContractSignPageTranslation extends TranslationModel {
  /// Backend locale namespace (`client/src/Resources/locales/contracts/`).
  static const String namespaceStatic = 'contracts';

  const ContractSignPageTranslation({required super.translationStringList});

  String get SIGN_CONTRACT => getTranslation('SIGN_CONTRACT');

  @override
  String get namespace => namespaceStatic;
}
