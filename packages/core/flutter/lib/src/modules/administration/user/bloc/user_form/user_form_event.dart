import 'package:copor_core/src/modules/administration/user/data/model/user_model.dart';
import 'package:copor_core/src/modules/administration/user/data/model/create_user_dto.dart';
import 'package:equatable/equatable.dart';

sealed class UserFormEvent extends Equatable {
  const UserFormEvent();

  @override
  List<Object?> get props => [];
}

class GetUser extends UserFormEvent {
  final String userId;
  const GetUser(this.userId);
}

class CreateUser extends UserFormEvent {
  final CreateUserDTO userToCreate;
  const CreateUser(this.userToCreate);
}

class UpdateUser extends UserFormEvent {
  final UserModel userToUpdate;
  const UpdateUser(this.userToUpdate);
}
