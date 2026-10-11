import 'package:copor_core/src/modules/administration/user/bloc/user_form/user_form_event.dart';
import 'package:copor_core/src/modules/administration/user/bloc/user_form/user_form_state.dart';
import 'package:copor_core/src/modules/administration/user/data/repository/user_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UserFormBloc extends Bloc<UserFormEvent, UserFormState> {
  final UserRepository _userRepository;

  UserFormBloc({required UserRepository userRepository})
    : _userRepository = userRepository,
      super(UserFormState.initial()) {
    on<GetUser>(_onGetUser);
    on<CreateUser>(_onCreateUser);
    on<UpdateUser>(_onUpdateUser);
  }

  Future<void> _onGetUser(GetUser event, Emitter<UserFormState> emit) async {
    emit(UserFormState.loading(result: state.result));

    final result = await _userRepository.getUser(event.userId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onCreateUser(CreateUser event, Emitter<UserFormState> emit) async {
    emit(UserFormState.loading(result: state.result));

    final result = await _userRepository.createUser(event.userToCreate);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.create));
      },
    );
  }

  Future<void> _onUpdateUser(UpdateUser event, Emitter<UserFormState> emit) async {
    emit(UserFormState.loading(result: state.result));

    final result = await _userRepository.updateUser(event.userToUpdate);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.update));
      },
    );
  }
}
