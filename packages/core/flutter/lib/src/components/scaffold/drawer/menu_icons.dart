import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/widgets.dart';

/// Maps icon names delivered by the backend menu endpoint to actual icons.
/// Icon fonts are tree-shaken, so the mapping has to stay explicit —
/// new backend icon names must be added here as well.
const Map<String, IconData> _menuIconMap = {
  'listCheck': PhosphorIconsThin.listChecks,
  'userGroup': PhosphorIconsThin.users,
  'user': PhosphorIconsThin.user,
  'users': PhosphorIconsThin.users,
  'cloud': PhosphorIconsThin.cloud,
  'message': PhosphorIconsThin.chatCentered,
  'magnifyingGlass': PhosphorIconsThin.magnifyingGlass,
  'addressBook': PhosphorIconsThin.addressBook,
  'book': PhosphorIconsThin.book,
  'userShield': PhosphorIconsThin.shieldStar,
  'circleQuestion': PhosphorIconsThin.question,
  'robotAstromech': PhosphorIconsThin.robot,
  'bookOpen': PhosphorIconsThin.bookOpen,
  'lightbulb': PhosphorIconsThin.lightbulb,
  'headset': PhosphorIconsThin.headset,
  'newspaper': PhosphorIconsThin.newspaper,
  'peopleGroup': PhosphorIconsThin.usersThree,
  'envelope': PhosphorIconsThin.envelope,
  'circleInfo': PhosphorIconsThin.info,
  'tools': PhosphorIconsThin.wrench,
};

IconData menuIcon(String name) => _menuIconMap[name] ?? PhosphorIconsThin.question;
