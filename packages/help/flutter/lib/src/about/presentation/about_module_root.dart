import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_help/src/about/bloc/about_cubit.dart';
import 'package:copor_help/src/about/bloc/about_state.dart';
import 'package:copor_help/src/about/widgets/about_page_header.dart';
import 'package:copor_help/src/about/widgets/change_log_section.dart';
import 'package:copor_help/src/about/widgets/info_card_grid.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AboutModuleRoot extends StatelessWidget {
  const AboutModuleRoot({super.key});

  @override
  Widget build(BuildContext context) {
    final translation = context.getState.commonTranslation.ensuredData;
    final state = context.watch<AboutCubit>().state;

    if (state is AboutInitial || state is AboutLoading) return const SizedBox.shrink();

    if (state is AboutError) {
      return DSPageWrapper(
        isMobile: context.isMobile,
        scrollable: true,
        children: [
          DTEmptyState(
            icon: PhosphorIconsThin.warningCircle,
            title: translation.COULD_NOT_LOAD_CHANGELOG,
          ),
        ],
      );
    }

    final loaded = state as AboutLoaded;
    return DSPageWrapper(
      isMobile: context.isMobile,
      scrollable: true,
      children: [
        SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 32),
            child: Center(
              child: Column(
                children: [
                  const AboutPageHeader(),
                  const SizedBox(height: 20),
                  InfoCardGrid(changeLogInfo: loaded.info),
                  const SizedBox(height: 20),
                  ChangeLogSection(versions: loaded.versions),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
