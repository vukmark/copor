import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'asset_list_model.g.dart';

@JsonSerializable()
class AssetListModel extends BaseModel {
  final StringMap assetUrlList;

  const AssetListModel({required this.assetUrlList});

  String getAsset(String key) {
    return assetUrlList[key] ?? _throwTranslationKeyNotFoundException(key);
  }

  String _throwTranslationKeyNotFoundException(String key) {
    throw Exception('Translation for key "$key" is missing');
  }

  factory AssetListModel.fromJson(JSON json) => _$AssetListModelFromJson(json);

  @override
  JSON toJson() => _$AssetListModelToJson(this);

  static AssetListModel fromJsonPointer(JSON json) => AssetListModel.fromJson(json);

  T toNamespaceModel<T extends AssetListModel>(AssetListConstructor<T> modelConstructor) {
    return modelConstructor(assetUrlList);
  }

  static JSON toJsonPointer(AssetListModel model) => model.toJson();

  @override
  List<Object?> get props => [assetUrlList];

  @override
  String get namespace => throw UnimplementedError();
}
