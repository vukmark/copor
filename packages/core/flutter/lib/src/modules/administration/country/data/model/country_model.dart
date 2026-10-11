import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/country/config/country_name_spaces.dart';
import 'package:copor_core/src/modules/administration/state/data/model/state_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'country_model.g.dart';

@JsonSerializable(explicitToJson: true)
class CountryModel extends BaseModel {
  static const String namespaceStatic = CountryNamespaces.Country;
  final String id;
  final String name;
  final String code;
  final PublishStatus publishStatus;
  @JsonKey(fromJson: _stateListFromJson, toJson: _stateListToJson)
  final List<StateModel>? stateList;

  const CountryModel({
    required this.id,
    required this.name,
    required this.code,
    required this.publishStatus,
    required this.stateList,
  });

  factory CountryModel.fromJson(JSON json) => _$CountryModelFromJson(json);

  @override
  JSON toJson() => _$CountryModelToJson(this);

  static List<StateModel>? _stateListFromJson(List? json) {
    if (json == null) {
      return null;
    }
    return json.map((item) => StateModel.fromJson(item)).toList();
  }

  static List<JSON>? _stateListToJson(List<StateModel>? model) {
    if (model == null) {
      return null;
    }
    return model.map((tag) => tag.toJson()).toList();
  }

  factory CountryModel.empty() => CountryModel(
    id: '',
    name: '',
    code: '',
    publishStatus: PublishStatus.published,
    stateList: [],
  );

  CountryModel copyWith({
    String? id,
    String? name,
    String? code,
    PublishStatus? publishStatus,
    List<StateModel>? stateList,
  }) {
    return CountryModel(
      id: id ?? this.id,
      name: name ?? this.name,
      code: code ?? this.code,
      publishStatus: publishStatus ?? this.publishStatus,
      stateList: stateList ?? this.stateList,
    );
  }

  @override
  List<Object?> get props => [id, name, code, publishStatus, stateList];

  @override
  String get namespace => namespaceStatic;
}
