import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

abstract class TranslationBlocEventDispatcher {
  static void getTranslation<T extends TranslationModel>({
    required String namespace,
    required TranslationConstructor<T> constructor,
  }) {
    final context = useContext();

    useEffect(() {
      context.read<TranslationBloc<T>>().add(
        GetTranslationEvent<T>(
          namespace: namespace,
          languageModel: context.config.currentLanguage,
          constructor: constructor,
        ),
      );
      return null;
    }, []);
  }

  static void getTranslationIfNotLoaded<T extends TranslationModel>({
    required String namespace,
    required TranslationConstructor<T> constructor,
  }) {
    final context = useContext();

    useEffect(() {
      context.read<TranslationBloc<T>>().addIfNotLoaded(
        GetTranslationEvent<T>(
          namespace: namespace,
          languageModel: context.config.currentLanguage,
          constructor: constructor,
        ),
      );
      return null;
    }, []);
  }
}
