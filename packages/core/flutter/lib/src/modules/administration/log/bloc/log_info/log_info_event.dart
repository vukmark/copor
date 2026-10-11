import 'package:equatable/equatable.dart';

sealed class LogInfoEvent extends Equatable {
  const LogInfoEvent();

  @override
  List<Object?> get props => [];
}

class GetLogInfo extends LogInfoEvent {
  final String endpoint;

  const GetLogInfo(this.endpoint);
}
