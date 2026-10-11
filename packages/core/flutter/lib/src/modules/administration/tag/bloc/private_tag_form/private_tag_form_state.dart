import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class PrivateTagFormState extends BaseState<TagModel> {
  final ActionType? actionType;

  const PrivateTagFormState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
  });

  const PrivateTagFormState.initial() : this._(result: null);
  const PrivateTagFormState.loading({required Result<TagModel>? result})
    : this._(result: result, isLoading: true);
  const PrivateTagFormState.fetched({required Result<TagModel>? result}) : this._(result: result);
  const PrivateTagFormState.failure({required Failure failure, required Result<TagModel>? result})
    : this._(result: result, failure: failure);

  @override
  PrivateTagFormState copyWith({
    Result<TagModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
  }) {
    return PrivateTagFormState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      actionType: actionType ?? this.actionType,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, actionType];
}
