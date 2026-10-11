import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/config/notification_counter_dependency_injection.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_bloc.dart';

class PasswordValidationBlocFactory {
  static PasswordValidationBloc validatePassword() {
    return getIt<PasswordValidationBloc>();
  }
}
