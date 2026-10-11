import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_contacts/src/bloc/contact_bloc.dart';
import 'package:copor_contacts/src/bloc/utils/contact_bloc_event_dispatcher.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:copor_contacts/src/data/repository/contact_repository.dart';
import 'package:flutter/widgets.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class ContactBlocFactory {
  static ContactBloc createBloc(BuildContext context) {
    final repo = getIt<ContactRepository>();
    return ContactBloc(repo);
  }

  static TranslationBloc<ContactPageTranslation> initializeContactTranslationBloc(
    BuildContext context,
  ) {
    final bloc = getIt<TranslationBloc<ContactPageTranslation>>();

    ContactBlocEventDispatcher.translation.getContactTranslation(
      bloc,
      context.config.currentLanguage,
    );

    return bloc;
  }
}
