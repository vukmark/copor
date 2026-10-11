import 'package:bloc/bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/data/model/authorization/authorization_tokens_model.dart';
import 'package:copor_core/src/data/model/authorization/change_password_model.dart';
import 'package:copor_core/src/data/model/authorization/login_credentials_model.dart';
import 'package:copor_core/src/data/repository_impl/authorization/authorization_repository.dart';
import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_event.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_event.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../config/dependency_injection.dart';

class AuthorizationBloc extends Bloc<AuthorizationEvent, AuthorizationState> {
  final AuthorizationRepository _authorizationRepository;

  AuthorizationBloc({
    required AuthorizationRepository authorizationRepository,
  }) : _authorizationRepository = authorizationRepository,
       super(AuthorizationState.initial()) {
    on<Login>(_onLogin);
    on<GetTokens>(_onGetTokens);
    on<Logout>(_onLogout);
    on<ChangePassword>(_onChangePassword);
    on<ClearRedirect>(_onClearRedirect);
    on<RegisterValidationAndSubmitCallback>((event, emit) {
      emit(state.copyWith(onValidateAndSubmit: event.onValidateAndSubmit));
    });

    on<SavePasswordButtonPressed>((event, emit) {
      state.onValidateAndSubmit?.call();
    });
  }

  Future<void> _onGetTokens(GetTokens event, Emitter<AuthorizationState> emit) async {
    emit(AuthorizationState.loading(result: state.result));

    final result = await _authorizationRepository.getTokens();
    result.fold(
      (failure) {
        emit(AuthorizationState.unauthenticated());
      },
      (success) async {
        emit(AuthorizationState.authenticated(result: success));
      },
    );
  }

  Future<void> _onLogin(Login event, Emitter<AuthorizationState> emit) async {
    emit(AuthorizationState.loading(result: state.result));

    final result = await _authorizationRepository.login(
      LoginCredentialsModel(username: event.username, password: event.password),
    );

    result.fold(
      (failure) {
        emit(AuthorizationState.failure(failure: failure, result: state.result));
      },
      (success) async {
        add(GetTokens());
      },
    );
  }

  Future<void> _onLogout(Logout event, Emitter<AuthorizationState> emit) async {
    // Stop real-time delivery as soon as logout starts; do not wait for the HTTP request.
    getIt<WebSocketBloc>().add(const DisconnectWebSocket());
    getIt<AppScaffoldCubit>()
      ..clearInbox()
      ..clearNotificationList()
      ..clearAllBadgeCounts();
    await getIt<SharedPreferences>().remove(lastAppRouteKey);
    emit(AuthorizationState.loading(result: state.result));

    final result = await _authorizationRepository.logout();
    for (final module in AppModules.enabled) {
      await module.onLogout();
    }

    result.fold(
      (failure) {
        emit(AuthorizationState.failure(failure: failure, result: state.result));
      },
      (_) {
        emit(AuthorizationState.unauthenticated());
      },
    );
  }

  Future<void> _onChangePassword(ChangePassword event, Emitter<AuthorizationState> emit) async {
    emit(AuthorizationState.loading(result: state.result));

    final result = await _authorizationRepository.changePassword(
      ChangePasswordModel(oldPassword: event.oldPassword, newPassword: event.newPassword),
    );

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(isUpdated: true, isLoading: false));
      },
    );
  }

  void _onClearRedirect(ClearRedirect event, Emitter<AuthorizationState> emit) {
    if (state.result == null) return;

    final current = state.result!.data;

    final updatedData = AuthorizationTokensModel(
      authToken: current.authToken,
      refreshToken: current.refreshToken,
      message: current.message,
      redirect: null,
    );

    final updatedResult = state.result!.copyWith(data: updatedData);
    emit(state.copyWith(result: updatedResult));
    getIt<GoRouter>().refresh();
  }
}
