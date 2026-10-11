import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_bloc.dart';

class DashboardMenuBlocFactory {
  static DashboardMenuBloc initializeDashboardMenuBloc() {
    return getIt<DashboardMenuBloc>();
  }
}
