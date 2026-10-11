import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/my_account/presentation/widgets/account_deletion.dart';
import 'package:copor_core/src/modules/my_account/presentation/widgets/contact.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class PrivacyTab extends StatelessWidget {
  final MyAccountPageTranslation translation;

  const PrivacyTab({super.key, required this.translation});

  @override
  Widget build(BuildContext context) {
    final canRequestAccountDeletion = AccountDeletion.isAllowed(context);

    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        if (constraints.maxWidth <= 700) {
          return _mobileLayout(canRequestAccountDeletion);
        } else {
          return _wideLayout(canRequestAccountDeletion);
        }
      },
    );
  }

  Widget _mobileLayout(bool canRequestAccountDeletion) {
    return SingleChildScrollView(
      padding: coporPagePadding,
      child: Column(
        children: [
          /// COMMENTED OUT UNTIL FULLY IMPLEMENTED //////////////////////////////
          //  DataRequest(translation: translation),
          //  const SizedBox(height: 20.0),
          Contact(translation: translation),
          if (canRequestAccountDeletion) ...[
            const SizedBox(height: 20.0),
            AccountDeletion(translation: translation),
          ],
        ],
      ),
    );
  }

  Widget _wideLayout(bool canRequestAccountDeletion) {
    return SingleChildScrollView(
      padding: coporPagePadding,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Contact(translation: translation),
          ),
          if (canRequestAccountDeletion) ...[
            const SizedBox(width: 20),
            Expanded(
              child: AccountDeletion(translation: translation),
            ),
          ],
        ],
      ),
    );
  }
}
