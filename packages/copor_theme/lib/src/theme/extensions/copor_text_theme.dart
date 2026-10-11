import 'package:copor_theme/src/theme/app_theme.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:flutter/material.dart';

/// Context-based accessor — use `CoporTheme.of(context).text.appBarTitle` in widgets.
///
/// Every getter names a *role* in the UI, not a size. When [AppFontWeight.bold]
/// is active each style automatically shifts to its heavier variant.
class CoporTextStyles {
  final BuildContext _context;
  const CoporTextStyles.of(BuildContext context) : _context = context;

  TextTheme get _tt => Theme.of(_context).textTheme;
  CoporColors get _dc => CoporColors.of(_context);

  bool get _bold =>
      (Theme.of(_context).extension<CoporThemeConfig>()?.fontWeight ?? AppFontWeight.normal) ==
      AppFontWeight.bold;

  FontWeight _w(FontWeight normal, FontWeight bold) => _bold ? bold : normal;

  // ── Navigation ───────────────────────────────────────────────────────────────
  /// App bar and modal app bar title.
  TextStyle get appBarTitle =>
      _tt.titleMedium!.copyWith(fontWeight: _w(FontWeight.w500, FontWeight.w700));

  /// Drawer and side menu item label.
  TextStyle get drawerItem =>
      _tt.bodyMedium!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Tab bar label — active and idle states differentiated by color at the call site.
  TextStyle get tabLabel =>
      _tt.labelMedium!.copyWith(fontWeight: _w(FontWeight.w500, FontWeight.w700));

  // ── Page & section headings ──────────────────────────────────────────────────
  /// Full-page entity hero header (DTEntityHeader.large).
  TextStyle get heroTitle =>
      _tt.headlineSmall!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Card or list entity name (DTEntityHeader.small, mobile).
  TextStyle get pageTitle =>
      _tt.titleLarge!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Section divider, panel heading, card sub-header.
  TextStyle get sectionTitle =>
      _tt.titleMedium!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  // ── Table / data ─────────────────────────────────────────────────────────────
  /// Table column name and data-grid header cell.
  TextStyle get columnHeader =>
      _tt.titleSmall!.copyWith(fontWeight: _w(FontWeight.w500, FontWeight.w700), color: _dc.onSurface);

  /// Table or list cell content.
  TextStyle get tableCell =>
      _tt.bodyMedium!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600), color: _dc.onSurface);

  /// "No data found" heading in a table or card list.
  TextStyle get emptyStateTitle => _tt.titleSmall!.copyWith(
        fontWeight: _w(FontWeight.w400, FontWeight.w600),
        color: _dc.onSurfaceSubtle,
      );

  /// Supporting body copy under an empty-state heading.
  TextStyle get emptyStateBody => _tt.bodySmall!.copyWith(
        fontWeight: _w(FontWeight.w300, FontWeight.w500),
        color: _dc.onSurfaceSubtle,
      );

  // ── Body ──────────────────────────────────────────────────────────────────────
  /// Important paragraph or dialog heading.
  TextStyle get bodyStrong =>
      _tt.bodyLarge!.copyWith(fontWeight: _w(FontWeight.w500, FontWeight.w700));

  /// Standard content text — cards, lists, dialogs.
  TextStyle get body =>
      _tt.bodyMedium!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Larger body text with same thickness.
  TextStyle get bodyLarge =>
      _tt.bodyLarge!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Light body copy — descriptions, dialog secondary text.
  TextStyle get bodyLight =>
      _tt.bodyMedium!.copyWith(fontWeight: _w(FontWeight.w300, FontWeight.w400));

  /// Secondary metadata — info-row labels, timestamps, captions.
  TextStyle get bodySecondary => _tt.bodySmall!.copyWith(
        fontWeight: _w(FontWeight.w400, FontWeight.w600),
        color: _dc.onSurfaceSubtle,
      );

  // ── Labels ──────────────────────────────────────────────────────────────────
  /// General-purpose label text (badge, misc controls).
  TextStyle get labelDefault =>
      _tt.labelMedium!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Chip and info-chip label.
  TextStyle get chipLabel =>
      _tt.labelSmall!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Button label text (outlined / text / filled buttons).
  TextStyle get buttonLabel =>
      _tt.labelLarge!.copyWith(fontWeight: _w(FontWeight.w500, FontWeight.w700));

  // ── Compact controls ─────────────────────────────────────────────────────────
  /// Idle label in compact controls (segmented button, compact date picker).
  TextStyle get compactDefault =>
      TextStyle(fontSize: 13, fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Active / selected label in a compact control.
  TextStyle get compactActive =>
      TextStyle(fontSize: 13, fontWeight: _w(FontWeight.w600, FontWeight.w700));

  // ── Avatar ───────────────────────────────────────────────────────────────────
  /// Initials label inside a DTAvatar.
  TextStyle get avatarInitials => _tt.labelMedium!.copyWith(
        color: _dc.white,
        fontWeight: _w(FontWeight.w400, FontWeight.w600),
      );

  // ── Form & input ─────────────────────────────────────────────────────────────
  /// Typed value rendered inside a text field.
  TextStyle get inputValue =>
      _tt.bodyMedium!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Default (idle) label for a text field.
  TextStyle get inputLabel =>
      _tt.bodyMedium!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w600));

  /// Floating label in its non-focused / idle state (muted).
  TextStyle get inputLabelFloating => _tt.bodyMedium!.copyWith(
        fontWeight: _w(FontWeight.w400, FontWeight.w500),
        color: _dc.onSurfaceSubtle,
      );

  /// Helper or error text displayed below a form field.
  TextStyle get inputHelper =>
      _tt.bodySmall!.copyWith(fontWeight: _w(FontWeight.w400, FontWeight.w500));

  /// Search bar placeholder / hint text.
  TextStyle get searchHint =>
      _tt.bodyMedium!.copyWith(fontWeight: _w(FontWeight.w300, FontWeight.w400), fontSize: 14);

  // ── Backward-compatible aliases ──────────────────────────────────────────────
  TextStyle get formLabel => inputLabel;
  TextStyle get floatingLabel => inputLabelFloating;
}
