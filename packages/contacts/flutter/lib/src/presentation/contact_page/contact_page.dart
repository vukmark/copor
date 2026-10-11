import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:copor_contacts/src/presentation/contact_page/contact_content_view.dart';
import 'package:flutter/material.dart';

class ContactPage extends StatelessWidget {
  final String? contactId;

  const ContactPage({super.key, this.contactId});

  @override
  Widget build(BuildContext context) {
    return GuardedBlocBuilder<
      TranslationBloc<ContactPageTranslation>,
      TranslationState<ContactPageTranslation>
    >(
      builder: (context, translationState) {
        return ContactContentView(translation: translationState.ensuredData, contactId: contactId);
      },
    );
  }
}
