import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc.dart';

class SimpleListBlocFactory {
  static T getSimpleListBloc<T extends SimpleListBloc>() {
    return getIt<T>();
  }
}
