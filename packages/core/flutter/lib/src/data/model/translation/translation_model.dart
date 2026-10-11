import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'translation_model.g.dart';

@JsonSerializable()
class TranslationModel extends BaseModel {
  final StringMap translationStringList;

  const TranslationModel({required this.translationStringList});

  String getTranslation(String key) {
    return translationStringList[key] ?? '';
  }

  factory TranslationModel.fromJson(JSON json) => _$TranslationModelFromJson(json);

  @override
  JSON toJson() => _$TranslationModelToJson(this);

  T toNamespaceModel<T extends TranslationModel>(TranslationConstructor<T> modelConstructor) {
    return modelConstructor(translationStringList);
  }

  static TranslationModel fromJsonPointer(JSON json) => TranslationModel.fromJson(json);
  static JSON toJsonPointer(TranslationModel model) => model.toJson();

  @override
  List<Object?> get props => [translationStringList];

  @override
  String get namespace => throw UnimplementedError();
}
