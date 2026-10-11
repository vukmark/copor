import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:equatable/equatable.dart';

sealed class UserListEvent extends Equatable {
  const UserListEvent();

  @override
  List<Object?> get props => [];
}

class GetUserList extends UserListEvent {
  final FilterListDTO filterList;
  const GetUserList(this.filterList);
}

class GetUserSearchList extends UserListEvent {
  final FilterListDTO filterList;
  const GetUserSearchList(this.filterList);
}

class DeleteUser extends UserListEvent {
  final String userId;
  const DeleteUser(this.userId);
}
