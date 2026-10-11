import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_theme/copor_theme.dart';

import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_state.dart';
import 'package:copor_todo/src/logic/tag_section/tag_section_bloc.dart';
import 'package:copor_todo/src/logic/tag_section/tag_section_event.dart';
import 'package:copor_todo/src/logic/tag_section/tag_section_state.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_todo/src/presentation/modals/edit_private_tags_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

DTTag _toDTTag(TagModel t) => DTTag(
  id: t.id,
  name: t.name,
  color: t.color,
  isPrivate: t.isPrivate,
  description: t.description,
);

TagModel _fromDTTag(DTTag t) => TagModel(
  id: t.id,
  name: t.name,
  color: t.color,
  isPrivate: t.isPrivate,
  description: t.description,
);

class EditPrivateTagsScreenWrapper extends StatelessWidget {
  const EditPrivateTagsScreenWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<PrivateTagListBloc, PrivateTagListState>(
      builder: (context, state) {
        final translations = context
            .watch<TranslationBloc<TodoPageTranslation>>()
            .state
            .ensuredData;
        final tagList = state.result?.data ?? [];

        return EditPrivateTagsScreen(translations: translations, tagList: tagList);
      },
    );
  }
}

class TagSection extends StatelessWidget {
  final List<TagModel> availableTags;
  final TodoPageTranslation translations;
  final VoidCallback? onEditTags;

  const TagSection({
    super.key,
    required this.availableTags,
    required this.translations,
    this.onEditTags,
  });

  void _showTagsScreen(BuildContext context) {
    final tagListBloc = context.read<PrivateTagListBloc>();
    final tagFormBloc = context.read<PrivateTagFormBloc>();
    final translationBloc = context.read<TranslationBloc<TodoPageTranslation>>();

    showDialog(
      context: context,
      useSafeArea: false,
      barrierDismissible: true,
      barrierColor: Colors.black.withValues(alpha: 0.45),
      builder: (dialogContext) {
        return MultiBlocProvider(
          providers: [
            BlocProvider.value(value: tagListBloc),
            BlocProvider.value(value: tagFormBloc),
            BlocProvider.value(value: translationBloc),
          ],
          child: const EditPrivateTagsScreenWrapper(),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<TagSectionBloc, TagSectionState>(
      builder: (context, state) {
        return DTTagDropdown(
          selectedValues: state.selectedTags.map(_toDTTag).toList(),
          items: availableTags.map(_toDTTag).toList(),
          onChanged: (tags) =>
              context.read<TagSectionBloc>().add(TagsUpdated(tags.map(_fromDTTag).toList())),
          label: translations.TAGS,
          searchLabel: translations.SELECT_TAGS,
          actionButtonLabel: translations.EDIT_TAGS,
          onAction: onEditTags ?? () => _showTagsScreen(context),
        );
      },
    );
  }
}
