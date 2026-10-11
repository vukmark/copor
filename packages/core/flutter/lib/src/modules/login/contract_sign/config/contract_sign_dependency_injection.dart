import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/config/router/app_router.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/modules/login/contract_sign/data/model/translation/contract_sign_translation.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerFactoryBlocs();
}

void registerFactoryBlocs() {
  getIt.registerLazySingleton<GoRouter>(() => appRouter);
  getIt.registerFactory<TranslationBloc<ContractSignPageTranslation>>(
    () => TranslationBloc<ContractSignPageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );
}
