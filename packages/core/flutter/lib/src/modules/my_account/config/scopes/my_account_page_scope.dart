import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_bloc.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_state.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/my_account/bloc/biometric_unlock/biometric_unlock_cubit.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_event.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_state.dart';
import 'package:copor_core/src/modules/my_account/bloc/utils/account_bloc_reactions.dart';
import 'package:copor_core/src/modules/my_account/config/my_account_keys.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class MyAccountPageScope extends ScopeBuilder {
  const MyAccountPageScope({super.key, required super.id, required super.child});

  static const String myAccountPageScopeString = 'my_account_page_scope';

  @override
  Widget buildScope(BuildContext context, Widget child) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => getIt<CoporFormBloc>()),
        BlocScopeRegistry.provider<LanguageBloc>(id),
        BlocScopeRegistry.provider<AccountInfoBloc>(id),
        BlocProvider(create: (context) => getIt<BiometricUnlockCubit>()),
        BlocScopeRegistry.provider<TranslationBloc<MyAccountPageTranslation>>(
          MyAccountPageTranslation.namespaceStatic,
        ),
      ],
      child: Builder(
        builder: (context) {
          return MultiBlocListener(
            listeners: [
              FailureListener<CoporFormBloc, CoporFormState>(
                failureKey: MyAccountKeys.myAccountFailureFormKey,
              ),
              FailureListener<AccountInfoBloc, AccountInfoState>(
                failureKey: MyAccountKeys.myAccountFailureAccountInfoKey,
              ),
              FailureListener<LanguageBloc, LanguageListState>(
                failureKey: MyAccountKeys.myAccountFailureLanguageListKey,
              ),
              CoporFormListener(
                additionalLogic: (context) {
                  context.read<AccountInfoBloc>().add(GetAccountInfo());

                },
                successNavigation: CoporFormSuccessNavigation.closeRootModal,
              ),
              BlocListener<AccountInfoBloc, AccountInfoState>(
                listenWhen: (previous, current) => previous.isLoading != current.isLoading,
                listener: (context, state) {
                  BlocReactions.common.addRequestLoadingToScaffold(
                    context,
                    state,
                    MyAccountKeys.myAccountLoadingAccountInfoKey,
                  );
                },
              ),
              BlocListener<AuthorizationBloc, AuthorizationState>(
                listener: (context, state) {
                  final translation = context
                      .read<TranslationBloc<MyAccountPageTranslation>>()
                      .state
                      .ensuredData;
                  if (state.isUpdated == true) {
                    context.getBloc.appScaffold.addBanner(
                      DSBanner.success(
                        translation.PASSWORD_UPDATE_MESSAGE,
                        source: 'password_update_success',
                      ),
                    );
                    //  BlocEventDispatcher.authorization.logout(
                    //    context.getBloc.authorization,
                    //    context.getBloc.accountInfo,
                    //    context.getBloc.webSocket,
                    //  );
                  }
                },
              ),
              BlocListener<ConfigBloc, ConfigState>(
                listenWhen: (previous, current) =>
                    previous.result?.data.language != current.result?.data.language,
                listener: (context, configState) {
                  MyAccountBlocReactions.myAccount.getMyAccountPageTranslation(context);
                },
              ),
              BlocListener<LanguageBloc, LanguageListState>(
                listenWhen: (previous, current) => previous.isLoading != current.isLoading,
                listener: (context, state) {
                  BlocReactions.common.addRequestLoadingToScaffold(
                    context,
                    state,
                    MyAccountKeys.myAccountLoadingLanguageListKey,
                  );
                },
              ),
              BlocListener<
                TranslationBloc<MyAccountPageTranslation>,
                TranslationState<MyAccountPageTranslation>
              >(
                listenWhen: (previous, current) => previous.isLoading != current.isLoading,
                listener: (context, state) {
                  BlocReactions.common.addRequestLoadingToScaffold(
                    context,
                    state,
                    MyAccountKeys.myAccountLoadingTranslationKey,
                  );
                },
              ),
            ],
            child: child,
          );
        },
      ),
    );
  }
}
