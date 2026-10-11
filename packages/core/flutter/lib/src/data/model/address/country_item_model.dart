import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/country/config/country_name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'country_item_model.g.dart';

@JsonSerializable()
class CountryItemModel extends BaseModel {
  static const String namespaceStatic = CountryNamespaces.CountryItem;
  final String id;
  final String name;
  final String code;
  final PublishStatus publishStatus;

  const CountryItemModel({
    required this.id,
    required this.name,
    required this.code,
    required this.publishStatus,
  });

  factory CountryItemModel.fromJson(JSON json) => _$CountryItemModelFromJson(json);

  @override
  JSON toJson() => _$CountryItemModelToJson(this);

  CountryItemModel copyWith({
    String? id,
    String? name,
    String? code,
    PublishStatus? publishStatus,
  }) {
    return CountryItemModel(
      id: id ?? this.id,
      name: name ?? this.id,
      code: code ?? this.code,
      publishStatus: publishStatus ?? this.publishStatus,
    );
  }

  @override
  List<Object?> get props => [id, name, code, publishStatus];

  @override
  String get namespace => namespaceStatic;
}
