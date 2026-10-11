import 'package:copor_theme/src/utils/phosphor_icons.dart';
import 'package:flutter/material.dart';

/// Semantic icon constants for the Copor design system.
///
/// Use these names instead of raw Phosphor icons (`PhosphorIconsThin.x`) so that changing a
/// single line here updates every component and screen that uses it.
class DTIcons {
  // ── Actions ──────────────────────────────────────────────────────────────────
  static const IconData add = PhosphorIconsThin.plus;
  static const IconData edit = PhosphorIconsThin.pen;
  static const IconData editInline = PhosphorIconsThin.pen;
  static const IconData delete = PhosphorIconsThin.x;
  static const IconData copy = PhosphorIconsThin.copy;
  static const IconData download = PhosphorIconsThin.download;
  static const IconData refresh = PhosphorIconsThin.arrowsClockwise;

  // ── Dismissal / confirmation ──────────────────────────────────────────────────
  static const IconData close = PhosphorIconsThin.x;
  static const IconData clear = PhosphorIconsThin.x;
  static const IconData confirm = PhosphorIconsThin.check;

  // ── Search & filter ───────────────────────────────────────────────────────────
  static const IconData search = PhosphorIconsThin.magnifyingGlass;
  static const IconData filter = PhosphorIconsThin.funnel;
  static const IconData sort = PhosphorIconsThin.sortAscending;
  static const IconData sortNeutral = PhosphorIconsThin.arrowsDownUp;
  static const IconData sortAsc = PhosphorIconsThin.caretUp;
  static const IconData sortDesc = PhosphorIconsThin.caretDown;

  // ── Navigation ────────────────────────────────────────────────────────────────
  static const IconData back = PhosphorIconsThin.caretLeft;
  static const IconData forward = PhosphorIconsThin.caretRight;
  static const IconData chevronDown = PhosphorIconsThin.caretDown;
  static const IconData chevronUp = PhosphorIconsThin.caretUp;
  static const IconData dropdownArrow = PhosphorIconsThin.caretDown;

  // ── To-do progress ────────────────────────────────────────────────────────────
  static const IconData progressTodo = PhosphorIconsRegular.batteryEmpty;
  static const IconData progressStarted = PhosphorIconsRegular.batteryLow;
  static const IconData progressHalfway = PhosphorIconsRegular.batteryMedium;
  static const IconData progressAlmostDone = PhosphorIconsRegular.batteryHigh;
  static const IconData progressDone = PhosphorIconsRegular.batteryFull;

  // ── Priority ──────────────────────────────────────────────────────────────────
  static const IconData priorityNormal = PhosphorIconsRegular.star;
  static const IconData priorityHigh = PhosphorIconsFill.starHalf;
  static const IconData priorityUrgent = PhosphorIconsFill.star;

  // ── Publish status ────────────────────────────────────────────────────────────
  static const IconData published = PhosphorIconsLight.checkCircle;
  static const IconData unpublished = PhosphorIconsLight.xCircle;
  static const IconData draft = PhosphorIconsLight.paintBrush;
  static const IconData featured = PhosphorIconsLight.star;

  // ── People ────────────────────────────────────────────────────────────────────
  static const IconData user = PhosphorIconsThin.user;
  static const IconData users = PhosphorIconsThin.users;
  static const IconData userGroup = PhosphorIconsThin.users;
  static const IconData userAdd = PhosphorIconsThin.userPlus;
  static const IconData userShield = PhosphorIconsThin.shieldStar;

  // ── Content types ─────────────────────────────────────────────────────────────
  static const IconData file = PhosphorIconsThin.file;
  static const IconData cloud = PhosphorIconsThin.cloud;
  static const IconData fileDownload = PhosphorIconsThin.fileArrowDown;
  static const IconData filePdf = PhosphorIconsThin.filePdf;
  static const IconData book = PhosphorIconsThin.book;
  static const IconData calendar = PhosphorIconsThin.calendarDots;
  static const IconData email = PhosphorIconsThin.envelope;
  static const IconData phone = PhosphorIconsThin.phone;
  static const IconData location = PhosphorIconsThin.mapTrifold;
  static const IconData tag = PhosphorIconsThin.tag;

  // ── Indicators ────────────────────────────────────────────────────────────────
  static const IconData info = PhosphorIconsThin.info;
  static const IconData question = PhosphorIconsThin.question;
  static const IconData warning = PhosphorIconsThin.warningCircle;
  static const IconData success = PhosphorIconsThin.checkCircle;
  static const IconData error = PhosphorIconsThin.xCircle;
  static const IconData blocked = PhosphorIconsThin.prohibit;
  static const IconData checked = PhosphorIconsThin.check;
  static const IconData unchecked = PhosphorIconsThin.prohibit;

  // ── Visibility ────────────────────────────────────────────────────────────────
  static const IconData show = PhosphorIconsThin.eye;
  static const IconData hide = PhosphorIconsThin.eyeSlash;

  // ── Notifications ─────────────────────────────────────────────────────────────
  static const IconData notification = PhosphorIconsThin.bell;

  // ── Theme ─────────────────────────────────────────────────────────────────────
  static const IconData themeLight = PhosphorIconsThin.sun;
  static const IconData themeDark  = PhosphorIconsThin.moon;

  // ── Navigation chrome ─────────────────────────────────────────────────────────
  static const IconData menu = PhosphorIconsThin.list;

  // ── Messaging ─────────────────────────────────────────────────────────────────
  static const IconData message    = PhosphorIconsThin.chatCentered;
  static const IconData newChat    = PhosphorIconsThin.notePencil;
  static const IconData send       = PhosphorIconsThin.paperPlaneRight;
  static const IconData audioCall  = PhosphorIconsThin.phone;
  static const IconData videoCall  = PhosphorIconsThin.video;
  static const IconData callEnd    = PhosphorIconsThin.phoneDisconnect;
  static const IconData emptyChat  = PhosphorIconsThin.chats;

  // ── Empty states ──────────────────────────────────────────────────────────────
  static const IconData emptyList    = PhosphorIconsThin.archive;
  static const IconData noResults    = PhosphorIconsThin.arrowsClockwise;
}
