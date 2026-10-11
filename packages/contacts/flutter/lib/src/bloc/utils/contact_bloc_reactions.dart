import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_contacts/src/bloc/utils/contact_bloc_event_dispatcher.dart';
import 'package:flutter/widgets.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ContactBlocReactions {
  static final contact = _ContactReaction();
}

class _ContactReaction {
  void getContactPageTranslation(BuildContext context) {
    ContactBlocEventDispatcher.translation.getContactTranslation(
      context.read<TranslationBloc<ContactPageTranslation>>(),
      context.config.currentLanguage,
    );
  }
}
