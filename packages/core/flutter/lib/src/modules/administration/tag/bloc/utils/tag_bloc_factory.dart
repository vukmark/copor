import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_list/tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_form/tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/utils/tag_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/translation/tag_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class TagBlocFactory {
  static _TagTranslation translation = _TagTranslation();

  static TagListBloc initializePublicTagListBloc(BuildContext context) {
    final bloc = getIt<TagListBloc>();
    return bloc;
  }

  static PrivateTagListBloc initializePrivateTagListBloc(BuildContext context) {
    final bloc = getIt<PrivateTagListBloc>();
    TagBlocEventDispatcher.tag.getPrivateTagList(bloc);
    return bloc;
  }

  static TagFormBloc initializeTagFormBloc() {
    return getIt<TagFormBloc>();
  }

  static PrivateTagFormBloc initializePrivateTagFormBloc() {
    return getIt<PrivateTagFormBloc>();
  }
}

class _TagTranslation {
  TranslationBloc<TagPageTranslation> initializeTagPageTranslationBloc(BuildContext context) {
    final bloc = getIt<TranslationBloc<TagPageTranslation>>();
    TagBlocEventDispatcher.translation.getTagTranslation(bloc, context.config.currentLanguage);
    return bloc;
  }
}
