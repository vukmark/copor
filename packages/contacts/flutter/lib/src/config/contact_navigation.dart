class ContactNavigation {
  static const String baseRoute = '/contacts';

  static String getContactDetailsRoute(String id) => '$baseRoute/$id';
}
