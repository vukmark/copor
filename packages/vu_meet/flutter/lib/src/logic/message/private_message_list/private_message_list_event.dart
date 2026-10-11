import 'package:equatable/equatable.dart';

sealed class PrivateMessageListEvent extends Equatable {
  const PrivateMessageListEvent();

  @override
  List<Object?> get props => [];
}

class GetPrivateMessageList extends PrivateMessageListEvent {}

class SetPrivateMessageList extends PrivateMessageListEvent {}
