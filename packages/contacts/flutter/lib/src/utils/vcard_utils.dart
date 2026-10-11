import 'package:copor_contacts/src/data/model/contact_model.dart';

// --------------------- EXTENSIONS ---------------------

extension NullableStringExtensions on String? {
  bool get isNotNullOrEmpty => this != null && this!.trim().isNotEmpty;

  String get orEmpty => this ?? '';
}

extension NullableListExtensions<T> on List<T>? {
  List<T> get orEmpty => this ?? <T>[];
}

extension VCardBufferExtensions on StringBuffer {
  void writeProp(String key, String? value) {
    if (value.isNotNullOrEmpty) {
      writeln('$key:${VCardUtils.escape(value)}');
    }
  }

  void writeTypedProp(String key, String type, String? value) {
    if (value.isNotNullOrEmpty) {
      writeln('$key;TYPE=$type:${VCardUtils.escape(value)}');
    }
  }
}

// --------------------- MAIN VCARD UTILS ---------------------

class VCardUtils {
  static String generateVCard(ContactModel contact) {
    final buffer = StringBuffer()
      ..writeln('BEGIN:VCARD')
      ..writeln('VERSION:3.0');

    buffer.writeProp('FN', contact.fullName);
    buffer.writeProp('EMAIL', contact.email);
    buffer.writeProp('TITLE', _resolveTitle(contact));

    for (final phone in contact.phoneNumber.orEmpty) {
      final type = _mapPhoneTitleToVCardType(phone.phoneTitle);
      buffer.writeTypedProp('TEL', type, phone.phoneNumber);
    }

    if (_hasAny([
      contact.address,
      contact.city,
      contact.state,
      contact.postalCode,
      contact.country,
    ])) {
      buffer.writeln(
        'ADR;TYPE=HOME:;;'
        '${escape(contact.address)};'
        '${escape(contact.city)};'
        '${escape(contact.state)};'
        '${escape(contact.postalCode)};'
        '${escape(contact.country)}',
      );
    }

    if (_hasAny([
      contact.tenantAddress,
      contact.tenantCity,
      contact.tenantState,
      contact.tenantPostalCode,
      contact.tenantCountry,
    ])) {
      buffer.writeln(
        'ADR;TYPE=WORK:;;'
        '${escape(contact.tenantAddress)};'
        '${escape(contact.tenantCity)};'
        '${escape(contact.tenantState)};'
        '${escape(contact.tenantPostalCode)};'
        '${escape(contact.tenantCountry)}',
      );
    }

    buffer.writeProp('PHOTO;VALUE=URI', contact.picture);

    buffer.writeln('END:VCARD');
    return buffer.toString();
  }

  // ---------- helpers ----------

  static String _resolveTitle(ContactModel c) => c.jobTitle ?? c.role ?? '';

  static bool _hasAny(List<String?> values) => values.any((v) => v.isNotNullOrEmpty);

  static String escape(String? input) {
    if (input == null) return '';
    return input
        .replaceAll(r'\', r'\\')
        .replaceAll(';', r'\;')
        .replaceAll(',', r'\,')
        .replaceAll('\n', r'\n');
  }

  static String _mapPhoneTitleToVCardType(String? title) {
    switch (title?.toLowerCase().trim()) {
      case 'mobile':
        return 'CELL';
      case 'home':
        return 'HOME';
      case 'work':
        return 'WORK';
      default:
        return 'VOICE';
    }
  }
}
