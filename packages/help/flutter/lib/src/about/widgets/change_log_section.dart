import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_help/src/about/widgets/version_tile.dart';

class ChangeLogSection extends StatelessWidget {
  final List<String> versions;

  const ChangeLogSection({super.key, required this.versions});

  @override
  Widget build(BuildContext context) {
    final commonTranslation = context.getState.commonTranslation.ensuredData;

    return Column(
      children: [
        Text(commonTranslation.VERSION_HISTORY, style: CoporTextStyles.of(context).sectionTitle),
        const SizedBox(height: 16),
        if (versions.isEmpty)
          DTEmptyState(
            icon: PhosphorIconsThin.clockCounterClockwise,
            title: commonTranslation.NO_VERSION_HISTORY,
          )
        else
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: versions.length,
            itemBuilder: (context, index) =>
                VersionTile(version: versions[index], isInitiallyExpanded: index == 0),
          ),
      ],
    );
  }
}
