import 'package:copor_core/src/modules/administration/administration_dashboard/data/model/dashboard_menu_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

final class DashboardMenuState extends BaseState<DashboardMenuModel> {
  const DashboardMenuState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const DashboardMenuState.initial() : this._();

  @override
  DashboardMenuState copyWith({
    Result<DashboardMenuModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return DashboardMenuState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure];
}
