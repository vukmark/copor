import 'package:copor_core/src/modules/table/data/model/copor_action_dto_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'cell_content.g.dart';

@JsonSerializable()
class CellContent {
  final String? text;

  // TODO change color to enum
  final int? color;
  final PublishStatus? publishStatus;
  final List<CoporActionDTOModel>? actionList;
  final String? copyText;
  final bool? isFeatured;
  final bool? isChecked;
  final String? date;
  final Priority? priority;
  final Progress? progress;
  final HiddenTextContent? hiddenText;
  final GroupListContent? groupList;

  CellContent({
    this.text,
    this.color,
    this.publishStatus,
    this.actionList,
    this.copyText,
    this.isFeatured,
    this.isChecked,
    this.date,
    this.priority,
    this.progress,
    this.hiddenText,
    this.groupList,
  });

  factory CellContent.fromJson(Map<String, dynamic> json) => _$CellContentFromJson(json);

  Map<String, dynamic> toJson() => _$CellContentToJson(this);
}

@JsonSerializable()
class GroupListContent {
  final List<UserGroupNameModel> userGroupList;

  GroupListContent({this.userGroupList = const []});

  bool get isEmpty => userGroupList.isEmpty;

  int get length => userGroupList.length;

  factory GroupListContent.fromJson(Map<String, dynamic> json) => _$GroupListContentFromJson(json);

  Map<String, dynamic> toJson() => _$GroupListContentToJson(this);
}

@JsonSerializable()
class UserGroupNameModel {
  final String name;

  UserGroupNameModel({required this.name});

  factory UserGroupNameModel.fromJson(Map<String, dynamic> json) =>
      _$UserGroupNameModelFromJson(json);

  Map<String, dynamic> toJson() => _$UserGroupNameModelToJson(this);
}

@JsonSerializable()
class HiddenTextContent {
  final String key;
  final String value;

  HiddenTextContent({required this.key, required this.value});

  factory HiddenTextContent.fromJson(Map<String, dynamic> json) =>
      _$HiddenTextContentFromJson(json);

  Map<String, dynamic> toJson() => _$HiddenTextContentToJson(this);
}
