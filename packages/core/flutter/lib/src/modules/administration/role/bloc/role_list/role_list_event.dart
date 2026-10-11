import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:equatable/equatable.dart';

sealed class RoleListEvent extends Equatable {
  const RoleListEvent();

  @override
  List<Object?> get props => [];
}

class GetRoleList extends RoleListEvent {
  final FilterListDTO filterList;
  const GetRoleList(this.filterList);
}

class DeleteRole extends RoleListEvent {
  final String roleId;
  const DeleteRole(this.roleId);
}
