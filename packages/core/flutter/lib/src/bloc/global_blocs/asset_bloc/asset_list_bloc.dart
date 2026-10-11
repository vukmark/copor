import 'package:bloc/bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_event.dart';
import 'package:copor_core/src/data/model/asset_list/asset_list_model.dart';
import 'package:copor_core/src/data/repository_impl/asset_list/asset_list_repository.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_state.dart';

class AssetListBloc<T extends AssetListModel> extends Bloc<AssetListEvent, AssetListState<T>> {
  final AssetListRepository _assetListRepository;

  AssetListBloc({required AssetListRepository assetListRepository})
    : _assetListRepository = assetListRepository,
      super(AssetListState.initial()) {
    on<FetchAssetList<T>>(_onFetchAssetList);
  }

  Future<void> _onFetchAssetList(FetchAssetList<T> event, Emitter<AssetListState<T>> emit) async {
    emit(AssetListState.loading(result: state.result));
    final result = await _assetListRepository.getAssetList<T>(event.namespace, event.constructor);

    result.fold(
      (failure) {
        emit(AssetListState.failure(failure: failure, result: state.result));
      },
      (assetList) {
        emit(AssetListState.fetched(result: assetList));
      },
    );
  }
}
