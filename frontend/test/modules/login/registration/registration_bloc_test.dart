import 'package:bloc_test/bloc_test.dart';
import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_bloc.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_event.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_state.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_status_cubit.dart';
import 'package:copor_core/src/modules/login/registration/data/repository/registration_repository.dart';

class _FakeRegistrationRepository implements RegistrationRepository {
  Failure? failure;
  Either<Failure, Result<bool>> status = Right(Result(data: true));
  final List<String> calls = [];

  Either<Failure, Result<void>> _result() =>
      failure == null ? Right(Result<void>(data: null)) : Left(failure!);

  @override
  Future<Either<Failure, Result<bool>>> isRegistrationEnabled() async => status;

  @override
  Future<Either<Failure, Result<void>>> register({
    required String firstName,
    required String lastName,
    required String email,
    required String userName,
    required String password,
  }) async {
    calls.add('register:$email:$userName');
    return _result();
  }

  @override
  Future<Either<Failure, Result<void>>> verify({
    required String email,
    required String code,
  }) async {
    calls.add('verify:$email:$code');
    return _result();
  }

  @override
  Future<Either<Failure, Result<void>>> resendCode({required String email}) async {
    calls.add('resend:$email');
    return _result();
  }
}

void main() {
  late _FakeRegistrationRepository repository;
  const failure = Failure(400, 'EmailAlreadyInUseException');

  setUp(() => repository = _FakeRegistrationRepository());

  group('RegistrationBloc', () {
    blocTest<RegistrationBloc, RegistrationState>(
      'registers and reports success',
      build: () => RegistrationBloc(repository: repository),
      act: (bloc) => bloc.add(
        const SubmitRegistration(
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          userName: 'jane.doe',
          password: 'Str0ng!Secret',
        ),
      ),
      expect: () => [const RegistrationState.loading(), const RegistrationState.success()],
      verify: (_) => expect(repository.calls, ['register:jane.doe@example.com:jane.doe']),
    );

    blocTest<RegistrationBloc, RegistrationState>(
      'surfaces a backend failure',
      build: () => RegistrationBloc(repository: repository..failure = failure),
      act: (bloc) => bloc.add(const VerifyRegistrationCode(email: 'a@example.com', code: '1')),
      expect: () => [
        const RegistrationState.loading(),
        const RegistrationState.failure(failure: failure),
      ],
    );

    blocTest<RegistrationBloc, RegistrationState>(
      'verifies and resends with the given e-mail',
      build: () => RegistrationBloc(repository: repository),
      act: (bloc) async {
        bloc.add(const VerifyRegistrationCode(email: 'jane.doe@example.com', code: '123456'));
        await Future<void>.delayed(Duration.zero);
        bloc.add(const ResendRegistrationCode(email: 'jane.doe@example.com'));
      },
      verify: (_) => expect(repository.calls, [
        'verify:jane.doe@example.com:123456',
        'resend:jane.doe@example.com',
      ]),
    );
  });

  group('RegistrationStatusCubit', () {
    blocTest<RegistrationStatusCubit, bool>(
      'reports enabled when the server says so',
      build: () => RegistrationStatusCubit(repository: repository),
      act: (cubit) => cubit.load(),
      expect: () => [true],
    );

    blocTest<RegistrationStatusCubit, bool>(
      'stays disabled when the status request fails',
      build: () => RegistrationStatusCubit(repository: repository..status = const Left(failure)),
      act: (cubit) => cubit.load(),
      expect: () => [false],
    );
  });
}
