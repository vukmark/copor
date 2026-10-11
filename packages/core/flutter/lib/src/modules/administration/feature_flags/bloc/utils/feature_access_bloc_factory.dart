import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/menu/menu_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class FeatureAccessBlocFactory {
  static FeatureAccessBloc initializeFeatureAccessBloc() {
    final bloc = getIt<FeatureAccessBloc>();
    return bloc;
  }

  static MenuBloc initializeMenuBloc() {
    final bloc = getIt<MenuBloc>();
    return bloc;
  }
}
