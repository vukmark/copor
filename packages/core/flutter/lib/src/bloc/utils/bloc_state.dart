import 'package:copor_core/src/error/failure.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

abstract class BaseState<T> extends Equatable {
  final Result<T>? result;
  final bool isLoading;
  final bool isUpdated;
  final Failure? failure;

  const BaseState({
    required this.result,
    this.isLoading = false,
    this.isUpdated = false,
    this.failure,
  });

  bool get isInitial => result == null && failure == null;

  T get ensuredData {
    if (result != null) return result!.data;
    throw StateError("State data should not be null. $T");
  }

  BaseState<T> copyWith();

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure];
}

/// Because of global ItemDeletionListener, we need an interface that would give
/// all classes extending it the isDeleted property. BaseState does not have
/// that property so we use mixin to make an interface like BaseState, called
/// DeletableState, that has the isDeleted.

mixin DeletableState {
  bool get isDeleted;
}

mixin ToggledState {
  bool get isToggled;
}

extension BlocBaseSafeAdd<E, S extends BaseState> on Bloc<E, S> {
  void addIfNotLoaded(E event) {
    if (state.result == null && !state.isLoading) {
      add(event);
    }
  }
}

abstract class BlocState<T> extends Equatable {
  const BlocState();

  @override
  List<Object?> get props => [];
}

abstract class InitialState<T> extends BlocState<T> {
  const InitialState();

  @override
  List<Object?> get props => [];
}

abstract class LoadingState<T> extends BlocState<T> {
  const LoadingState();

  @override
  List<Object?> get props => [];
}

abstract class SuccessState<T> extends BlocState<T> {
  const SuccessState();

  @override
  List<Object?> get props => [];
}

abstract class DataState<T> extends SuccessState<T> {
  final T data;
  final bool isLoading;

  const DataState(this.data, {this.isLoading = false});

  @override
  List<Object?> get props => [data, isLoading];
}

abstract class FailureState<T> extends BlocState<T> {
  final Failure failure;

  const FailureState(this.failure);

  @override
  List<Object?> get props => [failure];
}

class Result<T> extends Equatable {
  final T data;
  final Failure? warning;

  const Result({required this.data, this.warning});

  @override
  List<Object?> get props => [data, warning];

  Result<T> copyWith({T? data, Failure? warning}) {
    return Result<T>(data: data ?? this.data, warning: warning ?? this.warning);
  }
}
