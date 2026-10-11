import 'package:copor_todo/src/logic/all_tags_for_user/all_tags_for_user_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_bloc.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_bloc.dart';
import 'package:copor_todo/src/logic/utils/to_do_bloc_event_dispatcher.dart';
import 'package:copor_todo/src/config/to_do_dependency_injection.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:flutter/material.dart';

class TodoBlocFactory {
  static final translation = _ToDoTranslation();

  static TodoListBloc initializeTodoListBloc(BuildContext context) {
    return getIt<TodoListBloc>();
  }

  static AllTagsForUserBloc initializeAllTagsForUserBloc(BuildContext context) {
    final bloc = getIt<AllTagsForUserBloc>();
    TodoBlocEventDispatcher.toDo.getAllTagsForUser(bloc);
    return bloc;
  }

  static TodoFormBloc initializeTodoFormBloc() {
    return getIt<TodoFormBloc>();
  }
}

class _ToDoTranslation {
  TranslationBloc<TodoPageTranslation> initializeTodoTranslationBloc(BuildContext context) {
    final bloc = getIt<TranslationBloc<TodoPageTranslation>>();
    TodoBlocEventDispatcher.translation.getTodoTranslation(bloc, context.config.currentLanguage);
    return bloc;
  }
}
