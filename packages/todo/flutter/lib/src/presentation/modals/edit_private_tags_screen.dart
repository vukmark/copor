import 'package:copor_theme/copor_theme.dart';
import 'package:copor_todo/src/logic/private_tags_management/private_tags_management_bloc.dart';
import 'package:copor_todo/src/logic/private_tags_management/private_tags_management_event.dart';
import 'package:copor_todo/src/logic/private_tags_management/private_tags_management_state.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/utils/tag_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/create_tag_dto.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class EditPrivateTagsScreen extends StatelessWidget {
  final TodoPageTranslation translations;
  final List<TagModel> tagList;

  const EditPrivateTagsScreen({super.key, required this.translations, this.tagList = const []});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => PrivateTagsManagementBloc(),
      child: DTResponsiveModalLayout(
        onClose: () => Navigator.of(context).pop(),
        child: EditPrivateTagsContentView(translations: translations, tagList: tagList),
      ),
    );
  }
}

class EditPrivateTagsContentView extends StatelessWidget {
  final TodoPageTranslation translations;
  final List<TagModel> tagList;

  const EditPrivateTagsContentView({super.key, required this.translations, required this.tagList});

  void _deleteTag(BuildContext context, String tagId) {
    TagBlocEventDispatcher.tag.deletePrivateTag(context.read<PrivateTagListBloc>(), tagId);
  }

  void _createTag(BuildContext context) {
    final state = context.read<PrivateTagsManagementBloc>().state;
    if (state.newTagName.isEmpty) return;
    TagBlocEventDispatcher.tag.createPrivateTag(
      context.read<PrivateTagFormBloc>(),
      CreateTagDTO(name: state.newTagName, color: state.newTagColor, isPrivate: true),
    );
    context.read<PrivateTagsManagementBloc>().add(AddTagToggled());
  }

  void _updateTag(BuildContext context, String tagId) {
    final state = context.read<PrivateTagsManagementBloc>().state;
    final tagName = state.editingTagNames[tagId] ?? '';
    if (tagName.isEmpty) return;
    TagBlocEventDispatcher.tag.updatePrivateTag(
      context.read<PrivateTagFormBloc>(),
      CreateTagDTO(
        id: tagId,
        name: tagName,
        color: state.editingTagColors[tagId] ?? 0,
        isPrivate: true,
      ),
    );
    final originalTag = tagList.firstWhere((t) => t.id == tagId, orElse: () => TagModel.empty());
    if (originalTag.id.isEmpty) return;
    context.read<PrivateTagsManagementBloc>().add(EditModeToggled(originalTag));
  }

  @override
  Widget build(BuildContext context) {
    final uiState = context.watch<PrivateTagsManagementBloc>().state;
    final availableColors = getColorsForUser(context);
    final dc = CoporColors.of(context);

    return Scaffold(
      backgroundColor: dc.surface,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(kToolbarHeight),
        child: DTAppBar(
          title: translations.EDIT_TAGS,
          isMobile: true,
          leading: DTButton.surface(
            icon: PhosphorIconsThin.caretLeft,
            label: '',
            onPressed: () => Navigator.of(context).pop(),
          ),
          actions: [
            DTButton.positive(
              label: translations.ADD,
              onPressed: () => context.read<PrivateTagsManagementBloc>().add(AddTagToggled()),
            ),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            AnimatedSize(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeInOut,
              child: Align(
                alignment: Alignment.topCenter,
                child: uiState.isAddingTag
                    ? _buildAddTagRow(context, uiState, availableColors)
                    : const SizedBox.shrink(),
              ),
            ),
            tagList.isEmpty
                ? _buildEmptyState(context)
                : _buildTagList(context, uiState, availableColors),
          ],
        ),
      ),
    );
  }

  Widget _buildAddTagRow(
    BuildContext context,
    PrivateTagsManagementState uiState,
    Map<int, Color> availableColors,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6.0),
      child: Row(
        children: [
          DTColorPicker(
            availableColors: availableColors,
            selectedColorEnum: uiState.newTagColor,
            onColorSelected: (color) {
              if (color != null)
                context.read<PrivateTagsManagementBloc>().add(NewTagColorChanged(color));
            },
          ),
          const SizedBox(width: 10.0),
          Expanded(
            child: TextFormField(
              initialValue: uiState.newTagName,
              onChanged: (value) =>
                  context.read<PrivateTagsManagementBloc>().add(NewTagNameChanged(value)),
              decoration: InputDecoration(
                labelText: translations.TAG_NAME,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                contentPadding: const EdgeInsets.symmetric(vertical: 13.0, horizontal: 16.0),
              ),
            ),
          ),
          const SizedBox(width: 10),
          DTButton.surface(
            icon: PhosphorIconsThin.check,
            label: '',
            onPressed: () => _createTag(context),
          ),
          DTButton.surface(
            icon: PhosphorIconsThin.x,
            label: '',
            onPressed: () => context.read<PrivateTagsManagementBloc>().add(AddTagToggled()),
          ),
        ],
      ),
    );
  }

  Widget _buildTagList(
    BuildContext context,
    PrivateTagsManagementState uiState,
    Map<int, Color> availableColors,
  ) {
    return Expanded(
      child: ListView.builder(
        itemCount: tagList.length,
        itemBuilder: (context, index) {
          final tag = tagList[index];
          final isEditing = uiState.editingTagIds.contains(tag.id);

          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 6.0),
            child: Row(
              children: [
                DTColorPicker(
                  availableColors: availableColors,
                  selectedColorEnum: isEditing
                      ? (uiState.editingTagColors[tag.id] ?? tag.color)
                      : tag.color,
                  enabled: isEditing,
                  onColorSelected: (color) {
                    if (color != null)
                      context.read<PrivateTagsManagementBloc>().add(
                        EditingTagColorChanged(tag.id, color),
                      );
                  },
                ),
                const SizedBox(width: 10.0),
                Expanded(
                  child: TextFormField(
                    key: ValueKey(tag.id),
                    initialValue: isEditing
                        ? (uiState.editingTagNames[tag.id] ?? tag.name)
                        : tag.name,
                    enabled: isEditing,
                    onChanged: (value) => context.read<PrivateTagsManagementBloc>().add(
                      EditingTagNameChanged(tag.id, value),
                    ),
                    style: TextStyle(color: CoporColors.of(context).onSurface),
                    decoration: InputDecoration(
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      contentPadding: const EdgeInsets.symmetric(vertical: 13.0, horizontal: 16.0),
                    ),
                  ),
                ),
                const SizedBox(width: 10.0),
                if (isEditing) ...[
                  DTButton.surface(
                    icon: PhosphorIconsThin.check,
                    label: '',
                    onPressed: () => _updateTag(context, tag.id),
                  ),
                  DTButton.surface(
                    icon: PhosphorIconsThin.x,
                    label: '',
                    onPressed: () =>
                        context.read<PrivateTagsManagementBloc>().add(EditModeToggled(tag)),
                  ),
                ] else ...[
                  DTCommonButtons.edit(
                    semanticLabel: '',
                    onPressed: () =>
                        context.read<PrivateTagsManagementBloc>().add(EditModeToggled(tag)),
                  ),
                  DTCommonButtons.delete(
                    semanticLabel: '',
                    onPressed: () => _confirmDelete(context, tag.id),
                  ),
                ],
              ],
            ),
          );
        },
      ),
    );
  }

  void _confirmDelete(BuildContext context, String tagId) async {
    final confirmed = await DTDialog.showConfirm(
      context,
      title: translations.DO_YOU_WANT_TO_DELETE_THIS_TAG,
      content: '',
      cancelLabel: translations.NO,
      confirmLabel: translations.YES,
    );
    if (confirmed == true && context.mounted) {
      _deleteTag(context, tagId);
    }
  }

  Widget _buildEmptyState(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Expanded(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(translations.YOU_DONT_HAVE_ANY_PRIVATE_TAGS, style: dt.text.sectionTitle),
            const SizedBox(height: 8.0),
            Text(
              translations.CLICK_ON_THE_BUTTON_TO_CREATE_TAG,
              textAlign: TextAlign.center,
              style: dt.text.bodyLight,
            ),
          ],
        ),
      ),
    );
  }
}
