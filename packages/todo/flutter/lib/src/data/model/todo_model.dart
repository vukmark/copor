import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_todo/src/config/to_do_namespaces.dart';
import 'package:copor_todo/src/data/model/priority_model.dart';
import 'package:copor_todo/src/data/model/todo_attachment_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'todo_model.g.dart';

class TodoType {
  static const String private = 'PRIVATE';
}

@JsonSerializable()
class TodoModel extends BaseModel {
  static const String namespaceStatic = TodoNamespaces.TodoItem;
  final String id;
  final String title;
  final String? deadline;
  final String progress;
  final bool isPinned;
  final bool isDisplayedInCalendar;
  final PriorityModel priority;
  @JsonKey(defaultValue: <TodoAttachmentModel>[])
  final List<TodoAttachmentModel> attachmentList;

  final String type;
  final String? creatorId;
  @JsonKey(readValue: _readCreatorName)
  final String? creatorName;

  @JsonKey(fromJson: _tagListFromJson)
  final List<TagModel>? tagList;

  const TodoModel({
    required this.id,
    required this.title,
    this.deadline,
    required this.progress,
    required this.isPinned,
    required this.isDisplayedInCalendar,
    required this.priority,
    this.attachmentList = const [],
    required this.type,
    this.creatorId,
    this.creatorName,
    required this.tagList,
  });

  factory TodoModel.fromJson(JSON json) => _$TodoModelFromJson(json);

  @override
  JSON toJson() => _$TodoModelToJson(this);

  static List<TagModel>? _tagListFromJson(List<dynamic>? json) {
    if (json == null) return null;
    return json.map((item) => TagModel.fromJson(item as JSON)).toList();
  }

  static Object? _readCreatorName(Map<dynamic, dynamic> json, String key) {
    return _readPersonName(json, key, ['creatorFullName', 'createdByName', 'creator', 'createdBy']);
  }

  static String? _readPersonName(
    Map<dynamic, dynamic> json,
    String key,
    List<String> alternativeKeys,
  ) {
    for (final candidateKey in [key, ...alternativeKeys]) {
      final value = json[candidateKey];
      if (value is String && value.trim().isNotEmpty) return value;
      if (value is Map) {
        final fullName = value['fullName'] ?? value['name'];
        if (fullName is String && fullName.trim().isNotEmpty) return fullName;

        final firstName = value['firstName'] as String? ?? '';
        final lastName = value['lastName'] as String? ?? '';
        final combinedName = '$firstName $lastName'.trim();
        if (combinedName.isNotEmpty) return combinedName;
      }
    }
    return null;
  }

  factory TodoModel.empty() => TodoModel(
    id: '',
    title: '',
    deadline: null,
    progress: 'TO_DO',
    isPinned: false,
    isDisplayedInCalendar: false,
    priority: PriorityModel.empty(),
    type: TodoType.private,
    creatorId: null,
    creatorName: null,
    tagList: const [],
    attachmentList: const [],
  );

  TodoModel copyWith({
    String? id,
    String? title,
    String? deadline,
    PriorityModel? priority,
    String? progress,
    String? type,
    String? creatorId,
    String? creatorName,
    bool? isPinned,
    bool? isDisplayedInCalendar,
    List<TagModel>? tagList,
    List<TodoAttachmentModel>? attachmentList,
  }) {
    return TodoModel(
      id: id ?? this.id,
      title: title ?? this.title,
      deadline: deadline ?? this.deadline,
      priority: priority ?? this.priority,
      progress: progress ?? this.progress,
      isPinned: isPinned ?? this.isPinned,
      type: type ?? this.type,
      creatorId: creatorId ?? this.creatorId,
      creatorName: creatorName ?? this.creatorName,
      isDisplayedInCalendar: isDisplayedInCalendar ?? this.isDisplayedInCalendar,
      tagList: tagList ?? this.tagList,
      attachmentList: attachmentList ?? this.attachmentList,
    );
  }

  @override
  List<Object?> get props => [
    id,
    title,
    deadline,
    progress,
    isPinned,
    isDisplayedInCalendar,
    priority,
    tagList,
    type,
    creatorId,
    creatorName,
    attachmentList,
  ];

  @override
  String get namespace => namespaceStatic;
}
