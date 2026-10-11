import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class CoporFormState extends BaseState<CoporFormDTO> {
  final ActionType? actionType;
  final String? message;

  const CoporFormState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
    this.message,
  });

  const CoporFormState.initial() : this._(result: null, isUpdated: false);

  const CoporFormState.loading({required Result<CoporFormDTO>? result})
    : this._(result: result, isLoading: true);

  const CoporFormState.fetched({required Result<CoporFormDTO>? result}) : this._(result: result);

  const CoporFormState.failure({required Failure failure, required Result<CoporFormDTO>? result})
    : this._(result: result, failure: failure);

  @override
  CoporFormState copyWith({
    Result<CoporFormDTO>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
    String? message,
  }) {
    return CoporFormState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      actionType: actionType ?? this.actionType,
      message: message ?? this.message,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, actionType, message];
}
