import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

import '../../config/language_name_spaces.dart';

part 'language_model.g.dart';

@JsonSerializable(explicitToJson: true)
class LanguageModel extends BaseModel {
  static const String namespaceStatic = LanguageModelNamespaces.Language;
  final String id;
  final String name;
  final String code;
  final String nativeName;
  final PublishStatus publishStatus;

  const LanguageModel({
    required this.id,
    required this.name,
    required this.code,
    required this.nativeName,
    required this.publishStatus,
  });

  factory LanguageModel.fromJson(JSON json) =>
      _$LanguageModelFromJson({...json, 'code': (json['code'] as String).toLowerCase()});

  @override
  JSON toJson() => _$LanguageModelToJson(this);

  static JSON toJsonStatic(LanguageModel model) => model.toJson();

  @override
  List<Object?> get props => [id, name, code, nativeName, publishStatus];

  @override
  String get namespace => namespaceStatic;

  static LanguageModel defaultEnglish() {
    return const LanguageModel(
      id: '6d911e2c-2c2a-11f0-9013-db3060506f3f',
      name: 'English',
      code: 'en',
      nativeName: 'English',
      publishStatus: PublishStatus.published,
    );
  }

  static LanguageModel defaultGerman() {
    return const LanguageModel(
      id: '299ef4b8-a876-4861-87f8-c2c0ee5a931d',
      name: 'German',
      code: 'de',
      nativeName: 'Deutsch',
      publishStatus: PublishStatus.published,
    );
  }
}
