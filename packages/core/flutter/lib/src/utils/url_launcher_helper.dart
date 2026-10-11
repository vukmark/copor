import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_scaffold/copor_scaffold.dart';

Future<void> launchUrlHelper(String urlString, BuildContext context) async {
  if (!context.mounted) return;

  final commonTranslation = context.getState.commonTranslation.ensuredData;
  final Uri url = Uri.parse(urlString);

  if (!await launchUrl(url)) {
    if (!context.mounted) return;
    context.getBloc.appScaffold.addBanner(
      DSBanner.error('${commonTranslation.COULD_NOT_LOAD_URL} $urlString', source: 'url_launcher'),
    );
  }
}
