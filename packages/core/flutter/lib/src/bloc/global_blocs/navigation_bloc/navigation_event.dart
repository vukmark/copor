import 'package:equatable/equatable.dart';

abstract class NavigationEvent extends Equatable {
  const NavigationEvent();
  @override
  List<Object> get props => [];
}

class NavigateToRoute extends NavigationEvent {
  final String route;
  final bool push;

  const NavigateToRoute(this.route, {this.push = false});

  @override
  List<Object> get props => [route, push];
}

class RouteChanged extends NavigationEvent {
  final String route;

  const RouteChanged(this.route);

  @override
  List<Object> get props => [route];
}
