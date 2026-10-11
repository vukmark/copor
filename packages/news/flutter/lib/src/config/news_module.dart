import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_news/src/config/news_route.dart';
import 'package:copor_news/src/config/news_routes.dart';
import 'package:copor_news/src/presentation/news_scaffold.dart';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

class NewsModule extends CoporModule {
  const NewsModule();

  @override
  String get name => 'news';

  @override
  Future<void> registerDependencies() async {}

  @override
  List<StatefulShellBranch> get routeBranches => [createNewsRoute()];

  @override
  Object? pageScaffold(BuildContext context, GoRouterState state, String path) =>
      path == NewsRoutes.news ? NewsScaffold() : null;
}
