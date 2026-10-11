import 'package:copor_cloud/src/config/cloud_module.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/cloud_layout_builder.dart';
import 'package:copor_cloud/src/presentation/cubit/cloud_bloc_factory.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

class CloudModuleRoot extends StatelessWidget {
  const CloudModuleRoot({super.key});

  @override
  Widget build(BuildContext context) {
    final maxFileSize = context.read<PreferencesBloc>().state.result?.data.moduleMaxFileSize(CloudModule.moduleName) ?? 1;
    final drivePageCubit = GetIt.instance<DrivePageCubit>()
      ..updateMaxFileSize(maxFileSize)
      ..loadMyDriveFoldersIfNeeded();

    return MultiBlocProvider(
      providers: [
        BlocProvider.value(value: drivePageCubit),
        BlocProvider<TranslationBloc<CloudPageTranslation>>(
          create: (context) => CloudBlocFactory.translation.initializeCloudTranslationBloc(context),
        ),
      ],
      child: const _CloudModuleRootContent(),
    );
  }
}

class _CloudModuleRootContent extends StatelessWidget {
  const _CloudModuleRootContent();

  @override
  Widget build(BuildContext context) {
    return MultiBlocListener(
      listeners: [
        BlocListener<PreferencesBloc, PreferencesState>(
          listenWhen: (previous, current) =>
              previous.result?.data.moduleMaxFileSize(CloudModule.moduleName) !=
              current.result?.data.moduleMaxFileSize(CloudModule.moduleName),
          listener: (context, preferencesState) {
            final maxFileSize = preferencesState.result?.data.moduleMaxFileSize(CloudModule.moduleName);
            if (maxFileSize != null) {
              context.read<DrivePageCubit>().updateMaxFileSize(maxFileSize);
            }
          },
        ),
        BlocListener<ConfigBloc, ConfigState>(
          listenWhen: (previous, current) =>
              previous.result?.data.language != current.result?.data.language,
          listener: (context, configState) {
            context.read<TranslationBloc<CloudPageTranslation>>().add(
              GetTranslationEvent<CloudPageTranslation>(
                namespace: CloudPageTranslation.namespaceStatic,
                languageModel: configState.ensuredData.language,
                constructor: (translationStringList) =>
                    CloudPageTranslation(translationStringList: translationStringList),
              ),
            );
          },
        ),
      ],
      child:
          GuardedBlocBuilder<
            TranslationBloc<CloudPageTranslation>,
            TranslationState<CloudPageTranslation>
          >(
            initialPlaceholder: const SizedBox.shrink(),
            loadingPlaceholder: const SizedBox.shrink(),
            builder: (context, translationState) {
              return CloudLayoutBuilder(translations: translationState.ensuredData);
            },
          ),
    );
  }
}
