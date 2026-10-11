import 'package:copor_todo/src/logic/utils/to_do_context_extensions.dart';
import 'package:copor_todo/src/logic/utils/to_do_bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';

class TodoListBlocReactions {
  static ToDo toDo = ToDo();
}

class ToDo {
  void getToDoPageTranslation(BuildContext context) {
    TodoBlocEventDispatcher.translation.getTodoTranslation(
      context.getBloc.toDoTranslation,
      context.config.currentLanguage,
    );
  }
}
