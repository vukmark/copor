import 'package:copor_core/src/modules/preferences/data/model/update_preferences_dto.dart';
import 'package:equatable/equatable.dart';

sealed class PreferencesEvent extends Equatable {
  const PreferencesEvent();

  @override
  List<Object?> get props => [];
}

class GetPreferences extends PreferencesEvent {}

class UpdatePreferences extends PreferencesEvent {
  final UpdatePreferencesDTO preferences;
  const UpdatePreferences(this.preferences);
}
