import 'package:copor_news/src/config/news_routes.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_news/src/presentation/news_page.dart';
import 'package:go_router/go_router.dart';

StatefulShellBranch createNewsRoute() {
  return StatefulShellBranch(
    routes: [
      GoRoute(
        path: NewsRoutes.news,
        pageBuilder: (context, state) => NoAnimationPage(child: NewsPage()),
      ),
    ],
  );
}
