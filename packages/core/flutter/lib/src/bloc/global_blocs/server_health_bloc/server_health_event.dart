import 'package:equatable/equatable.dart';

sealed class ServerHealthEvent extends Equatable {
  const ServerHealthEvent();

  @override
  List<Object?> get props => [];
}

class CheckBaseUrlHealth extends ServerHealthEvent {
  final String baseUrl;

  const CheckBaseUrlHealth(this.baseUrl);
}
