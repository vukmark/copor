import 'dart:typed_data';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class ContractState extends BaseState<Uint8List> {
  final ActionType? actionType;

  const ContractState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
  });

  const ContractState.initial() : this._(result: null, isUpdated: false);

  const ContractState.loading({required Result<Uint8List>? result})
    : this._(result: result, isLoading: true);

  const ContractState.fetched({required Result<Uint8List>? result}) : this._(result: result);

  const ContractState.failure({required Failure failure, required Result<Uint8List>? result})
    : this._(result: result, failure: failure);

  @override
  ContractState copyWith({
    Result<Uint8List>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
  }) {
    return ContractState._(
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
