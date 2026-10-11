import 'package:copor_core/src/modules/my_account/bloc/user_account_info/user_account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/utils/account_bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';
import 'package:copor_core/src/modules/my_account/config/account_dependency_injection.dart';

class MyAccountBlocFactory {
  static _MyAccountTranslation translation = _MyAccountTranslation();

  static AccountInfoBloc initializeAccountInfoBloc() {
    return getIt<AccountInfoBloc>();
  }

  static UserAccountInfoBloc initializeUserAccountInfoBloc() {
    return getIt<UserAccountInfoBloc>();
  }

  static String getCurrentUserId() {
    return getIt<AccountInfoBloc>().state.ensuredData.id;
  }
}

class _MyAccountTranslation {
  TranslationBloc<MyAccountPageTranslation> initializeMyAccountTranslationBloc(
    BuildContext context,
  ) {
    final bloc = getIt<TranslationBloc<MyAccountPageTranslation>>();
    MyAccountBlocEventDispatcher.translation.getMyAccountTranslation(
      bloc,
      context.config.currentLanguage,
    );
    return bloc;
  }
}
