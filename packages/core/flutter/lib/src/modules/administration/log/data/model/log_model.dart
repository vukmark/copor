import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'log_model.g.dart';

@JsonSerializable(explicitToJson: true)
class LogModel extends BaseModel {
  static const String namespaceStatic = 'log';

  final String id;
  final Map<String, dynamic> logData;
  final String actorId;
  final String logType;
  final DateTime createdAt;
  final String actorUserName;

  String get formattedCreatedAt {
    return '${formatISODate(createdAt)}\n${formatISOTime(createdAt)}';
  }

  const LogModel({
    required this.id,
    required this.logData,
    required this.actorId,
    required this.logType,
    required this.createdAt,
    required this.actorUserName,
  });

  factory LogModel.fromJson(JSON json) => _$LogModelFromJson(json);

  @override
  JSON toJson() => _$LogModelToJson(this);

  factory LogModel.empty() => LogModel(
    id: '',
    logData: const {},
    actorId: '',
    logType: '',
    createdAt: DateTime.fromMillisecondsSinceEpoch(0),
    actorUserName: '',
  );

  LogModel copyWith({
    String? id,
    Map<String, dynamic>? logData,
    String? actorId,
    String? logType,
    DateTime? createdAt,
    String? actorUserName,
  }) {
    return LogModel(
      id: id ?? this.id,
      logData: logData ?? this.logData,
      actorId: actorId ?? this.actorId,
      logType: logType ?? this.logType,
      createdAt: createdAt ?? this.createdAt,
      actorUserName: actorUserName ?? this.actorUserName,
    );
  }

  @override
  List<Object?> get props => [id, logData, actorId, logType, createdAt, actorUserName];

  @override
  String get namespace => namespaceStatic;
}
