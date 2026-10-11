import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class PrivateTagListState extends BaseState<List<TagModel>> {
  final bool isDeleted;

  const PrivateTagListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.isDeleted = false,
  });

  const PrivateTagListState.initial() : this._(result: null);
  const PrivateTagListState.loading({required Result<List<TagModel>>? result})
    : this._(result: result, isLoading: true);
  const PrivateTagListState.fetched({required Result<List<TagModel>>? result})
    : this._(result: result);
  const PrivateTagListState.failure({
    required Failure failure,
    required Result<List<TagModel>>? result,
  }) : this._(result: result, failure: failure);

  @override
  PrivateTagListState copyWith({
    Result<List<TagModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    bool? isDeleted,
  }) {
    return PrivateTagListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      isDeleted: isDeleted ?? this.isDeleted,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, isDeleted];
}
