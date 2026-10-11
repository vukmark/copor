import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/state/config/state_name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'state_model.g.dart';

@JsonSerializable()
class StateModel extends BaseModel {
  static const String namespaceStatic = StateModelNameSpaces.State;
  final String id;
  final String name;
  final String code;
  final String countryId;
  final PublishStatus publishStatus;

  const StateModel({
    required this.id,
    required this.name,
    required this.code,
    required this.countryId,
    required this.publishStatus,
  });

  factory StateModel.fromJson(JSON json) => _$StateModelFromJson(json);

  @override
  JSON toJson() => _$StateModelToJson(this);

  factory StateModel.empty() =>
      StateModel(id: '', name: '', code: '', countryId: '', publishStatus: PublishStatus.published);

  StateModel copyWith({
    String? id,
    String? name,
    String? code,
    String? countryId,
    PublishStatus? publishStatus,
  }) {
    return StateModel(
      id: id ?? this.id,
      name: name ?? this.name,
      code: code ?? this.code,
      countryId: countryId ?? this.countryId,
      publishStatus: publishStatus ?? this.publishStatus,
    );
  }

  @override
  List<Object?> get props => [id, name, code, countryId, publishStatus];

  @override
  String get namespace => namespaceStatic;
}
