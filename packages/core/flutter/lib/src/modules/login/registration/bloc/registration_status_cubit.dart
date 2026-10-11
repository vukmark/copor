import 'package:copor_core/src/modules/login/registration/data/repository/registration_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// Whether the server accepts self-registration. Starts `false` and stays
/// `false` on any error, so the login page only offers signup when it works.
class RegistrationStatusCubit extends Cubit<bool> {
  final RegistrationRepository repository;

  RegistrationStatusCubit({required this.repository}) : super(false);

  Future<void> load() async {
    final result = await repository.isRegistrationEnabled();

    if (isClosed) return;
    emit(result.fold((_) => false, (success) => success.data));
  }
}
