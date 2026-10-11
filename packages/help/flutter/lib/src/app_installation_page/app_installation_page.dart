import 'package:collection/collection.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/buttons/copor_button.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_help/src/about/data/model/change_log_models.dart';
import 'package:copor_help/src/about/services/change_log_service.dart';
import 'package:copor_core/src/utils/url_launcher_helper.dart';
import 'package:flutter/material.dart';

class AppInstallation extends StatefulWidget {
  const AppInstallation({super.key});

  @override
  State<AppInstallation> createState() => _AppInstallationState();
}

class _AppInstallationState extends State<AppInstallation> {
  late final Future<ParsedChangeLog> _parsedChangeLogFuture;

  @override
  void initState() {
    super.initState();
    _parsedChangeLogFuture = ChangeLogService.loadLatestChangeLog();
  }

  @override
  Widget build(BuildContext context) {
    final commonTranslation = context.getState.commonTranslation.ensuredData;
    final isAndroid = context.isAndroid;
    final isIOS = context.isIOS;

    return FutureBuilder<ParsedChangeLog>(
      future: _parsedChangeLogFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: Container());
        }
        if (snapshot.hasError || !snapshot.hasData || snapshot.data!.markdownContent.isEmpty) {
          return Center(child: Text(commonTranslation.COULD_NOT_LOAD_CHANGELOG));
        }

        final releases = snapshot.data!.releases;
        final targetPlatform = isAndroid
            ? 'ANDROID'
            : isIOS
            ? 'IOS'
            : null;
        final platformRelease = releases.firstWhereOrNull((r) => r.platform == targetPlatform);

        return Center(
          child: Padding(
            padding: EdgeInsetsGeometry.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Installieren Sie die App für die beste Benutzererfahrung.',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                SizedBox(height: 15),
                CoporButton(
                  icon: platformRelease?.icon,
                  secondary: true,
                  label: 'Herunterladen',
                  onPressed: () => launchUrlHelper(platformRelease?.url ?? '', context),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
