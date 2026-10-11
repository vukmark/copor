class PublicRoutes {
  static const _routes = <String, List<String>>{
    '/login': ['POST'],
    '/filter': ['GET'],
    '/logo': ['GET'],
    '/assets': ['GET'],
    '/refdata': ['GET'],
    '/registration/status': ['GET'],
    '/registration': ['POST'],
    '/password/validate': ['POST'],
    '/user/inactive': ['GET'],
    '/locale': ['GET'],
    '/language': ['GET'],
    '/wsconfig': ['GET'],
    '/envconfig': ['GET'],
    '/documents/TermsAndConditions/': ['GET'],
    '/login/base': ['GET'],
    '/role': ['GET'],
    '/state/simple-list': ['GET'],
    '/native-language/simple-list': ['POST'],
    '/documents/Impressum/': ['GET'],
    '/help/changelog': ['GET'],
  };

  static bool isPublic(String path, String method) {
    return _routes.entries.any((route) {
      final routeMatches = path.startsWith(route.key);
      final methodMatches = route.value.contains(method.toUpperCase());
      return routeMatches && methodMatches;
    });
  }
}
