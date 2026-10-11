import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/modules/my_account/data/model/update_account_info_dto.dart';
import 'package:equatable/equatable.dart';

sealed class UserAccountInfoEvent extends Equatable {
  const UserAccountInfoEvent();

  @override
  List<Object> get props => [];
}

class GetUserAccountInfo extends UserAccountInfoEvent {
  final String userId;

  const GetUserAccountInfo(this.userId);

  @override
  List<Object> get props => [userId];
}

class UpdateUserAccountInfo extends UserAccountInfoEvent {
  final String userId;
  final UpdateAccountInfoDTO updateData;

  const UpdateUserAccountInfo({required this.userId, required this.updateData});

  @override
  List<Object> get props => [userId, updateData];
}

class UploadUserImage extends UserAccountInfoEvent {
  final MediaFileModel file;
  final String userId;
  const UploadUserImage({required this.file, required this.userId});

  @override
  List<Object> get props => [file, userId];
}

class RegisterValidationAndSubmitCallback extends UserAccountInfoEvent {
  final void Function() onValidateAndSubmit;
  const RegisterValidationAndSubmitCallback(this.onValidateAndSubmit);
}

class UserAccountSaveButtonPressed extends UserAccountInfoEvent {}
