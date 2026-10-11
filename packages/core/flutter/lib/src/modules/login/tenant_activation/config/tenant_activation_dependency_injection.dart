import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:get_it/get_it.dart';

final GetIt getIt = GetIt.instance;

Future<void> init() async {
  registerFactoryBlocs();
}

void registerFactoryBlocs() {
  getIt.registerFactory<TranslationBloc<RegistrationPageTranslation>>(
    () => TranslationBloc<RegistrationPageTranslation>(
      translationRepository: getIt<TranslationRepository>(),
    ),
  );
}
