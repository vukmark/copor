import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_core/src/bloc/utils/translation_bloc_event_dispatcher.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/administration/language/config/language_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/my_account/presentation/screens/account_tab.dart';
import 'package:copor_core/src/modules/my_account/presentation/screens/preferences_tab.dart';
import 'package:copor_core/src/modules/my_account/presentation/screens/privacy_tab.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

enum MyAccountTab {
  account('account'),
  preferences('preferences'),
  privacy('privacy');

  const MyAccountTab(this.slug);

  final String slug;

  static MyAccountTab fromSlug(String? slug) =>
      values.firstWhere((tab) => tab.slug == slug, orElse: () => MyAccountTab.account);
}

class MyAccountPage extends HookWidget {
  final MyAccountTab initialTab;

  const MyAccountPage({super.key, required this.initialTab});

  @override
  Widget build(BuildContext context) {
    TranslationBlocEventDispatcher.getTranslation<MyAccountPageTranslation>(
      namespace: MyAccountPageTranslation.namespaceStatic,
      constructor: (list) => MyAccountPageTranslation(translationStringList: list),
    );
    LanguageBlocEventDispatcher.hook.getLanguageList();

    return GuardedBlocBuilder<
      TranslationBloc<MyAccountPageTranslation>,
      TranslationState<MyAccountPageTranslation>
    >(
      builder: (context, translationState) {
        return MyAccountPageContent(
          translation: translationState.ensuredData,
          initialTab: initialTab,
        );
      },
    );
  }
}

class MyAccountPageContent extends StatelessWidget {
  final MyAccountPageTranslation translation;
  final MyAccountTab initialTab;

  const MyAccountPageContent({super.key, required this.translation, required this.initialTab});

  @override
  Widget build(BuildContext context) {
    final preferences = context.watch<PreferencesBloc>().state.ensuredData;
    final useIcons = preferences.useIcons;
    final isMobile = context.isMobile;

    final tabs = useIcons
        ? [
            Tab(icon: Icon(PhosphorIconsThin.userCircle)),
            Tab(icon: Icon(PhosphorIconsThin.gear)),
            Tab(icon: Icon(PhosphorIconsThin.shield)),
          ]
        : [
            Tab(text: translation.ACCOUNT),
            Tab(text: translation.PREFERENCES),
            Tab(text: translation.PRIVACY),
          ];

    final tabViews = [
      AccountTab(translation: translation),
      PreferencesTab(translation: translation),
      PrivacyTab(translation: translation),
    ];

    return DefaultTabController(
      key: ValueKey(initialTab),
      length: tabs.length,
      initialIndex: initialTab.index,
      child: DSPageWrapper(
        isMobile: isMobile,
        scrollable: false,
        children: [
          LayoutBuilder(
            builder: (context, constraints) {
              final double minTabWidth = useIcons ? 90.0 : 125.0;
              final double totalRequiredWidth = tabs.length * minTabWidth;
              final double tabBarContainerWidth = totalRequiredWidth > constraints.maxWidth
                  ? totalRequiredWidth
                  : constraints.maxWidth;

              final bool shouldBeScrollable = totalRequiredWidth > constraints.maxWidth;

              return SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                physics: shouldBeScrollable
                    ? const ClampingScrollPhysics()
                    : const NeverScrollableScrollPhysics(),
                child: SizedBox(
                  width: tabBarContainerWidth,
                  child: DTTabBar(tabs: tabs),
                ),
              );
            },
          ),
          Expanded(child: TabBarView(children: tabViews)),
        ],
      ),
    );
  }
}
