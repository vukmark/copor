import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:equatable/equatable.dart';

sealed class ConfigEvent extends Equatable {
  const ConfigEvent();

  @override
  List<Object?> get props => [];
}

class GetConfig extends ConfigEvent {}

class SetConfig extends ConfigEvent {}

class ApplyLocalhostLanguageOverride extends ConfigEvent {}

class UpdateBaseUrl extends ConfigEvent {
  final String baseUrl;

  const UpdateBaseUrl(this.baseUrl);

  @override
  List<Object?> get props => [baseUrl];
}

class UpdateAppLanguage extends ConfigEvent {
  final LanguageModel languageModel;

  const UpdateAppLanguage(this.languageModel);

  @override
  List<Object?> get props => [languageModel];
}

class UpdateIsUserRemembered extends ConfigEvent {
  final bool isUserRemembered;

  const UpdateIsUserRemembered(this.isUserRemembered);

  @override
  List<Object?> get props => [isUserRemembered];
}

class UpdateIsServerUrlRemembered extends ConfigEvent {
  final bool isServerUrlRemembered;

  const UpdateIsServerUrlRemembered(this.isServerUrlRemembered);

  @override
  List<Object?> get props => [isServerUrlRemembered];
}
