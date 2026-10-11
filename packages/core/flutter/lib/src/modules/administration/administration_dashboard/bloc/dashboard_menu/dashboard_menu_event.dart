import 'package:equatable/equatable.dart';

sealed class DashboardMenuEvent extends Equatable {
  const DashboardMenuEvent();

  @override
  List<Object?> get props => [];
}

class GetDashboardMenu extends DashboardMenuEvent {}
