import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class TagFormState extends BaseState<TagModel> {
  final ActionType? actionType;
  final void Function()? onValidateAndSubmit;

  const TagFormState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
    this.onValidateAndSubmit,
  });

  const TagFormState.initial() : this._(result: null);
  const TagFormState.loading({required Result<TagModel>? result})
    : this._(result: result, isLoading: true);
  const TagFormState.fetched({required Result<TagModel>? result}) : this._(result: result);
  const TagFormState.failure({required Failure failure, required Result<TagModel>? result})
    : this._(result: result, failure: failure);

  @override
  TagFormState copyWith({
    Result<TagModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
    void Function()? onValidateAndSubmit,
  }) {
    return TagFormState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      actionType: actionType ?? this.actionType,
      onValidateAndSubmit: onValidateAndSubmit ?? this.onValidateAndSubmit,
    );
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    actionType,
    onValidateAndSubmit,
  ];
}
