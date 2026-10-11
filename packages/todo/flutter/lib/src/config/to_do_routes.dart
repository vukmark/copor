class ToDoRoutes {
  static const String todo = '/todo';
  static const String todoEditNew = '/todo/edit';
  static const String todoEditExisting = '/todo/edit/:id/:type';

  static const String relative_edit = 'edit';
  static const String relative_edit_existing = 'edit/:id/:type';

  static String getEditExistingUri(String id, String type) => '/todo/edit/$id/$type';
}
