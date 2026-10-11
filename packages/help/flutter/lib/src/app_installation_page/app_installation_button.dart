import 'package:collection/collection.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_help/src/about/data/model/change_log_models.dart';
import 'package:copor_help/src/about/services/change_log_service.dart';
import 'package:copor_core/src/utils/url_launcher_helper.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class AppInstallationButton extends StatefulWidget {
  const AppInstallationButton({super.key});

  @override
  State<AppInstallationButton> createState() => _AppInstallationState();
}

class _AppInstallationState extends State<AppInstallationButton> {
  late final Future<ParsedChangeLog> _parsedChangeLogFuture;

  @override
  void initState() {
    super.initState();
    _parsedChangeLogFuture = ChangeLogService.loadLatestChangeLog();
  }

  @override
  Widget build(BuildContext context) {
    final translation = context.getState.commonTranslation.ensuredData;
    final isAndroid = context.isAndroid;
    final isIOS = context.isIOS;

    return FutureBuilder<ParsedChangeLog>(
      future: _parsedChangeLogFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Container();
        }
        if (snapshot.hasError || !snapshot.hasData || snapshot.data!.markdownContent.isEmpty) {
          return Container();
        }

        final releases = snapshot.data!.releases;
        final targetPlatform = isAndroid
            ? 'ANDROID'
            : isIOS
            ? 'IOS'
            : null;
        final platformRelease = releases.firstWhereOrNull((r) => r.platform == targetPlatform);

        if (!context.isMobileWeb) {
          return SizedBox.shrink();
        }

        return Padding(
          padding: EdgeInsetsGeometry.only(bottom: 20),
          child: DTButtonWithHelp(
            fullWidth: true,
            label: translation.APP_DOWNLOAD,
            helpContent: translation.APP_INSTALLATION_MESSAGE,
            onPressed: () => launchUrlHelper(platformRelease?.url ?? '', context),
          ),
        );
      },
    );
  }
}
