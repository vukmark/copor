import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:equatable/equatable.dart';

class TagSectionState extends Equatable {
  final List<TagModel> selectedTags;

  const TagSectionState({this.selectedTags = const []});

  TagSectionState copyWith({List<TagModel>? selectedTags}) {
    return TagSectionState(selectedTags: selectedTags ?? this.selectedTags);
  }

  @override
  List<Object> get props => [selectedTags];
}
