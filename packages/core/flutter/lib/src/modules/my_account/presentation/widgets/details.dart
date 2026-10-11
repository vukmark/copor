import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/utils/helper_functions.dart' show formatFullDateTime;
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class Details extends StatelessWidget {
  final MyAccountPageTranslation translation;
  final AccountInfoModel accountInfo;

  const Details({super.key, required this.translation, required this.accountInfo});

  String _formatDate(String? value) {
    final parsed = DateTime.tryParse(value ?? '')?.toLocal();

    return parsed == null ? '-' : formatFullDateTime(parsed);
  }

  @override
  Widget build(BuildContext context) {
    return DTInputDecorator(
      label: translation.DETAILS,
      child: DTInlineLabelGroup(
        children: [
          DTInlineLabel(
            label: translation.REGISTERED_DATE,
            value: _formatDate(accountInfo.registrationDate),
          ),
          DTInlineLabel(
            label: translation.LAST_VISITED_DATE,
            value: _formatDate(accountInfo.lastVisitedDate),
          ),
        ],
      ),
    );
  }
}
