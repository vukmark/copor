import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/contract_event.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/contract_state.dart';
import 'package:copor_core/src/modules/login/registration/data/repository/contract/contract_repository.dart';

class ContractBloc extends Bloc<ContractEvent, ContractState> {
  final ContractRepository contractRepository;

  ContractBloc({required this.contractRepository}) : super(const ContractState.initial()) {
    on<GetContract>(_onGetContract);
  }

  Future<void> _onGetContract(GetContract event, Emitter<ContractState> emit) async {
    emit(ContractState.loading(result: null));

    final result = await contractRepository.getContract(event.contractRoute);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(isLoading: false, result: success));
      },
    );
  }
}
