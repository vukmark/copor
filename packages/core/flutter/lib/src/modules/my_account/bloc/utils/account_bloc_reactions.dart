import 'package:copor_core/src/modules/my_account/bloc/utils/account_bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';

class MyAccountBlocReactions {
  static MyAccount myAccount = MyAccount();
}

class MyAccount {
  void getMyAccountPageTranslation(BuildContext context) {
    MyAccountBlocEventDispatcher.translation.getMyAccountTranslation(
      context.getBloc.myAccountTranslation,
      context.config.currentLanguage,
    );
  }

  void getAccountInfoWhenAuthenticated(BuildContext context, AuthorizationState state) {
    final authorizationData = state.result;
    if (authorizationData != null && authorizationData.data.authToken.isNotEmpty) {
      MyAccountBlocEventDispatcher.accountInfo.getAccountInfo(context.getBloc.accountInfo);
    }
  }
}
