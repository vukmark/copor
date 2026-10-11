import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/widgets.dart';

/// Maps icon names delivered by the backend dashboard-menu endpoint to actual icons.
/// Icon fonts are tree-shaken, so the mapping has to stay explicit —
/// new backend icon names must be added here as well.
const Map<String, IconData> _dashboardMenuIconMap = {
  'key': PhosphorIconsThin.key,
  'shieldUser': PhosphorIconsThin.userGear,
  'shieldCheck': PhosphorIconsThin.shieldCheck,
  'family': PhosphorIconsThin.usersThree,
  'user': PhosphorIconsThin.user,
  'userGroup': PhosphorIconsThin.users,
  'chalkboardUser': PhosphorIconsThin.presentation,
  'fileLines': PhosphorIconsThin.fileText,
  'calendarDays': PhosphorIconsThin.calendarDots,
  'addressCard': PhosphorIconsThin.identificationCard,
  'chartSimple': PhosphorIconsThin.chartBar,
  'chartPyramid': PhosphorIconsThin.stairs,
  'tag': PhosphorIconsThin.tag,
  'bookOpen': PhosphorIconsThin.bookOpen,
  'book': PhosphorIconsThin.book,
  'clockRotateLeft': PhosphorIconsThin.clockCounterClockwise,
  'flag': PhosphorIconsThin.flag,
  'map': PhosphorIconsThin.mapTrifold,
  'city': PhosphorIconsThin.city,
  'globe': PhosphorIconsThin.globe,
  'buildingColumns': PhosphorIconsThin.bank,
  'userShield': PhosphorIconsThin.shieldStar,
  'toggleOn': PhosphorIconsThin.toggleRight,
  'shieldKeyhole': PhosphorIconsThin.lockKey,
  'gear': PhosphorIconsThin.gear,
  'trash': PhosphorIconsThin.trash,
  'robot': PhosphorIconsThin.robot,
};

IconData dashboardMenuIcon(String name) =>
    _dashboardMenuIconMap[name] ?? PhosphorIconsThin.question;
