import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_bloc.dart';
import 'package:copor_core/src/modules/deletion_requests/bloc/deletion_requests_bloc.dart';
import 'package:copor_core/src/modules/deletion_requests/bloc/deletion_requests_state.dart';
import 'package:copor_core/src/modules/deletion_requests/bloc/utils/deletion_requests_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_event.dart';
import 'package:copor_core/src/modules/my_account/config/my_account_keys.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

const String accountDeletionFeature = '/my-account/deletion-requests';

class AccountDeletion extends StatelessWidget {
  final MyAccountPageTranslation translation;

  const AccountDeletion({super.key, required this.translation});

  static bool isAllowed(BuildContext context) {
    final featureList = context.watch<FeatureAccessBloc>().state.result?.data.featureList ?? [];

    return featureList.contains(accountDeletionFeature);
  }

  Future<void> _confirmRequest(BuildContext context) async {
    final confirmed = await DTDialog.showConfirm(
      context,
      title: translation.REQUEST_ACCOUNT_DELETION,
      content: translation.REQUEST_ACCOUNT_DELETION_CONFIRMATION,
      cancelLabel: translation.NO,
      confirmLabel: translation.YES,
    );

    if (confirmed != true || !context.mounted) return;

    DeletionRequestsBlocEventDispatcher.requestAccountDeletion(
      context.read<DeletionRequestsBloc>(),
    );
  }

  Future<void> _confirmCancel(BuildContext context) async {
    final confirmed = await DTDialog.showConfirm(
      context,
      title: translation.CANCEL_ACCOUNT_DELETION,
      content: translation.CANCEL_ACCOUNT_DELETION_CONFIRMATION,
      cancelLabel: translation.NO,
      confirmLabel: translation.YES,
    );

    if (confirmed != true || !context.mounted) return;

    DeletionRequestsBlocEventDispatcher.cancelAccountDeletion(context.read<DeletionRequestsBloc>());
  }

  @override
  Widget build(BuildContext context) {
    final dt = CoporTextStyles.of(context);
    final isPending =
        context.watch<AccountInfoBloc>().state.result?.data.deletionRequested ?? false;

    return BlocProvider(
      create: (_) => getIt<DeletionRequestsBloc>(),
      child: BlocConsumer<DeletionRequestsBloc, DeletionRequestsState>(
        listenWhen: (previous, current) =>
            (previous.isLoading && !current.isLoading) || previous.failure != current.failure,
        listener: (context, state) {
          if (state.failure != null) {
            BlocReactions.common.addFailureToScaffold(
              context,
              state,
              MyAccountKeys.myAccountFailureAccountDeletionKey,
            );

            return;
          }

          if (state.isUpdated) {
            BlocReactions.common.addSuccessToScaffold(
              context,
              isPending
                  ? translation.ACCOUNT_DELETION_CANCELLED
                  : translation.ACCOUNT_DELETION_REQUESTED,
              MyAccountKeys.myAccountSuccessAccountDeletionKey,
            );

            context.read<AccountInfoBloc>().add(GetAccountInfo());
          }
        },
        builder: (context, state) {
          return DTInputDecorator.withHelp(
            label: translation.ACCOUNT_DELETION,
            helpContent: Text(translation.ACCOUNT_DELETION_EXPLANATION, style: dt.bodySecondary),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                if (isPending)
                  DTButton.surface(
                    label: translation.CANCEL_ACCOUNT_DELETION,
                    enabled: !state.isLoading,
                    fullWidth: true,
                    onPressed: () => _confirmCancel(context),
                  )
                else
                  DTButton.surface(
                    label: translation.REQUEST_ACCOUNT_DELETION,
                    enabled: !state.isLoading,
                    fullWidth: true,
                    onPressed: () => _confirmRequest(context),
                  ),
                const SizedBox(height: 10),
              ],
            ),
          );
        },
      ),
    );
  }
}
