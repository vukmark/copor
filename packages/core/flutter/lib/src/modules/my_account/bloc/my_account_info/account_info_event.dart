import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/modules/my_account/data/model/update_account_info_dto.dart';
import 'package:equatable/equatable.dart';

sealed class AccountInfoEvent extends Equatable {
  const AccountInfoEvent();

  @override
  List<Object?> get props => [];
}

class GetAccountInfo extends AccountInfoEvent {}

class UpdateAccountInfo extends AccountInfoEvent {
  final UpdateAccountInfoDTO updateData;
  const UpdateAccountInfo(this.updateData);
}

class AccountInfoReset extends AccountInfoEvent {
  const AccountInfoReset();
}

class RegisterValidationAndSubmitCallback extends AccountInfoEvent {
  final void Function() onValidateAndSubmit;
  const RegisterValidationAndSubmitCallback(this.onValidateAndSubmit);
}

class SaveButtonPressed extends AccountInfoEvent {}

class UploadPersonalImage extends AccountInfoEvent {
  final MediaFileModel file;
  const UploadPersonalImage(this.file);

  @override
  List<Object?> get props => [file];
}
