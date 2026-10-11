import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/config/notification_counter_name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'notification_counter_model.g.dart';

@JsonSerializable()
class NotificationCounterModel extends BaseModel {
  static const String namespaceStatic = NotificationCounterNameSpaces.NotificationCounterModel;
  final int todo;
  final int vuMeet;

  const NotificationCounterModel({this.todo = 0, this.vuMeet = 0});

  factory NotificationCounterModel.fromJson(JSON json) => _$NotificationCounterModelFromJson(json);

  @override
  JSON toJson() => _$NotificationCounterModelToJson(this);

  NotificationCounterModel copyWith({int? vuMeet, int? todo}) {
    return NotificationCounterModel(
      vuMeet: vuMeet ?? this.vuMeet,
      todo: todo ?? this.todo,
    );
  }

  @override
  List<Object?> get props => [todo, vuMeet];

  @override
  String get namespace => namespaceStatic;
}
