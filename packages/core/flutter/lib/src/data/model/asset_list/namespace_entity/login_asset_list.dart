import 'package:copor_core/src/data/model/asset_list/asset_list_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';

class CommonAssetListModel extends AssetListModel {
  static const String namespaceStatic = ModelNamespaces.LoginAssetList;
  const CommonAssetListModel({required super.assetUrlList});

  factory CommonAssetListModel.fromModel(AssetListModel model) {
    return CommonAssetListModel(assetUrlList: model.assetUrlList);
  }

  String get LOGO => getAsset('Logo');
  String get BACKGROUND => getAsset('Background');

  @override
  String get namespace => namespaceStatic;
}
