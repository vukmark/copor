import 'dart:async';

import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_history.dart';
import 'package:copor_core/src/config/dispatcher.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_event.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_state.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/route_cubit.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../config/dependency_injection.dart';

const String lastAppRouteKey = 'last_app_route';

class NavigationCubit extends Bloc<NavigationEvent, NavigationState> {
  final Dispatcher dispatcher;
  late final StreamSubscription<String> _routeSubscription;

  NavigationCubit({required this.dispatcher, required RouteCubit routeCubit})
    : super(NavigationState(selectedRoute: routeCubit.state, allRoutes: AppRoutes.all)) {
    on<NavigateToRoute>(_onNavigateToRoute);
    on<RouteChanged>(_onRouteChanged);
    _routeSubscription = routeCubit.stream.listen((route) {
      if (route.isNotEmpty) {
        add(RouteChanged(route));
      }
    });
  }

  void _onNavigateToRoute(NavigateToRoute event, Emitter<NavigationState> emit) {
    if (!AppRoutes.publicRoutes.contains(Uri.parse(event.route).path)) {
      unawaited(getIt<SharedPreferences>().setString(lastAppRouteKey, event.route));
    }
    if (event.push) {
      dispatcher.push(event.route);
    } else {
      dispatcher.go(event.route);
    }
    emit(state.copyWith(selectedRoute: event.route));
  }

  void _onRouteChanged(RouteChanged event, Emitter<NavigationState> emit) {
    if (event.route != state.selectedRoute) {
      emit(state.copyWith(selectedRoute: event.route));
    }
  }

  @override
  Future<void> close() {
    _routeSubscription.cancel();
    return super.close();
  }
}

void goToPage(String route, {bool push = false}) {
  final navigationCubit = getIt<NavigationCubit>();
  navigationCubit.add(NavigateToRoute(route, push: push));
}

void goBack() {
  goToPage(getIt<NavigationHistory>().pop()!);
}

void closeRootModal(BuildContext context) {
  Navigator.of(context, rootNavigator: true).pop();
}

String? currentPathName() {
  return getIt<NavigationHistory>().getLastPathName();
}

String? currentUri() {
  return getIt<NavigationHistory>().getLastUri();
}

String? findMostRecentUri(String pathName) {
  return getIt<NavigationHistory>().findMostRecentUri(pathName);
}

void goBackToPath(String pathName) {
  final uri = getIt<NavigationHistory>().popToPath(pathName);
  if (uri != null) {
    goToPage(uri);
  }
}
