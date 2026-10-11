import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_help/src/about/bloc/change_log_detail_cubit.dart';
import 'package:copor_help/src/about/bloc/change_log_detail_state.dart';
import 'package:copor_help/src/about/config/about_page_keys.dart';
import 'package:copor_help/src/about/data/model/change_log_models.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:copor_core/src/utils/url_launcher_helper.dart';

class VersionTile extends StatefulWidget {
  final String version;
  final bool isInitiallyExpanded;

  const VersionTile({super.key, required this.version, this.isInitiallyExpanded = false});

  @override
  State<VersionTile> createState() => _VersionTileState();
}

class _VersionTileState extends State<VersionTile> {
  late final ChangeLogDetailCubit _cubit;

  @override
  void initState() {
    super.initState();
    _cubit = ChangeLogDetailCubit();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      context.getBloc.appScaffold.addRequestLoading(AboutPageKeys.changeLogVersionDetailLoadingKey);
      _cubit.load(widget.version);
    });
  }

  @override
  void dispose() {
    _cubit.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final commonTranslation = context.getState.commonTranslation.ensuredData;

    return BlocProvider.value(
      value: _cubit,
      child: BlocListener<ChangeLogDetailCubit, ChangeLogDetailState>(
        listener: (context, state) {
          if (state is ChangeLogDetailLoaded || state is ChangeLogDetailError) {
            context.getBloc.appScaffold.removeLoadingSource(
              AboutPageKeys.changeLogVersionDetailLoadingKey,
            );
          }
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 4.0),
          child: DTExpandableSection(
            title: '${commonTranslation.VERSION} ${widget.version}',
            initiallyExpanded: widget.isInitiallyExpanded,
            child: BlocBuilder<ChangeLogDetailCubit, ChangeLogDetailState>(
              builder: (context, state) {
                if (state is ChangeLogDetailInitial || state is ChangeLogDetailLoading) {
                  return const Center(child: DTRingLoader.inline());
                }
                if (state is ChangeLogDetailError) {
                  return DTEmptyState(
                    icon: PhosphorIconsThin.warningCircle,
                    title: commonTranslation.COULD_NOT_LOAD_CHANGELOG,
                  );
                }
                return _ChangeLogContent(parsedData: (state as ChangeLogDetailLoaded).data);
              },
            ),
          ),
        ),
      ),
    );
  }
}

class _ChangeLogContent extends StatelessWidget {
  final ParsedChangeLog parsedData;

  const _ChangeLogContent({required this.parsedData});

  @override
  Widget build(BuildContext context) {
    final commonTranslation = context.getState.commonTranslation.ensuredData;
    final releases = parsedData.releases;
    final markdown = parsedData.markdownContent;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Markdown(
          data: markdown,
          shrinkWrap: true,
          padding: EdgeInsets.zero,
          physics: const NeverScrollableScrollPhysics(),
          onTapLink: (text, href, title) {
            if (href != null) launchUrlHelper(href, context);
          },
        ),
        if (releases.isNotEmpty) ...[
          const DTDivider(height: 30),
          Text(commonTranslation.DOWNLOADS, style: CoporTextStyles.of(context).bodyStrong),
          Wrap(
            spacing: 8.0,
            runSpacing: 8.0,
            children: releases.map((asset) {
              return DTButton.surface(
                icon: asset.icon,
                label: asset.platform,
                onPressed: () => launchUrlHelper(asset.url, context),
              );
            }).toList(),
          ),
        ],
      ],
    );
  }
}
