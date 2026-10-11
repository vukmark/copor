import 'package:equatable/equatable.dart';

class PrivateTagsManagementState extends Equatable {
  final bool isAddingTag;
  final String newTagName;
  final int newTagColor;
  final Set<String> editingTagIds;
  final Map<String, String> editingTagNames;
  final Map<String, int> editingTagColors;

  const PrivateTagsManagementState({
    this.isAddingTag = false,
    this.newTagName = '',
    this.newTagColor = 0,
    this.editingTagIds = const {},
    this.editingTagNames = const {},
    this.editingTagColors = const {},
  });

  PrivateTagsManagementState copyWith({
    bool? isAddingTag,
    String? newTagName,
    int? newTagColor,
    Set<String>? editingTagIds,
    Map<String, String>? editingTagNames,
    Map<String, int>? editingTagColors,
  }) {
    return PrivateTagsManagementState(
      isAddingTag: isAddingTag ?? this.isAddingTag,
      newTagName: newTagName ?? this.newTagName,
      newTagColor: newTagColor ?? this.newTagColor,
      editingTagIds: editingTagIds ?? this.editingTagIds,
      editingTagNames: editingTagNames ?? this.editingTagNames,
      editingTagColors: editingTagColors ?? this.editingTagColors,
    );
  }

  @override
  List<Object> get props => [
    isAddingTag,
    newTagName,
    newTagColor,
    editingTagIds,
    editingTagNames,
    editingTagColors,
  ];
}
