import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/components/buttons/copor_button.dart';
import 'package:copor_core/src/components/copor_floating_container.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/utils/home_route_resolver.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class NotFoundPage extends StatelessWidget {
  const NotFoundPage({super.key, required this.state});

  final GoRouterState state;

  @override
  Widget build(BuildContext context) {
    final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;

    if (translationState.isInitial) {
      return const SizedBox.shrink();
    }

    final translation = translationState.ensuredData;

    final currentPath = state.uri.path;
    final isPublicPage = AppRoutes.publicRoutes.contains(currentPath);
    final target = isPublicPage ? AppRoutes.login : (resolveHomeRoute(context) ?? AppRoutes.homepage);

    return CoporFloatingContainer(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(translation.PAGE_NOT_FOUND, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 36),
          CoporButton(
            label: translation.RETURN_TO_HOME,
            onPressed: () => goToPage(target),
            outlined: true,
          ),
        ],
      ),
    );
  }
}
