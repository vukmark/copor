import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

// ══════════════════════════════════════════════════════════════════════════════
// General
// ══════════════════════════════════════════════════════════════════════════════

/// Vertical gap added below every standalone input by default.
const double kInputBottomPadding = 10;

/// Top padding on every input / decorator to give the floating label room.
const double kInputLabelTopPadding = 10;

/// Border-radius applied to all input containers and panels.
const double kInputBorderRadius = coporBorderRadius;

/// Duration of border/background colour transitions (hover → focus → error).
const Duration kInputAnimDuration = Duration(milliseconds: 200);

/// Default inner padding passed to InputDecoration.contentPadding.
/// Left is kInputFloatingLabelOffsetH (drives label position); the remaining
/// indent to reach kInputContentPaddingH is injected as a prefix SizedBox.
const EdgeInsets kInputContentPadding = EdgeInsets.all(12);

const EdgeInsets kInputContentWithDecoratorPadding = EdgeInsets.fromLTRB(
  12,
  25,
  12,
  20,
);

// ══════════════════════════════════════════════════════════════════════════════
// End-icon / suffix area
// ══════════════════════════════════════════════════════════════════════════════

/// Size of icons placed in the trailing slot (calendar, chevron, eye, close…).
const double kInputEndIconSize = 16.0;

/// Side length of the tappable container that wraps a trailing icon button.
const double kInputEndIconContainerSize = 40.0;

// ══════════════════════════════════════════════════════════════════════════════
// Error message box (shown below a text field)
// ══════════════════════════════════════════════════════════════════════════════

/// Outer margin around the error box.
const EdgeInsets kInputErrorMargin = EdgeInsets.symmetric(vertical: 6);

/// Inner padding inside the error box.
const EdgeInsets kInputErrorPadding = EdgeInsets.symmetric(
  horizontal: 12,
  vertical: 8,
);

// ══════════════════════════════════════════════════════════════════════════════
// DTInputDecorator (label frame + help / action overlay)
// ══════════════════════════════════════════════════════════════════════════════


/// Gap between the field and the help panel that expands below it.
const double kDecoratorHelpMarginTop = 8.0;

/// Horizontal padding inside the help panel.
const double kDecoratorHelpPaddingH = 12.0;

/// Vertical padding inside the help panel.
const double kDecoratorHelpPaddingV = 10.0;

// ══════════════════════════════════════════════════════════════════════════════
// Dropdown / select menu panel
// ══════════════════════════════════════════════════════════════════════════════

/// Padding around each item row inside a floating menu panel.
const EdgeInsets kDropdownItemPadding = coporDropdownItemPadding;

/// Padding around the search text field at the top of a searchable panel.
const EdgeInsets kDropdownSearchFieldPadding = EdgeInsets.all(8);

/// Content padding inside the search text field inside the panel.
const EdgeInsets kDropdownSearchContentPadding = EdgeInsets.symmetric(
  horizontal: 10,
  vertical: 8,
);

/// Padding around a checkbox row inside a multi-select panel.
const EdgeInsets kDropdownCheckboxRowPadding = EdgeInsets.symmetric(
  horizontal: 12,
  vertical: 2,
);

/// Horizontal padding of the selected-item content inside the trigger.
const EdgeInsets kDropdownTriggerContentPadding = EdgeInsets.only(
  left: 12,
  top: 12,
  bottom: 12,
);

// ══════════════════════════════════════════════════════════════════════════════
// Mobile bottom-sheet (single and multi select)
// ══════════════════════════════════════════════════════════════════════════════

/// Height of the "Cancel / Done" button at the bottom of a sheet.
const double kSheetCancelButtonHeight = 60.0;

/// Padding around each item row inside a mobile bottom-sheet list.
const EdgeInsets kSheetItemPadding = EdgeInsets.symmetric(
  horizontal: 20,
  vertical: 14,
);

/// Width of the drag-handle pill.
const double kSheetDragHandleWidth = 36.0;

/// Height of the drag-handle pill.
const double kSheetDragHandleHeight = 4.0;

/// Corner-radius of the drag-handle pill.
const double kSheetDragHandleRadius = 2.0;

/// Top padding above the drag handle.
const double kSheetHandleTopPadding = 12.0;

/// Bottom padding below the drag handle (before the first item).
const double kSheetHandleBottomPadding = 8.0;

// ══════════════════════════════════════════════════════════════════════════════
// Switch input
// ══════════════════════════════════════════════════════════════════════════════

/// Bottom padding below a DTSwitchInput (larger than text inputs because the
/// Switch widget itself is taller).
const double kSwitchBottomPadding = 25.0;

/// Padding applied to the inline error text shown below a switch.
const EdgeInsets kSwitchErrorTextPadding = EdgeInsets.only(left: 12, top: 4);

// ══════════════════════════════════════════════════════════════════════════════
// Search bar (DTSearchBar)
// ══════════════════════════════════════════════════════════════════════════════

/// Horizontal padding inside the search bar container (left side only;
/// the right side is occupied by the clear button).
const double kSearchBarPaddingH = 15.0;

/// Size of the leading search icon.
const double kSearchBarIconSize = 16.0;

/// Gap between the search icon and the text field.
const double kSearchBarIconSpacing = 8.0;

// ══════════════════════════════════════════════════════════════════════════════
// Checkbox
// ══════════════════════════════════════════════════════════════════════════════

/// Horizontal gap between the Checkbox widget and its label text.
const double kCheckboxLabelSpacing = 8.0;

/// Gap between the label and any trailing element.
const double kCheckboxTrailingSpacing = 5.0;

/// Corner-radius of the Checkbox shape itself.
const double kCheckboxShapeRadius = 6.0;

// ══════════════════════════════════════════════════════════════════════════════
// Language button (DTLanguageButton)
// ══════════════════════════════════════════════════════════════════════════════

/// Rendered width of the country-flag image.
const double kLangFlagWidth = 18.0;

/// Rendered height of the country-flag image.
const double kLangFlagHeight = 16.0;

/// Corner-radius applied when clipping the flag image.
const double kLangFlagBorderRadius = 3.0;

/// Fixed width of the language-picker dropdown panel.
const double kLangDropdownPanelWidth = 160.0;

/// Gap between the flag image and the language name.
const double kLangFlagTextSpacing = 8.0;

/// Diameter of the loading spinner shown while the language list loads.
const double kLangLoadingSize = 14.0;

/// Stroke width of the loading spinner.
const double kLangLoadingStrokeWidth = 1.5;

/// Trigger padding (full variant): matches other bordered buttons.
const EdgeInsets kLangTriggerPadding = EdgeInsets.symmetric(
  horizontal: 12,
  vertical: 10,
);

// ══════════════════════════════════════════════════════════════════════════════
// Date input — compact chip variant
// ══════════════════════════════════════════════════════════════════════════════

/// Inner padding of the compact date chip.
const EdgeInsets kDateCompactPadding = EdgeInsets.symmetric(
  vertical: 9,
  horizontal: 12,
);

/// Font size of the label inside a compact date chip.
const double kDateCompactFontSize = 13.0;

/// Icon size inside the compact date chip (calendar / clear).
const double kDateCompactIconSize = 13.0;

// ══════════════════════════════════════════════════════════════════════════════
// Padding helpers
// ══════════════════════════════════════════════════════════════════════════════

/// Canonical padding helpers for aligning non-input widgets (buttons, icons)
/// within a form row that contains [DTInputField] or [DTDropdown] widgets.
class DTPadding {
  DTPadding._();

  /// Matches the default top/bottom padding of [DTInputField] and [DTDropdown],
  /// so inline buttons sit level with the input box below the floating label.
  static const EdgeInsets input = EdgeInsets.only(
    top: kInputLabelTopPadding,
    bottom: kInputBottomPadding,
  );
}

/// Standard outer padding presets for input widgets.
///
/// Use [form] when the input is followed by another input (keeps vertical
/// rhythm via [kInputBottomPadding]).  Use [page] for the last input on a
/// screen or a standalone input where no trailing gap is needed.
class DTInputPadding {
  DTInputPadding._();

  /// Top label room + bottom gap — use inside repeating form rows.
  static const EdgeInsets form = EdgeInsets.only(
    top: kInputLabelTopPadding,
    bottom: kInputBottomPadding,
  );

  /// Top label room only — use for the last/only input on a page.
  static const EdgeInsets page = EdgeInsets.only(
    top: kInputLabelTopPadding,
  );
}

