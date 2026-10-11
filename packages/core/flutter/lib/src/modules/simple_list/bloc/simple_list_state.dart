import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/simple_list/data/model/simple_list_model.dart';

final class SimpleListState extends BaseState<SimpleListModel> {
  const SimpleListState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const SimpleListState.initial() : this._(result: null);

  const SimpleListState.loading({required Result<SimpleListModel>? result})
    : this._(result: result, isLoading: true);

  const SimpleListState.fetched({required Result<SimpleListModel>? result})
    : this._(result: result);

  const SimpleListState.failure({
    required Failure failure,
    required Result<SimpleListModel>? result,
  }) : this._(result: result, failure: failure);

  @override
  SimpleListState copyWith({
    Result<SimpleListModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return SimpleListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure];
}
