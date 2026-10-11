enum DTPhoneType { mobile, home, work }

class DTPhoneEntry {
  final String? id;
  final String phoneNumber;
  final DTPhoneType type;
  const DTPhoneEntry({this.id, required this.phoneNumber, required this.type});
}
