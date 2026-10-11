import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:equatable/equatable.dart';

sealed class PrivateTagsManagementEvent extends Equatable {
  const PrivateTagsManagementEvent();
  @override
  List<Object> get props => [];
}

class AddTagToggled extends PrivateTagsManagementEvent {}

class NewTagNameChanged extends PrivateTagsManagementEvent {
  final String name;
  const NewTagNameChanged(this.name);
  @override
  List<Object> get props => [name];
}

class NewTagColorChanged extends PrivateTagsManagementEvent {
  final int color;
  const NewTagColorChanged(this.color);
  @override
  List<Object> get props => [color];
}

class EditModeToggled extends PrivateTagsManagementEvent {
  final TagModel tag;
  const EditModeToggled(this.tag);
  @override
  List<Object> get props => [tag];
}

class EditingTagNameChanged extends PrivateTagsManagementEvent {
  final String tagId;
  final String name;
  const EditingTagNameChanged(this.tagId, this.name);
  @override
  List<Object> get props => [tagId, name];
}

class EditingTagColorChanged extends PrivateTagsManagementEvent {
  final String tagId;
  final int color;
  const EditingTagColorChanged(this.tagId, this.color);
  @override
  List<Object> get props => [tagId, color];
}
