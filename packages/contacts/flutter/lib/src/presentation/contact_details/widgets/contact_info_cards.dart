import 'package:copor_theme/copor_theme.dart';
import 'package:copor_contacts/src/data/model/contact_model.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:flutter/material.dart';

class ContactInfoCards extends StatelessWidget {
  final ContactModel contact;
  final ContactPageTranslation translation;

  const ContactInfoCards({super.key, required this.contact, required this.translation});

  @override
  Widget build(BuildContext context) {
    final cards = <Widget>[];

    if (_hasValidAddress(contact)) cards.add(_buildLocationCard(context));
    if (_hasValidEmail(contact)) cards.add(_buildEmailCard(context));
    cards.addAll(_buildPhoneCards(context));
    if (_hasValidTenantInfo(contact)) cards.add(_buildTenantCard(context));

    return Column(children: cards);
  }

  bool _hasValidAddress(ContactModel c) =>
      [c.address, c.city, c.country].any((s) => s != null && s.isNotEmpty);

  bool _hasValidEmail(ContactModel c) => c.email != null && c.email!.isNotEmpty;

  bool _hasValidTenantInfo(ContactModel c) =>
      [c.tenantAddress, c.tenantCity, c.tenantCountry].any((s) => s != null && s.isNotEmpty);

  Widget _buildLocationCard(BuildContext context) {
    final value = [
      contact.address,
      contact.city,
      contact.country,
    ].where((s) => s != null && s.isNotEmpty).join(', ');
    return _buildInfoCard(context, PhosphorIconsThin.mapPin, translation.LOCATION, value);
  }

  Widget _buildEmailCard(BuildContext context) =>
      _buildInfoCard(context, PhosphorIconsThin.envelope, translation.EMAIL, contact.email ?? '');

  List<Widget> _buildPhoneCards(BuildContext context) {
    if (contact.phoneNumber == null || contact.phoneNumber!.isEmpty) return [];
    return contact.phoneNumber!.map((phone) {
      final title = _getPhoneTitle(phone.phoneTitle);
      return _buildInfoCard(context, PhosphorIconsThin.phone, title, phone.phoneNumber);
    }).toList();
  }

  Widget _buildTenantCard(BuildContext context) {
    final value = [
      contact.tenantAddress,
      contact.tenantCity,
      contact.tenantCountry,
    ].where((s) => s != null && s.isNotEmpty).join(', ');
    return _buildInfoCard(context, PhosphorIconsThin.building, translation.TENANT, value);
  }

  String _getPhoneTitle(String phoneTitle) {
    switch (phoneTitle.toUpperCase()) {
      case 'WORK':
        return translation.OFFICE_PHONE;
      case 'MOBILE':
        return translation.MOBILE_PHONE;
      case 'HOME':
        return translation.HOME_PHONE;
      default:
        return translation.PHONE;
    }
  }

  Widget _buildInfoCard(BuildContext context, IconData icon, String title, String value) {
    final colors = CoporColors.of(context);
    final dt = CoporTextStyles.of(context);

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 6.0),
      decoration: BoxDecoration(
        color: colors.surfaceContainer,
        borderRadius: BorderRadius.circular(kInputBorderRadius),
        border: Border.all(color: colors.outlineSubtle),
      ),
      child: ListTile(
        leading: ExcludeSemantics(child: Icon(icon, size: 22, color: colors.onSurfaceSubtle)),
        title: Text(title, style: dt.bodyStrong),
        subtitle: Text(value, style: dt.body),
      ),
    );
  }
}
