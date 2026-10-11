import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class RoleType {
  static const user = 'USER';
  static const admin = 'ADMIN';
}

String? resolveHomeRoute(BuildContext context) {
  final accountInfo = context.read<AccountInfoBloc>().state.result?.data;
  if (accountInfo == null) {
    return null;
  }

  switch (accountInfo.roleType) {
    case RoleType.admin:
      return AppRoutes.administrationDashboard;
    case RoleType.user:
      return AppRoutes.homepage;
    default:
      return AppRoutes.myAccount;
  }
}
