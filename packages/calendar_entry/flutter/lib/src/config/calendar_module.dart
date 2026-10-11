import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_calendar_entry/src/config/calendar_dependency_injection.dart' as calendar_di;

class CalendarModule extends CoporModule {
  const CalendarModule();

  // Same name as the server module.
  @override
  String get name => 'calendar_entry';

  // The calendar's "new ToDo" action opens the ToDo form (calendar_scaffold.dart).
  @override
  List<String> get dependsOn => const ['todo'];

  @override
  Future<void> registerDependencies() => calendar_di.init();
}
