import 'package:copor_core/src/core/module/module_search_section.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_todo/src/config/to_do_dependency_injection.dart' as to_do_di;
import 'package:copor_todo/src/config/to_do_router.dart';
import 'package:copor_todo/src/config/to_do_routes.dart';
import 'package:copor_todo/src/presentation/search/to_do_search_section.dart';
import 'package:copor_todo/src/presentation/to_do_scaffold.dart';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

class ToDoModule extends CoporModule {
  const ToDoModule();

  @override
  String get name => 'todo';

  // The ToDo page shows the VuMeet chat list (to_do_module_root.dart) and
  // opens attachments in Cloud's file viewer (todo_details_dialog.dart).
  @override
  List<String> get dependsOn => const ['vu_meet', 'cloud'];

  @override
  Future<void> registerDependencies() => to_do_di.init();

  @override
  List<StatefulShellBranch> get routeBranches => [createToDoRoute()];

  @override
  List<ModuleSearchSection> get searchSections => const [ToDoSearchSection()];

  @override
  Object? pageScaffold(BuildContext context, GoRouterState state, String path) {
    switch (path) {
      case ToDoRoutes.todo:
      case ToDoRoutes.todoEditNew:
      case ToDoRoutes.todoEditExisting:
        return TodoScaffold(state);
    }
    return null;
  }
}
