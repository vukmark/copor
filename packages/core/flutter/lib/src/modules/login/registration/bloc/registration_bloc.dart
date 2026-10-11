import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_event.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_state.dart';
import 'package:copor_core/src/modules/login/registration/data/repository/registration_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class RegistrationBloc extends Bloc<RegistrationEvent, RegistrationState> {
  final RegistrationRepository repository;

  RegistrationBloc({required this.repository}) : super(const RegistrationState.initial()) {
    on<SubmitRegistration>(_onSubmitRegistration);
    on<VerifyRegistrationCode>(_onVerifyRegistrationCode);
    on<ResendRegistrationCode>(_onResendRegistrationCode);
  }

  Future<void> _onSubmitRegistration(SubmitRegistration event, Emitter<RegistrationState> emit) {
    return _run(
      emit,
      () => repository.register(
        firstName: event.firstName,
        lastName: event.lastName,
        email: event.email,
        userName: event.userName,
        password: event.password,
      ),
    );
  }

  Future<void> _onVerifyRegistrationCode(
    VerifyRegistrationCode event,
    Emitter<RegistrationState> emit,
  ) {
    return _run(emit, () => repository.verify(email: event.email, code: event.code));
  }

  Future<void> _onResendRegistrationCode(
    ResendRegistrationCode event,
    Emitter<RegistrationState> emit,
  ) {
    return _run(emit, () => repository.resendCode(email: event.email));
  }

  Future<void> _run(
    Emitter<RegistrationState> emit,
    Future<Either<Failure, Result<void>>> Function() operation,
  ) async {
    emit(const RegistrationState.loading());

    final result = await operation();

    result.fold(
      (failure) => emit(RegistrationState.failure(failure: failure)),
      (_) => emit(const RegistrationState.success()),
    );
  }
}
