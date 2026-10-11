import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_calendar_entry/src/config/calendar_module.dart';
import 'package:copor_cloud/src/config/cloud_module.dart';
import 'package:copor_contacts/src/config/contacts_module.dart';
import 'package:copor_help/src/config/help_module.dart';
import 'package:copor_news/src/config/news_module.dart';
import 'package:copor_todo/src/config/to_do_module.dart';
import 'package:copor_todo/src/config/to_do_routes.dart';
import 'package:copor_vu_meet/src/config/vu_meet_module.dart';

/// Where a signed-in user lands. Each app picks its own; it must be a route
/// one of the enabled modules (or core) provides, and not one a module already
/// has in the bottom navigation (that would show two tabs to the same page).
const String homeRoute = ToDoRoutes.todo;

/// The optional modules this app includes. Remove an entry to leave the
/// feature out; core wires up only what is listed here.
const List<CoporModule> enabledModules = [
  VuMeetModule(),
  ToDoModule(),
  CloudModule(),
  NewsModule(),
  CalendarModule(),
  ContactsModule(),
  HelpModule(),
];
