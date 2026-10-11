import 'package:equatable/equatable.dart';

sealed class NotificationCounterEvent extends Equatable {
  const NotificationCounterEvent();

  @override
  List<Object?> get props => [];
}

class GetNotificationsCount extends NotificationCounterEvent {}
