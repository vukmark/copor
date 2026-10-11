import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'config_model.g.dart';

@JsonSerializable()
class ConfigModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.Config;
  final String baseUrl;
  final bool isUserRemembered;
  final bool isServerRemembered;
  final bool isServerUrlNotSet;
  @JsonKey(fromJson: LanguageModel.fromJson, toJson: LanguageModel.toJsonStatic)
  final LanguageModel language;
  final String version;
  final String webSocketUrl;

  const ConfigModel({
    required this.baseUrl,
    required this.isUserRemembered,
    required this.isServerRemembered,
    required this.language,
    required this.isServerUrlNotSet,
    required this.version,
    required this.webSocketUrl,
  });

  factory ConfigModel.defaultConfig({required String version}) {
    return ConfigModel(
      baseUrl: '',
      webSocketUrl: '',
      isUserRemembered: false,
      isServerRemembered: false,
      language: LanguageModel.defaultGerman(),
      isServerUrlNotSet: true,
      version: version,
    );
  }

  factory ConfigModel.fromJson(JSON json) => _$ConfigModelFromJson(json);

  @override
  JSON toJson() => _$ConfigModelToJson(this);

  ConfigModel copyWith({
    String? baseUrl,
    bool? isUserRemembered,
    bool? isServerRemembered,
    LanguageModel? language,
    bool? isServerUrlNotSet,
    String? version,
    String? webSocketUrl,
  }) {
    return ConfigModel(
      baseUrl: baseUrl ?? this.baseUrl,
      isUserRemembered: isUserRemembered ?? this.isUserRemembered,
      isServerRemembered: isServerRemembered ?? this.isServerRemembered,
      language: language ?? this.language,
      isServerUrlNotSet: isServerUrlNotSet ?? this.isServerUrlNotSet,
      version: version ?? this.version,
      webSocketUrl: webSocketUrl ?? this.webSocketUrl,
    );
  }

  @override
  List<Object?> get props => [
    baseUrl,
    isUserRemembered,
    isServerRemembered,
    language,
    isServerUrlNotSet,
    version,
    webSocketUrl,
  ];

  @override
  String get namespace => namespaceStatic;
}
