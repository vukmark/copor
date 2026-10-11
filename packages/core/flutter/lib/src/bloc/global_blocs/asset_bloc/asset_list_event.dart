import 'package:copor_core/src/data/model/asset_list/asset_list_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:equatable/equatable.dart';

sealed class AssetListEvent extends Equatable {
  const AssetListEvent();

  @override
  List<Object?> get props => [];
}

class FetchAssetList<T extends AssetListModel> extends AssetListEvent {
  final String namespace;
  final AssetListConstructor<T> constructor;

  const FetchAssetList({required this.namespace, required this.constructor});

  @override
  List<Object?> get props => [namespace];
}
