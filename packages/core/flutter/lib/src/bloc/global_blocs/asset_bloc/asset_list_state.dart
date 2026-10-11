import 'package:copor_core/src/data/model/asset_list/asset_list_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class AssetListState<T extends AssetListModel> extends BaseState<T> {
  const AssetListState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const AssetListState.initial() : this._(result: null);
  const AssetListState.loading({required Result<T>? result})
    : this._(result: result, isLoading: true);
  const AssetListState.fetched({required Result<T> result}) : this._(result: result);
  const AssetListState.failure({required Failure failure, required Result<T>? result})
    : this._(result: result, failure: failure);

  @override
  AssetListState<T> copyWith({
    Result<T>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return AssetListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }
}
