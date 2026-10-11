import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_contacts/src/config/contact_dependency_injection.dart' as contact_di;
import 'package:copor_contacts/src/config/contact_routes.dart';
import 'package:copor_contacts/src/contact_route.dart';
import 'package:copor_contacts/src/presentation/contact_page/contact_scaffold.dart';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

/// The address book: contact list and details (vCard / QR). Its side-menu
/// entry comes from the server's feature list (`/contacts`).
class ContactsModule extends CoporModule {
  const ContactsModule();

  @override
  String get name => 'contacts';

  @override
  Future<void> registerDependencies() => contact_di.init();

  @override
  List<StatefulShellBranch> get routeBranches => [createContactRoute()];

  @override
  Object? pageScaffold(BuildContext context, GoRouterState state, String path) =>
      path == ContactRoutes.contacts || path == ContactRoutes.contactDetails
          ? ContactsScaffold(state)
          : null;
}
