import 'package:copor_core/src/modules/administration/tag/data/model/create_tag_dto.dart';
import 'package:equatable/equatable.dart';

sealed class TagFormEvent extends Equatable {
  const TagFormEvent();

  @override
  List<Object?> get props => [];
}

class GetTag extends TagFormEvent {
  final String tagId;
  const GetTag(this.tagId);
}

class CreateTag extends TagFormEvent {
  final CreateTagDTO tagToCreate;
  const CreateTag(this.tagToCreate);
}

class UpdateTag extends TagFormEvent {
  final CreateTagDTO tagToUpdate;
  const UpdateTag(this.tagToUpdate);
}

class RegisterValidationAndSubmitCallback extends TagFormEvent {
  final void Function() onValidateAndSubmit;
  const RegisterValidationAndSubmitCallback(this.onValidateAndSubmit);
}

class SaveButtonPressed extends TagFormEvent {}
