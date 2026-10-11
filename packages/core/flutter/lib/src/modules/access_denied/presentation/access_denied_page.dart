import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/utils/home_route_resolver.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AccessDeniedPage extends StatelessWidget {
  const AccessDeniedPage({super.key});

  @override
  Widget build(BuildContext context) {
    final translation = context.read<TranslationBloc<CommonTranslation>>().state.ensuredData;
    final dt = CoporTheme.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(PhosphorIconsThin.lock, size: 50, color: dt.colors.onErrorContainer),
            const SizedBox(height: 20),
            Text(
              translation.INSUFFICIENT_PERMISSIONS,
              textAlign: TextAlign.center,
              style: dt.text.sectionTitle,
            ),
            const SizedBox(height: 8),
            Text(
              translation.CONTACT_ADMINISTRATOR,
              textAlign: TextAlign.center,
              style: dt.text.body.copyWith(color: dt.colors.onSurfaceSubtle),
            ),
            const SizedBox(height: 16),
            DTButton.negative(
              label: 'Go back',
              onPressed: () => goToPage(resolveHomeRoute(context) ?? AppRoutes.homepage),
            ),
          ],
        ),
      ),
    );
  }
}
