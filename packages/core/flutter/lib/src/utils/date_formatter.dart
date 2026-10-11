import 'package:intl/intl.dart';

const displayDatePattern = 'dd.MM.yyyy';

const displayDateTimePattern = 'dd.MM.yyyy HH:mm';

String formatDisplayDate(DateTime date) => DateFormat(displayDatePattern).format(date);

String formatDisplayDateTime(DateTime date) => DateFormat(displayDateTimePattern).format(date);

DateTime? parseFlexibleDate(String? value) {
  final trimmed = value?.trim();
  if (trimmed == null || trimmed.isEmpty) return null;

  final parsed = DateTime.tryParse(trimmed) ?? _tryParseDisplayDate(trimmed);
  if (parsed != null) return parsed;

  final englishDate = RegExp(
    r'^[A-Za-z]{3}\s+([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})',
  ).firstMatch(trimmed);
  if (englishDate == null) return null;

  const months = {
    'jan': 1,
    'feb': 2,
    'mar': 3,
    'apr': 4,
    'may': 5,
    'jun': 6,
    'jul': 7,
    'aug': 8,
    'sep': 9,
    'oct': 10,
    'nov': 11,
    'dec': 12,
  };
  final month = months[englishDate.group(1)!.toLowerCase()];
  if (month == null) return null;

  final day = int.parse(englishDate.group(2)!);
  final year = int.parse(englishDate.group(3)!);
  final date = DateTime(year, month, day);
  if (date.year != year || date.month != month || date.day != day) return null;
  return date;
}

String formatDisplayDateString(String value) {
  final trimmed = value.trim();
  final parsed = parseFlexibleDate(trimmed);

  return parsed == null ? value : formatDisplayDate(parsed.toLocal());
}

DateTime? _tryParseDisplayDate(String value) {
  final match = RegExp(r'^(\d{1,2})\.(\d{1,2})\.(\d{4})$').firstMatch(value);
  if (match == null) return null;

  final day = int.parse(match.group(1)!);
  final month = int.parse(match.group(2)!);
  final year = int.parse(match.group(3)!);
  final date = DateTime(year, month, day);

  if (date.year != year || date.month != month || date.day != day) return null;
  return date;
}

abstract class DateFormatter {
  final String date;
  final String languageCode;

  DateFormatter({required this.date, required this.languageCode});

  String format();

  DateTime getDateTime() {
    return DateTime.parse(date);
  }
}

class SimpleDateFormat extends DateFormatter {
  SimpleDateFormat({required super.date, required super.languageCode});

  @override
  String format() {
    return formatDisplayDate(getDateTime());
  }
}

class FullDateFormat extends DateFormatter {
  FullDateFormat({required super.date, required super.languageCode});

  @override
  String format() {
    return formatDisplayDate(getDateTime());
  }
}
