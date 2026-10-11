import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_state.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_core/src/modules/my_account/presentation/widgets/biometric_unlock.dart';
import 'package:copor_core/src/modules/my_account/presentation/widgets/credentials.dart';
import 'package:copor_core/src/modules/my_account/presentation/widgets/details.dart';
import 'package:copor_core/src/modules/my_account/presentation/widgets/personal_info.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class AccountTab extends HookWidget {
  final MyAccountPageTranslation translation;

  const AccountTab({super.key, required this.translation});

  @override
  Widget build(BuildContext context) {
    final scrollController = useScrollController();

    return GuardedBlocBuilder<AccountInfoBloc, AccountInfoState>(
      builder: (context, accountInfoState) {
        final accountInfo = accountInfoState.ensuredData;

        return LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {
            final double maxWidth = constraints.maxWidth;
            if (maxWidth <= 700) {
              return _mobileLayout(accountInfo, scrollController);
            } else {
              return _wideLayout(accountInfo, scrollController);
            }
          },
        );
      },
    );
  }

  Widget _mobileLayout(AccountInfoModel accountInfo, ScrollController scrollController) {
    return SingleChildScrollView(
      controller: scrollController,
      padding: coporPagePadding,
      child: Column(
        children: [
          PersonalInfoBox(translation: translation, accountInfo: accountInfo),
          const SizedBox(height: 16.0),
          Credentials(translation: translation, accountInfo: accountInfo),
          const SizedBox(height: 16.0),
          Details(translation: translation, accountInfo: accountInfo),
          const SizedBox(height: 16.0),
          BiometricUnlock(translation: translation),
        ],
      ),
    );
  }

  Widget _wideLayout(AccountInfoModel accountInfo, ScrollController scrollController) {
    return SingleChildScrollView(
      controller: scrollController,
      padding: coporPagePadding,
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Flexible(
                child: Column(
                  children: [
                    PersonalInfoBox(translation: translation, accountInfo: accountInfo),
                  ],
                ),
              ),
              const SizedBox(width: 16.0),
              Flexible(
                child: Column(
                  children: [
                    Credentials(translation: translation, accountInfo: accountInfo),
                    const SizedBox(height: 16.0),
                    Details(translation: translation, accountInfo: accountInfo),
                    const SizedBox(height: 16.0),
                    BiometricUnlock(translation: translation),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
