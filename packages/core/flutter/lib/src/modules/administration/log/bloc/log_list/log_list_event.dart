import 'package:equatable/equatable.dart';

sealed class LogListEvent extends Equatable {
  const LogListEvent();

  @override
  List<Object?> get props => [];
}

class GetLogList extends LogListEvent {
  const GetLogList();
}
