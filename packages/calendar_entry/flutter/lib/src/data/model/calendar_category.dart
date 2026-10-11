import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:flutter/widgets.dart';
import 'package:json_annotation/json_annotation.dart';

/// The categories a calendar time span can belong to. All of them are created, updated and
/// deleted by hand through the calendar entry endpoints.
enum CalendarCategory {
  @JsonValue('TRAVEL')
  travel,
  @JsonValue('HOLIDAYS')
  holidays;

  /// The categories the user can pick when creating or editing an entry.
  static const List<CalendarCategory> manageable = [travel, holidays];

  bool get isManageable => manageable.contains(this);

  /// Matches the backend `CalendarEntryType` enum values.
  String get wireValue => switch (this) {
    CalendarCategory.travel => 'TRAVEL',
    CalendarCategory.holidays => 'HOLIDAYS',
  };

  /// Falls back to [travel] for a value this build does not know. The backend only ever sends the
  /// values above, so this is a guard against a newer server, not a category the user can pick.
  static CalendarCategory fromWireValue(String value) {
    return CalendarCategory.values.firstWhere(
      (category) => category.wireValue == value,
      orElse: () => CalendarCategory.travel,
    );
  }

  String label(MyAccountPageTranslation translation) => switch (this) {
    CalendarCategory.travel => translation.TRAVEL,
    CalendarCategory.holidays => translation.HOLIDAYS,
  };

  /// Solid throughout, per the calendar's icon style.
  IconData get icon => switch (this) {
    CalendarCategory.travel => PhosphorIconsThin.van,
    CalendarCategory.holidays => PhosphorIconsThin.umbrella,
  };
}
