bool isValidEmail(String email) {
  final regex = RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
  return regex.hasMatch(email.trim());
}

bool isValidPostalCode(String postalCode) {
  final regex = RegExp(r'^\d{5}(-\d{4})?$|^\d{4,6}$');
  return regex.hasMatch(postalCode.trim());
}

bool isValidDoubleNumber(String value) {
  return double.tryParse(value.replaceAll(',', '.')) != null;
}

bool isValidPassword(String value) {
  final regex = RegExp(r'^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`\[\]\\/;]).{8,}$');
  return regex.hasMatch(value.trim());
}

String formatISODate(DateTime date) {
  final y = date.year.toString().padLeft(4, '0');
  final m = date.month.toString().padLeft(2, '0');
  final d = date.day.toString().padLeft(2, '0');
  return '$d.$m.$y';
}
