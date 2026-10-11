import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/bloc/utils/generic_bloc_listener.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBanner;
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/helper_pages/modal_route_host.dart';
import 'package:copor_core/src/config/router/helper_pages/new_transparent_page.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_todo/src/config/to_do_routes.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_event.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_dto_converter.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_state.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_state.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_form/tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_form/tag_form_state.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_list/tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_list/tag_list_state.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/utils/tag_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/utils/tag_bloc_factory.dart';
import 'package:copor_todo/src/logic/all_tags_for_user/all_tags_for_user_bloc.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_bloc.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_state.dart';
import 'package:copor_todo/src/logic/todo_attachment/todo_attachment_cubit.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_bloc.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_event.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_state.dart';
import 'package:copor_todo/src/logic/utils/to_do_bloc_event_dispatcher.dart';
import 'package:copor_todo/src/logic/utils/to_do_bloc_factory.dart';
import 'package:copor_todo/src/logic/utils/to_do_bloc_reactions.dart';
import 'package:copor_todo/src/config/to_do_keys.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_todo/src/presentation/pages/todo_form_page.dart';
import 'package:copor_todo/src/presentation/to_do_module_root.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

StatefulShellBranch createToDoRoute() {
  return StatefulShellBranch(
    routes: [
      ShellRoute(
        builder: (context, state, child) {
          return MultiBlocProvider(
            providers: _toDoProviders(),
            child: MultiBlocListener(listeners: _toDoListeners(), child: child),
          );
        },
        routes: [
          GoRoute(
            path: ToDoRoutes.todo,
            pageBuilder: (context, state) => const NoAnimationPage(child: ToDoModuleRoot()),
            routes: [
              GoRoute(
                path: ToDoRoutes.relative_edit,
                pageBuilder: (context, state) => NewTransparentPage(
                  key: UniqueKey(),
                  child: ModalRouteHost(
                    dialogBuilder: (ctx) => MultiBlocProvider(
                      providers: [
                        BlocProvider.value(value: ctx.read<TranslationBloc<TodoPageTranslation>>()),
                        BlocProvider.value(value: ctx.read<TodoListBloc>()),
                        BlocProvider.value(value: ctx.read<TodoFormBloc>()),
                        BlocProvider.value(value: ctx.read<AllTagsForUserBloc>()),
                        BlocProvider.value(value: ctx.read<PrivateTagListBloc>()),
                        BlocProvider.value(value: ctx.read<PrivateTagFormBloc>()),
                        BlocProvider.value(value: ctx.read<FilterBloc>()),
                      ],
                      child: const TodoFormPage(),
                    ),
                  ),
                ),
              ),
              GoRoute(
                path: ToDoRoutes.relative_edit_existing,
                pageBuilder: (context, state) {
                  final id = state.pathParameters['id'];
                  final type = state.pathParameters['type'];
                  return NewTransparentPage(
                    key: ValueKey('todo_edit_${id}_$type'),
                    child: ModalRouteHost(
                      dialogBuilder: (ctx) => MultiBlocProvider(
                        providers: [
                          BlocProvider.value(
                            value: ctx.read<TranslationBloc<TodoPageTranslation>>(),
                          ),
                          BlocProvider.value(value: ctx.read<TodoListBloc>()),
                          BlocProvider.value(value: ctx.read<TodoFormBloc>()),
                          BlocProvider.value(value: ctx.read<AllTagsForUserBloc>()),
                          BlocProvider.value(value: ctx.read<PrivateTagListBloc>()),
                          BlocProvider.value(value: ctx.read<PrivateTagFormBloc>()),
                          BlocProvider.value(value: ctx.read<FilterBloc>()),
                        ],
                        child: TodoFormPage(id: id, type: type),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ],
      ),
    ],
  );
}

List<BlocProvider> _toDoProviders() => [
  BlocProvider<TranslationBloc<TodoPageTranslation>>(
    create: (context) => TodoBlocFactory.translation.initializeTodoTranslationBloc(context),
  ),
  BlocProvider<TodoListBloc>(create: (context) => TodoBlocFactory.initializeTodoListBloc(context)),
  BlocProvider<TodoFormBloc>(create: (_) => TodoBlocFactory.initializeTodoFormBloc()),
  BlocProvider<TodoAttachmentCubit>(create: (_) => getIt<TodoAttachmentCubit>()),
  BlocProvider<AllTagsForUserBloc>(
    create: (context) => TodoBlocFactory.initializeAllTagsForUserBloc(context),
  ),
  BlocProvider<PrivateTagListBloc>(
    create: (context) => TagBlocFactory.initializePrivateTagListBloc(context),
  ),
  BlocProvider<PrivateTagFormBloc>(create: (_) => TagBlocFactory.initializePrivateTagFormBloc()),
  BlocProvider<FilterBloc>(
    create: (context) => getIt<FilterBloc>()..add(const LoadFilters('/filter/TODO')),
  ),
];

List<BlocListener> _toDoListeners() => [
  createStandardListener<
    TranslationBloc<TodoPageTranslation>,
    TranslationState<TodoPageTranslation>
  >(
    loadingKey: TodoKeys.toDoPageLoadingTranslationKey,
    failureKey: TodoKeys.toDoPageErrorView,
    warningKey: TodoKeys.toDoPageWarning,
  ),
  LanguageChangeListener(
    additionalLogic: (context, _) {
      TodoListBlocReactions.toDo.getToDoPageTranslation(context);
      context.read<FilterBloc>().add(const LoadFilters('/filter/TODO', forceReload: true));
    },
  ),
  FilterListener(
    additionalLogic: (context, filters) {
      context.read<TodoListBloc>().add(GetTodoList(filters));
    },
  ),
  createStandardListener<TodoListBloc, TodoListState>(
    loadingKey: TodoKeys.toDoPageLoadingToDoListKey,
    failureKey: TodoKeys.toDoPageErrorView,
    warningKey: TodoKeys.toDoPageWarning,
    additionalLogic: (context, state) {
      if (state.isDeleted) {
        final translation = context.read<TranslationBloc<TodoPageTranslation>>().state.ensuredData;
        context.getBloc.appScaffold.addBanner(
          DSBanner.success(
            translation.DELETE_TODO_SUCCESS_MESSAGE,
            source: TodoKeys.toDoPageErrorView,
          ),
        );
      }
    },
  ),
  BlocListener<TodoFormBloc, TodoFormState>(
    listenWhen: (previous, current) => current.isUpdated && !previous.isUpdated,
    listener: (context, state) {
      final translation = context.read<TranslationBloc<TodoPageTranslation>>().state.ensuredData;
      if (state.isUpdated == true) {
        final todoListBloc = context.read<TodoListBloc>();
        final filterListDto = FilterDtoConverter.fromState(context.read<FilterBloc>().state);
        TodoBlocEventDispatcher.toDo.getTodoList(todoListBloc, filterListDto);
        goToPage(ToDoRoutes.todo);
        if (state.actionType == ActionType.create) {
          context.getBloc.appScaffold.addBanner(
            DSBanner.success(
              translation.CREATE_TODO_SUCCESS_MESSAGE,
              source: 'todo_create_success',
            ),
          );
        } else if (state.actionType == ActionType.update) {
          context.getBloc.appScaffold.addBanner(
            DSBanner.success(
              translation.UPDATE_TODO_SUCCESS_MESSAGE,
              source: 'todo_update_success',
            ),
          );
        }
      }
    },
  ),
  FailureListener<TodoFormBloc, TodoFormState>(failureKey: 'todo_form_failure'),
  FailureListener<FilterBloc, FilterState>(failureKey: 'filter_bloc_failure'),
  BlocListener<TagFormBloc, TagFormState>(
    listener: (context, state) {
      if (state.isUpdated == true) {
        TodoBlocEventDispatcher.toDo.getAllTagsForUser(context.read<AllTagsForUserBloc>());
      }
    },
  ),
  BlocListener<TagListBloc, TagListState>(
    listenWhen: (prev, curr) => prev.isDeleted != curr.isDeleted,
    listener: (context, state) {
      if (state.isDeleted) {
        TodoBlocEventDispatcher.toDo.getAllTagsForUser(context.read<AllTagsForUserBloc>());
        final todoListBloc = context.read<TodoListBloc>();
        todoListBloc.add(GetTodoList(todoListBloc.state.filterList));
      }
    },
  ),
  BlocListener<PrivateTagFormBloc, PrivateTagFormState>(
    listener: (context, state) {
      if (state.isUpdated == true) {
        TodoBlocEventDispatcher.toDo.getAllTagsForUser(context.read<AllTagsForUserBloc>());
        TagBlocEventDispatcher.tag.getPrivateTagList(context.read<PrivateTagListBloc>());
      }
    },
  ),
  BlocListener<PrivateTagListBloc, PrivateTagListState>(
    listenWhen: (prev, curr) => prev.isDeleted != curr.isDeleted,
    listener: (context, state) {
      if (state.isDeleted) {
        TodoBlocEventDispatcher.toDo.getAllTagsForUser(context.read<AllTagsForUserBloc>());
        TagBlocEventDispatcher.tag.getPrivateTagList(context.read<PrivateTagListBloc>());
      }
    },
  ),
  BlocListener<PrivateTagListBloc, PrivateTagListState>(
    listenWhen: (prev, curr) => !prev.isDeleted && curr.isDeleted,
    listener: (context, state) {
      TodoBlocEventDispatcher.toDo.getAllTagsForUser(context.read<AllTagsForUserBloc>());
      final todoListBloc = context.read<TodoListBloc>();
      todoListBloc.add(GetTodoList(todoListBloc.state.filterList));
    },
  ),
];
