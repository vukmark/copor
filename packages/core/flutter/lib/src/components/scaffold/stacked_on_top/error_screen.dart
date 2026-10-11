import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/error/response_code.dart';
import 'package:flutter/material.dart';

class ErrorScreen extends StatelessWidget {
  final Failure failure;

  const ErrorScreen({super.key, required this.failure});

  @override
  Widget build(BuildContext context) {
    final translation = context.getState.commonTranslation.ensuredData;

    switch (failure.responseCode) {
      case ResponseCode.connectionError:
        return _buildConnectionErrorScreen(context, translation);
      default:
        return _buildDefaultErrorScreen(context, translation);
    }
  }

  Widget _buildConnectionErrorScreen(BuildContext context, CommonTranslation translation) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Icon(PhosphorIconsThin.wifiSlash, size: 40),
          const SizedBox(height: 14.0),
          Text(
            translation.NO_INTERNET_CONNECTION,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 14.0),
          Text(
            translation.NO_INTERNET_MESSAGE,
            style: Theme.of(context).textTheme.bodyMedium,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildDefaultErrorScreen(BuildContext context, CommonTranslation translation) {
    return Center(
      child: Text(
        failure.message,
        style: Theme.of(context).textTheme.bodyLarge,
        textAlign: TextAlign.center,
      ),
    );
  }
}
