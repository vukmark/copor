import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_info/log_info_bloc.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_info/log_info_state.dart';
import 'package:copor_core/src/modules/administration/log/data/model/log_info_model.dart';
import 'package:copor_core/src/modules/administration/log/data/model/translation/log_translation.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class LogInfoViewContent extends HookWidget {
  final String? id;
  final LogPageTranslation translation;
  final LogInfoModel logData;

  const LogInfoViewContent({super.key, required this.translation, this.id, required this.logData});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return GuardedBlocBuilder<LogInfoBloc, LogInfoState>(
      builder: (context, logInfoState) {
        final LogInfoModel logData = logInfoState.ensuredData;
        final commonTranslation = context
            .watch<TranslationBloc<CommonTranslation>>()
            .state
            .ensuredData;

        return Padding(
          padding: EdgeInsets.symmetric(vertical: 20),
          child: DTFloatingLayout(
            title: logData.title,
            leading: DTButton.surface(
              label: commonTranslation.BACK,
              onPressed: () => goToPage(AppRoutes.log),
            ),
            children: [
              ...logData.fields.map((field) => _buildInfoRow(context, field, textTheme)),
              if (logData.logDataFields.isNotEmpty) ...[
                const SizedBox(height: 24),
                Center(
                  child: Text(
                    logData.logDataTitle,
                    style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(height: 12),
                ...logData.logDataFields.map((field) => _buildInfoRow(context, field, textTheme)),
              ],
            ],
          ),
        );
      },
    );
  }

  Widget _buildInfoRow(BuildContext context, LogInfoField field, TextTheme textTheme) {
    final value = field.value.text;
    final isCopyable = field.type == LogFieldType.COPYABLE_TEXT;
    final commonTranslation = context.watch<TranslationBloc<CommonTranslation>>().state.ensuredData;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            width: 130,
            child: Text(
              '${field.label}:',
              style: textTheme.titleSmall?.copyWith(fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Row(
              children: [
                Expanded(child: SelectableText(value, minLines: 1, maxLines: 3)),
                if (isCopyable && value.isNotEmpty)
                  IconButton(
                    icon: Semantics(
                      label: commonTranslation.COPY,
                      child: const Icon(PhosphorIconsThin.copy, size: 18),
                    ),
                    visualDensity: VisualDensity.compact,
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: value));
                      context.getBloc.appScaffold.addBanner(
                        DSBanner.success(
                          commonTranslation.COPY_TO_CLIPBOARD,
                          source: 'log_info_view_copy',
                        ),
                      );
                    },
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
