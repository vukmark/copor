import 'package:copor_core/src/modules/table/copor_action.dart';
import 'package:json_annotation/json_annotation.dart';

part 'copor_action_dto_model.g.dart';

@JsonSerializable()
class CoporActionDTOModel {
  final String routerPath;
  final TableActionType actionType;
  final String popupMessage;
  final bool? isActive;

  CoporActionDTOModel({
    required this.routerPath,
    required this.actionType,
    required this.popupMessage,
    this.isActive,
  });
  factory CoporActionDTOModel.fromJson(Map<String, dynamic> json) =>
      _$CoporActionDTOModelFromJson(json);
}
