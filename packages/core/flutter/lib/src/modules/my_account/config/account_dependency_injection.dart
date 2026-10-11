import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/config/key_generator.dart';
import 'package:copor_core/src/modules/my_account/bloc/biometric_unlock/biometric_unlock_cubit.dart';
import 'package:copor_core/src/modules/my_account/bloc/user_account_info/user_account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/data/data_source/account_info_local_source.dart';
import 'package:copor_core/src/modules/my_account/data/data_source/account_info_remote_source.dart';
import 'package:copor_core/src/modules/my_account/data/repository/account_info_repository.dart';
import 'package:copor_core/src/modules/my_account/data/repository/account_info_repository_impl.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerLocalDataSources();
  registerRemoteDataSources();
  registerBlocs();
  registerRepositories();
}

void registerLocalDataSources() {
  getIt.registerLazySingleton<AccountInfoLocalDataSource>(
    () => AccountInfoLocalDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
      keyGenerator: getIt<KeyGenerator>(),
    ),
  );
}

void registerRemoteDataSources() {
  getIt.registerFactory<AccountInfoRemoteDataSource>(
    () => AccountInfoRemoteDataSourceImpl(getIt<Dio>()),
  );
}

void registerRepositories() {
  getIt.registerLazySingleton<AccountInfoRepository>(
    () => AccountInfoRepositoryImpl(
      localDataSource: getIt<AccountInfoLocalDataSource>(),
      remoteDataSource: getIt<AccountInfoRemoteDataSource>(),
      errorHandler: getIt<ErrorHandler>(),
      connectivityService: getIt<ConnectivityService>(),
    ),
  );
}

void registerBlocs() {
  getIt.registerFactory<BiometricUnlockCubit>(
    () => BiometricUnlockCubit(
      sharedPreferences: getIt<SharedPreferences>(),
      userId: getIt<AccountInfoBloc>().state.ensuredData.id,
    ),
  );

  getIt.registerFactory<TranslationBloc<MyAccountPageTranslation>>(
    () => TranslationBloc<MyAccountPageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );

  getIt.registerLazySingleton<AccountInfoBloc>(
    () => AccountInfoBloc(accountInfoRepository: getIt<AccountInfoRepository>()),
  );

  getIt.registerFactory<UserAccountInfoBloc>(
    () => UserAccountInfoBloc(accountInfoRepository: getIt<AccountInfoRepository>()),
  );
}
