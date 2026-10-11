import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/login/forgot_password/bloc/forgot_password_event.dart';
import 'package:copor_core/src/modules/login/forgot_password/bloc/forgot_password_state.dart';
import 'package:copor_core/src/modules/login/forgot_password/data/repository/forgot_password_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ForgotPasswordBloc extends Bloc<ForgotPasswordEvent, ForgotPasswordState> {
  final ForgotPasswordRepository repository;

  ForgotPasswordBloc({required this.repository}) : super(const ForgotPasswordState.initial()) {
    on<SendResetCode>(_onSendResetCode);
    on<VerifyResetCode>(_onVerifyResetCode);
    on<SetNewPassword>(_onSetNewPassword);
  }

  Future<void> _onSendResetCode(SendResetCode event, Emitter<ForgotPasswordState> emit) {
    return _run(emit, () => repository.sendResetCode(event.userName));
  }

  Future<void> _onVerifyResetCode(VerifyResetCode event, Emitter<ForgotPasswordState> emit) {
    return _run(emit, () => repository.verifyResetCode(event.userName, event.code));
  }

  Future<void> _onSetNewPassword(SetNewPassword event, Emitter<ForgotPasswordState> emit) {
    return _run(
      emit,
      () => repository.resetPassword(event.userName, event.code, event.newPassword),
    );
  }

  Future<void> _run(
    Emitter<ForgotPasswordState> emit,
    Future<Either<Failure, Result<void>>> Function() operation,
  ) async {
    emit(const ForgotPasswordState.loading());

    final result = await operation();

    result.fold(
      (failure) => emit(ForgotPasswordState.failure(failure: failure)),
      (_) => emit(const ForgotPasswordState.success()),
    );
  }
}
