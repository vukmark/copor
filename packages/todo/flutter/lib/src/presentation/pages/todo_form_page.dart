import 'package:copor_todo/src/logic/utils/to_do_context_extensions.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_core/src/components/scaffold/stacked_on_top/error_screen.dart';
import 'package:copor_todo/src/config/to_do_routes.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_list/tag_list_bloc.dart';
import 'package:copor_todo/src/logic/tag_section/tag_section_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/utils/tag_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/create_tag_dto.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_todo/src/presentation/widgets/tag_section.dart';
import 'package:copor_todo/src/logic/all_tags_for_user/all_tags_for_user_bloc.dart';
import 'package:copor_todo/src/logic/private_tags_management/private_tags_management_bloc.dart';
import 'package:copor_todo/src/logic/private_tags_management/private_tags_management_event.dart';
import 'package:copor_todo/src/logic/private_tags_management/private_tags_management_state.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_bloc.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_event.dart';
import 'package:copor_todo/src/logic/utils/to_do_bloc_event_dispatcher.dart';
import 'package:copor_todo/src/data/model/create_todo_dto.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_todo/src/presentation/widgets/todo_attachment_picker.dart';
import 'package:copor_todo/src/presentation/widgets/todo_dropdown_options.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

// ─── Page ─────────────────────────────────────────────────────────────────────

class TodoFormPage extends HookWidget {
  final String? id;
  final String? type;
  const TodoFormPage({super.key, this.id, this.type});

  @override
  Widget build(BuildContext context) {
    final stepIndex = useState(0);

    useEffect(() {
      final tagListBloc = context.read<TagListBloc>();
      if (tagListBloc.state.result == null) {
        TagBlocEventDispatcher.tag.getPublicTagList(tagListBloc, FilterListDTO.empty());
      }
      if (id != null) {
        TodoBlocEventDispatcher.toDo.getTodo(context.getBloc.todoForm, id!, type!);
      }
      return null;
    }, [id]);

    final translationState = context.watchState.todoTranslation;
    final todoState = context.watchState.todoForm;
    final allTagsForUserState = context.watch<AllTagsForUserBloc>().state;
    final isLoading =
        BlocStateConditions.hasInitialStates([translationState, allTagsForUserState]) ||
        (todoState.isLoading && todoState.result == null) ||
        (todoState.isInitial && id != null);
    final isSaving = todoState.isLoading && todoState.result != null;
    final failure = BlocStateConditions.getFirstFailure([
      todoState,
      allTagsForUserState,
      translationState,
    ]);

    return BlocProvider(
      create: (_) => PrivateTagsManagementBloc(),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isMobile = constraints.maxWidth < kMobileBreakpoint;

          if (failure != null) {
            return DTModalShell(
              isMobile: isMobile,
              builder: (_) => ErrorScreen(failure: failure),
            );
          }

          return DTModalShell(
            isMobile: isMobile,
            isLoading: isLoading,
            builder: (context) => BlocProvider(
              create: (context) => TagSectionBloc(
                initialSelectedTags: id == null
                    ? []
                    : context.read<TodoFormBloc>().state.ensuredData.tagList ?? [],
              ),
              child: IndexedStack(
                index: stepIndex.value,
                children: [
                  TodoForm(
                    translation: translationState.ensuredData,
                    todo: id == null ? TodoModel.empty() : todoState.ensuredData,
                    tagListForUser: allTagsForUserState.ensuredData,
                    id: id,
                    isLoading: isSaving,
                    onEditTags: () => stepIndex.value = 1,
                  ),
                  _EditTagsStep(
                    translation: translationState.ensuredData,
                    onBack: () => stepIndex.value = 0,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class TodoForm extends HookWidget {
  final TodoPageTranslation translation;
  final TodoModel todo;
  final List<TagModel> tagListForUser;
  final String? id;
  final VoidCallback onEditTags;
  final bool isLoading;

  const TodoForm({
    super.key,
    required this.translation,
    required this.todo,
    required this.tagListForUser,
    required this.onEditTags,
    this.id,
    this.isLoading = false,
  });

  @override
  Widget build(BuildContext context) {
    final commonTranslation = context.getState.commonTranslation.ensuredData;
    final formKey = useMemoized(() => GlobalKey<FormState>());
    final titleController = useTextEditingController();
    final deadlineController = useTextEditingController();
    final selectedProgress = useState<String?>(null);
    final selectedPriority = useState<String?>(null);
    final selectedType = useState<String?>(null);
    final selectedDeadline = useState<DateTime?>(null);
    final attachments = useState<List<MediaFileModel>>(const []);

    useEffect(() {
      final deadline = todo.deadline;
      final deadlineDate = deadline != null ? DateTime.parse(deadline).toLocal() : null;
      titleController.text = todo.title;
      selectedProgress.value = todo.progress;
      selectedType.value = todo.type.isNotEmpty ? todo.type : TodoType.private;
      selectedPriority.value = todo.priority.id;
      selectedDeadline.value = deadlineDate;
      if (deadlineDate != null) {
        deadlineController.text = formatFullDateTime(deadlineDate);
      } else {
        deadlineController.clear();
      }
      return null;
    }, [todo]);

    void onSubmit() {
      if (!formKey.currentState!.validate()) return;
      final dto = CreateToDoDTO(
        id: id,
        title: titleController.text.trim(),
        priority: selectedPriority.value ?? '',
        progress: selectedProgress.value ?? '',
        type: selectedType.value ?? TodoType.private,
        deadline: selectedDeadline.value != null ? formatDeadline(selectedDeadline.value!) : null,
        isDisplayedInCalendar: false,
        isPinned: false,
        tagList: context.read<TagSectionBloc>().state.selectedTags.map((t) => t.id).toList(),
      );
      if (id != null) {
        TodoBlocEventDispatcher.toDo.updateTodo(context.read<TodoFormBloc>(), dto);
      } else {
        TodoBlocEventDispatcher.toDo.createTodo(
          context.read<TodoFormBloc>(),
          dto,
          attachments: attachments.value,
        );
      }
    }

    useEffect(() {
      context.read<TodoFormBloc>().add(RegisterValidationAndSubmitCallback(onSubmit));
      return null;
    }, []);

    return DTCoporForm(
      formKey: formKey,
      id: id,
      onSubmit: onSubmit,
      isLoading: isLoading,
      onCancel: () => goToPage(ToDoRoutes.todo),
      editTitle: translation.EDIT_TODO,
      createTitle: translation.ADD_TODO,
      saveLabel: translation.SAVE,
      cancelLabel: translation.CANCEL,
      formContent: Column(
        children: [
          DTInputField(
            controller: titleController,
            label: translation.DESCRIPTION,
            required: translation.REQUIRED_TITLE_MESSAGE,
            maxLines: 3,
          ),
          DTDateTimeInput(
            controller: deadlineController,
            selectedDateTime: selectedDeadline.value,
            onDateTimeSelected: (d) {
              selectedDeadline.value = d;
              deadlineController.text = formatFullDateTime(d);
            },
            onClear: () {
              selectedDeadline.value = null;
              deadlineController.clear();
            },
            label: translation.DUE_DATE,
            required: translation.REQUIRED_TITLE_MESSAGE,
            locale: Locale(context.config.currentLanguage.code),
            saveLabel: translation.SAVE,
            cancelLabel: translation.CANCEL,
            selectDateLabel: translation.SELECT_DATE,
            selectTimeLabel: commonTranslation.SELECT_TIME,
          ),
          DTDropdown<String>.single(
            value: selectedProgress.value,
            items: getProgressOptions(translation),
            onChanged: (v) => selectedProgress.value = v,
            label: translation.PROGRESS,
          ),
          DTDropdown<String>.single(
            value: selectedPriority.value,
            items: getPriorityOptions(translation),
            onChanged: (v) => selectedPriority.value = v,
            label: translation.PRIORITY,
          ),
          TagSection(
            availableTags: tagListForUser,
            translations: translation,
            onEditTags: onEditTags,
          ),
          if (id == null) ...[
            const SizedBox(height: 8),
            TodoAttachmentPicker(
              browseLabel: translation.BROWSE_FILES,
              dropFilesLabel: translation.DROP_FILES_HERE_TO_UPLOAD,
              onChanged: (files) => attachments.value = files,
            ),
          ],
        ],
      ),
    );
  }
}

// ─── Edit Tags Step ────────────────────────────────────────────────────────────

class _EditTagsStep extends StatelessWidget {
  final TodoPageTranslation translation;
  final VoidCallback onBack;

  const _EditTagsStep({required this.translation, required this.onBack});

  void _confirmDelete(BuildContext context, String tagId) async {
    final confirmed = await DTDialog.showConfirm(
      context,
      title: translation.DO_YOU_WANT_TO_DELETE_THIS_TAG,
      content: '',
      cancelLabel: translation.NO,
      confirmLabel: translation.YES,
    );
    if (confirmed == true && context.mounted) {
      TagBlocEventDispatcher.tag.deletePrivateTag(context.read<PrivateTagListBloc>(), tagId);
    }
  }

  @override
  Widget build(BuildContext context) {
    final uiState = context.watch<PrivateTagsManagementBloc>().state;
    final tagList = context.watch<PrivateTagListBloc>().state.result?.data ?? [];
    final colors = getColorsForUser(context);

    return DTFloatingLayout(
      title: translation.EDIT_TAGS,
      actionPosition: FloatingContainerActionPosition.bottom,
      leading: DTButton.surface(label: translation.BACK_TO_TASK, onPressed: onBack),
      trailing: DTButton.positive(
        label: translation.ADD,
        onPressed: () => context.read<PrivateTagsManagementBloc>().add(AddTagToggled()),
      ),
      children: [
        AnimatedSize(
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
          child: uiState.isAddingTag
              ? _AddTagRow(translation: translation, state: uiState, colors: colors)
              : const SizedBox.shrink(),
        ),
        if (tagList.isEmpty && !uiState.isAddingTag)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 24),
            child: DTEmptyState(
              icon: DTIcons.tag,
              title: translation.YOU_DONT_HAVE_ANY_PRIVATE_TAGS,
              subtitle: translation.CLICK_ON_THE_BUTTON_TO_CREATE_TAG,
              ctaLabel: translation.ADD_TAG,
              ctaIcon: DTIcons.add,
              onCta: () => context.read<PrivateTagsManagementBloc>().add(AddTagToggled()),
            ),
          )
        else
          ...tagList.map(
            (tag) => _TagRow(
              key: ValueKey(tag.id),
              tag: tag,
              colors: colors,
              translation: translation,
              onConfirmDelete: (id) => _confirmDelete(context, id),
            ),
          ),
      ],
    );
  }
}

// ─── Add Tag Row ───────────────────────────────────────────────────────────────

class _AddTagRow extends HookWidget {
  final TodoPageTranslation translation;
  final PrivateTagsManagementState state;
  final Map<int, Color> colors;

  const _AddTagRow({required this.translation, required this.state, required this.colors});

  @override
  Widget build(BuildContext context) {
    final controller = useTextEditingController();

    void createTag() {
      final name = controller.text.trim();
      if (name.isEmpty) return;
      TagBlocEventDispatcher.tag.createPrivateTag(
        context.read<PrivateTagFormBloc>(),
        CreateTagDTO(name: name, color: state.newTagColor, isPrivate: true),
      );
      context.read<PrivateTagsManagementBloc>().add(AddTagToggled());
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          DTColorPicker(
            availableColors: colors,
            selectedColorEnum: state.newTagColor,
            onColorSelected: (c) {
              if (c != null) context.read<PrivateTagsManagementBloc>().add(NewTagColorChanged(c));
            },
          ),
          const SizedBox(width: 10),
          Expanded(
            child: DTInputField(
              controller: controller,
              label: translation.TAG_NAME,
              onChanged: (v) => context.read<PrivateTagsManagementBloc>().add(NewTagNameChanged(v)),
            ),
          ),
          SizedBox(width: 20),
          DTDivider.vertical(),
          SizedBox(width: 10),
          Padding(
            padding: DTPadding.input,
            child: Row(
              children: [
                DTButton.positive(
                  icon: DTIcons.confirm,
                  label: '',
                  onPressed: createTag,
                  inputSize: DTInputSize.small,
                ),
                const SizedBox(width: 5),
                DTButton.surface(
                  icon: DTIcons.close,
                  label: '',
                  onPressed: () => context.read<PrivateTagsManagementBloc>().add(AddTagToggled()),
                  inputSize: DTInputSize.small,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ─── Tag Row ───────────────────────────────────────────────────────────────────

class _TagRow extends HookWidget {
  final TagModel tag;
  final Map<int, Color> colors;
  final TodoPageTranslation translation;
  final void Function(String tagId) onConfirmDelete;

  const _TagRow({
    super.key,
    required this.tag,
    required this.colors,
    required this.translation,
    required this.onConfirmDelete,
  });

  @override
  Widget build(BuildContext context) {
    final state = context.watch<PrivateTagsManagementBloc>().state;
    final isEditing = state.editingTagIds.contains(tag.id);
    final controller = useTextEditingController(text: tag.name);

    useEffect(() {
      if (isEditing) controller.text = state.editingTagNames[tag.id] ?? tag.name;
      return null;
    }, [isEditing]);

    void updateTag() {
      final name = controller.text.trim();
      if (name.isEmpty) return;
      TagBlocEventDispatcher.tag.updatePrivateTag(
        context.read<PrivateTagFormBloc>(),
        CreateTagDTO(
          id: tag.id,
          name: name,
          color: state.editingTagColors[tag.id] ?? tag.color,
          isPrivate: true,
        ),
      );
      context.read<PrivateTagsManagementBloc>().add(EditModeToggled(tag));
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          DTColorPicker(
            availableColors: colors,
            selectedColorEnum: isEditing
                ? (state.editingTagColors[tag.id] ?? tag.color)
                : tag.color,
            onColorSelected: (c) {
              if (c != null) {
                context.read<PrivateTagsManagementBloc>().add(EditingTagColorChanged(tag.id, c));
              }
            },
            enabled: isEditing,
            padding: EdgeInsets.zero,
          ),
          const SizedBox(width: 10),
          Expanded(
            child: DTInputField(
              controller: controller,
              label: translation.TAG_NAME,
              enabled: isEditing,
              onChanged: (v) =>
                  context.read<PrivateTagsManagementBloc>().add(EditingTagNameChanged(tag.id, v)),
              padding: EdgeInsets.zero,
            ),
          ),
          SizedBox(width: 20),
          DTDivider.vertical(),
          SizedBox(width: 10),
          if (isEditing) ...[
            Padding(
              padding: DTPadding.input,
              child: Row(
                children: [
                  DTButton.positive(
                    icon: DTIcons.confirm,
                    label: '',
                    inputSize: DTInputSize.small,
                    onPressed: updateTag,
                  ),
                  const SizedBox(width: 5),
                  DTButton.surface(
                    icon: DTIcons.close,
                    label: '',
                    inputSize: DTInputSize.small,
                    onPressed: () =>
                        context.read<PrivateTagsManagementBloc>().add(EditModeToggled(tag)),
                  ),
                ],
              ),
            ),
          ] else ...[
            DTButton.surface(
              icon: DTIcons.edit,
              label: '',
              inputSize: DTInputSize.small,
              onPressed: () => context.read<PrivateTagsManagementBloc>().add(EditModeToggled(tag)),
            ),
            const SizedBox(width: 5),
            DTButton.surface(
              icon: DTIcons.delete,
              label: '',
              inputSize: DTInputSize.small,
              onPressed: () => onConfirmDelete(tag.id),
            ),
          ],
        ],
      ),
    );
  }
}
