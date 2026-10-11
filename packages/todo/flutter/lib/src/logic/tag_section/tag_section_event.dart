import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:equatable/equatable.dart';

sealed class TagSectionEvent extends Equatable {
  const TagSectionEvent();

  @override
  List<Object> get props => [];
}

class TagAdded extends TagSectionEvent {
  final TagModel tag;
  const TagAdded(this.tag);

  @override
  List<Object> get props => [tag];
}

class TagRemoved extends TagSectionEvent {
  final TagModel tag;
  const TagRemoved(this.tag);

  @override
  List<Object> get props => [tag];
}

class TagsUpdated extends TagSectionEvent {
  final List<TagModel> tags;
  const TagsUpdated(this.tags);

  @override
  List<Object> get props => [tags];
}
