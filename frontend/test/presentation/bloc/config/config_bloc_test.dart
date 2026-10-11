import 'package:bloc_test/bloc_test.dart';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_event.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import '../../../mock_list.mocks.dart';

void main() {
  late MockConfigRepository mockConfigRepository;
  late ConfigBloc configBloc;

  final cachedConfig = MockConfigModel();
  final testConfig = MockConfigModel();
  final testFailure = MockFailure();

  // The bloc starts out "fetched" with whatever config is cached on the device,
  // so every later state carries that cached result until a fetch replaces it.
  final cachedResult = Result<ConfigModel>(data: cachedConfig);

  setUp(() {
    mockConfigRepository = MockConfigRepository();
    when(mockConfigRepository.getCachedConfig()).thenReturn(cachedConfig);
    configBloc = ConfigBloc(configRepository: mockConfigRepository);
  });

  group('ConfigBloc Tests', () {
    blocTest<ConfigBloc, ConfigState>(
      'emits [ConfigLoading, ConfigFetched] when GetConfig succeeds',
      build: () {
        when(
          mockConfigRepository.getConfig(),
        ).thenAnswer((_) async => Right(Result(data: testConfig)));
        return configBloc;
      },
      act: (bloc) => bloc.add(GetConfig()),
      expect: () => [
        ConfigState.loading(result: cachedResult),
        ConfigState.fetched(result: Result(data: testConfig)),
      ],
      verify: (_) {
        verify(mockConfigRepository.getConfig()).called(1);
      },
    );

    blocTest<ConfigBloc, ConfigState>(
      'emits [ConfigLoading, ConfigFailed] when GetConfig fails',
      build: () {
        when(mockConfigRepository.getConfig()).thenAnswer((_) async => Left(testFailure));
        return configBloc;
      },
      act: (bloc) => bloc.add(GetConfig()),
      expect: () => [
        ConfigState.loading(result: cachedResult),
        ConfigState.failure(failure: testFailure, result: cachedResult),
      ],
      verify: (_) {
        verify(mockConfigRepository.getConfig()).called(1);
      },
    );

    blocTest<ConfigBloc, ConfigState>(
      'emits [ConfigLoading, ConfigFailed] when SetConfig fails',
      build: () {
        when(mockConfigRepository.setConfig(any)).thenAnswer((_) async => Left(testFailure));
        configBloc.currentConfigModel = null;
        configBloc.newConfigModel = testConfig;
        return configBloc;
      },
      act: (bloc) => bloc.add(SetConfig()),
      expect: () => [
        ConfigState.loading(result: cachedResult),
        ConfigState.failure(failure: testFailure, result: cachedResult),
      ],
      verify: (_) {
        verify(mockConfigRepository.setConfig(any)).called(1);
      },
    );

    blocTest<ConfigBloc, ConfigState>(
      'emits [ConfigLoading, ConfigFetched] when SetConfig succeeds',
      build: () {
        when(
          mockConfigRepository.getConfig(),
        ).thenAnswer((_) async => Right(Result(data: testConfig)));
        when(mockConfigRepository.setConfig(any)).thenAnswer((_) async => Right(null));
        configBloc.currentConfigModel = null;
        configBloc.newConfigModel = testConfig;
        return configBloc;
      },
      act: (bloc) => bloc.add(SetConfig()),
      expect: () => [
        ConfigState.loading(result: cachedResult),
        ConfigState.fetched(result: Result(data: testConfig)),
      ],
      verify: (_) {
        verify(mockConfigRepository.setConfig(any)).called(1);
      },
    );
  });
}
