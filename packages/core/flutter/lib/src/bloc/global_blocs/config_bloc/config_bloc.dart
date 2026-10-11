import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:copor_core/src/data/repository_impl/config/config_repository.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_event.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'config_state.dart';

class ConfigBloc extends Bloc<ConfigEvent, ConfigState> {
  final ConfigRepository _configRepository;

  ConfigModel? currentConfigModel;
  ConfigModel? newConfigModel;

  ConfigBloc({required ConfigRepository configRepository})
    : _configRepository = configRepository,
      super(ConfigState.fetched(result: Result(data: configRepository.getCachedConfig()))) {
    on<GetConfig>(_onGetConfig);
    on<UpdateBaseUrl>(_onUpdateBaseUrl);
    on<UpdateIsUserRemembered>(_onUpdateIsUserRemembered);
    on<UpdateIsServerUrlRemembered>(_onUpdateIsServerUrlRemembered);
    on<SetConfig>(_onSetConfig);
    on<UpdateAppLanguage>(_onUpdateAppLanguage);
    on<ApplyLocalhostLanguageOverride>(_onApplyLocalhostLanguageOverride);
  }

  Future<void> _onGetConfig(GetConfig event, Emitter<ConfigState> emit) async {
    emit(ConfigState.loading(result: state.result));

    final result = await _configRepository.getConfig();
    result.fold(
      (failure) {
        emit(ConfigState.failure(failure: failure, result: state.result));
      },
      (success) {
        currentConfigModel = success.data;
        newConfigModel = success.data;
        emit(ConfigState.fetched(result: success));
      },
    );
  }

  Future<void> _onSetConfig(SetConfig event, Emitter<ConfigState> emit) async {
    emit(ConfigState.loading(result: state.result));

    final setConfigRequest = await _configRepository.setConfig(newConfigModel!);
    setConfigRequest.fold(
      (failure) {
        emit(ConfigState.failure(failure: failure, result: state.result));
      },
      (_) {
        add(GetConfig());
      },
    );
  }

  void _onUpdateBaseUrl(UpdateBaseUrl event, Emitter<ConfigState> emit) {
    newConfigModel = state.ensuredData.copyWith(baseUrl: event.baseUrl, isServerUrlNotSet: false);
    add(SetConfig());
  }

  void _onUpdateIsUserRemembered(UpdateIsUserRemembered event, Emitter<ConfigState> emit) {
    newConfigModel = state.ensuredData.copyWith(isUserRemembered: event.isUserRemembered);
    add(SetConfig());
  }

  void _onUpdateIsServerUrlRemembered(
    UpdateIsServerUrlRemembered event,
    Emitter<ConfigState> emit,
  ) {
    newConfigModel = state.ensuredData.copyWith(isServerRemembered: event.isServerUrlRemembered);
    add(SetConfig());
  }

  void _onUpdateAppLanguage(UpdateAppLanguage event, Emitter<ConfigState> emit) {
    if (state.result == null) return;
    newConfigModel = state.ensuredData.copyWith(language: event.languageModel);
    add(SetConfig());
  }

  void _onApplyLocalhostLanguageOverride(
    ApplyLocalhostLanguageOverride event,
    Emitter<ConfigState> emit,
  ) {
    const localhostBaseUrl = 'http://localhost:3000';
    const englishLanguageCode = 'en';

    if (state.result == null) return;

    final config = state.ensuredData;
    final normalizedBaseUrl = config.baseUrl.trim().replaceAll(RegExp(r'/+$'), '');
    if (normalizedBaseUrl != localhostBaseUrl || config.language.code == englishLanguageCode) {
      return;
    }

    newConfigModel = config.copyWith(language: LanguageModel.defaultEnglish());
    add(SetConfig());
  }
}
