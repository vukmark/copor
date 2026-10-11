import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/my_account/presentation/widgets/notifications.dart';
import 'package:copor_core/src/modules/my_account/presentation/widgets/user_interface.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class PreferencesTab extends StatelessWidget {
  final MyAccountPageTranslation translation;

  const PreferencesTab({super.key, required this.translation});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        final double maxWidth = constraints.maxWidth;
        if (maxWidth <= 700) {
          return _mobileLayout();
        } else {
          return _wideLayout();
        }
      },
    );
  }

  Widget _mobileLayout() {
    return SingleChildScrollView(
      padding: coporPagePadding,
      child: Column(
        children: [
          UserInterface(translation: translation),
          const SizedBox(height: 16),
          Notifications(translation: translation),
        ],
      ),
    );
  }

  Widget _wideLayout() {
    return SingleChildScrollView(
      padding: coporPagePadding,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Flexible(
            child: Column(children: [UserInterface(translation: translation)]),
          ),
          const SizedBox(width: 10.0),
          Flexible(
            child: Column(
              children: [
                Notifications(translation: translation),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
