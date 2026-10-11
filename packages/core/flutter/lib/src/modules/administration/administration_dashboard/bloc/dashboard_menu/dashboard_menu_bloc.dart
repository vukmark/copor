import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_event.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_state.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/repository/dashboard_menu_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class DashboardMenuBloc extends Bloc<DashboardMenuEvent, DashboardMenuState> {
  final DashboardMenuRepository _dashboardMenuRepository;

  DashboardMenuBloc({required DashboardMenuRepository dashboardMenuRepository})
    : _dashboardMenuRepository = dashboardMenuRepository,
      super(const DashboardMenuState.initial()) {
    on<GetDashboardMenu>(_onGetDashboardMenu);
  }

  Future<void> _onGetDashboardMenu(GetDashboardMenu event, Emitter<DashboardMenuState> emit) async {
    emit(state.copyWith(isLoading: true));
    // Read the language at request time (rather than relying on Dio's shared
    // default header) so the request is never sent with a stale language.
    final languageCode = getIt<ConfigBloc>().state.result?.data.language.code ?? 'en';
    final result = await _dashboardMenuRepository.getDashboardMenu(languageCode);
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (success) => emit(state.copyWith(result: success, isLoading: false)),
    );
  }
}
