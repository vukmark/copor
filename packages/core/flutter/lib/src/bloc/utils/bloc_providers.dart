import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:copor_core/src/modules/forms/data/repository/copor_form_repository.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc_impl.dart';
import 'package:copor_core/src/modules/simple_list/data/repository/simple_list_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class StateSimpleListProvider extends BlocProvider<StateSimpleListBloc> {
  StateSimpleListProvider({super.key, super.child})
    : super(
        create: (context) =>
            StateSimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
      );
}

class RoleSimpleListProvider extends BlocProvider<RoleSimpleListBloc> {
  RoleSimpleListProvider({super.key, super.child})
    : super(
        create: (context) =>
            RoleSimpleListBloc(simpleListRepository: getIt<SimpleListRepository>()),
      );
}

class CoporFormProvider extends BlocProvider<CoporFormBloc> {
  CoporFormProvider({super.key, required String path, super.child})
    : super(
        create: (context) =>
            CoporFormBloc(coporFormRepository: getIt<CoporFormRepository>())
              ..add(GetCoporForm(path)),
      );
}
