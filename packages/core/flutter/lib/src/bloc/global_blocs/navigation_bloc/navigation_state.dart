import 'package:equatable/equatable.dart';

class NavigationState extends Equatable {
  final List<String> allRoutes;
  final String selectedRoute;

  const NavigationState({required this.allRoutes, required this.selectedRoute});

  NavigationState copyWith({String? selectedRoute}) {
    return NavigationState(
      allRoutes: allRoutes,
      selectedRoute: selectedRoute ?? this.selectedRoute,
    );
  }

  @override
  List<Object> get props => [allRoutes, selectedRoute];
}
