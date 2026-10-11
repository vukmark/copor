import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class _CloudTranslation {
  TranslationBloc<CloudPageTranslation> initializeCloudTranslationBloc(BuildContext context) {
    final bloc = GetIt.instance<TranslationBloc<CloudPageTranslation>>();

    bloc.add(
      GetTranslationEvent<CloudPageTranslation>(
        namespace: CloudPageTranslation.namespaceStatic,
        languageModel: context.config.currentLanguage,
        constructor: (translationStringList) =>
            CloudPageTranslation(translationStringList: translationStringList),
      ),
    );
    return bloc;
  }
}

class CloudBlocFactory {
  static final translation = _CloudTranslation();
}
