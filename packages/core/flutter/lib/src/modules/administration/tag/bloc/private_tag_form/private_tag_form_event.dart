import 'package:equatable/equatable.dart';
import '../../data/model/create_tag_dto.dart';

sealed class PrivateTagFormEvent extends Equatable {
  const PrivateTagFormEvent();

  @override
  List<Object?> get props => [];
}

class CreatePrivateTag extends PrivateTagFormEvent {
  final CreateTagDTO tagToCreate;
  const CreatePrivateTag(this.tagToCreate);
}

class UpdatePrivateTag extends PrivateTagFormEvent {
  final CreateTagDTO tagToUpdate;
  const UpdatePrivateTag(this.tagToUpdate);
}
