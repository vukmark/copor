import 'dart:async';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_access/feature_access_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:flutter/material.dart';

class GoRouterRefreshNotifier extends ChangeNotifier {
  final ConfigBloc configBloc;
  final AuthorizationBloc authorizationBloc;
  final FeatureAccessBloc featureAccessBloc;
  final AccountInfoBloc accountInfoBloc;

  late final StreamSubscription _configSub;
  late final StreamSubscription _authSub;
  late final StreamSubscription _featureSub;
  late final StreamSubscription _accountInfoSub;

  GoRouterRefreshNotifier(
    this.configBloc,
    this.authorizationBloc,
    this.featureAccessBloc,
    this.accountInfoBloc,
  ) {
    _configSub = configBloc.stream.listen((_) => notifyListeners());
    _authSub = authorizationBloc.stream.listen((state) => notifyListeners());
    _featureSub = featureAccessBloc.stream.listen((state) => notifyListeners());
    _accountInfoSub = accountInfoBloc.stream.listen((state) => notifyListeners());
  }

  @override
  void dispose() {
    _configSub.cancel();
    _authSub.cancel();
    _featureSub.cancel();
    _accountInfoSub.cancel();
    super.dispose();
  }
}
