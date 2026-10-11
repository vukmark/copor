import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/contract_bloc.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/contract_event.dart';
import 'package:copor_core/src/utils/document_opener.dart';

class ContractEventDispatcher {
  static final _Contract contract = _Contract();
}

class _Contract {
  void getContract(BuildContext context, String contractRoute) {
    context.read<ContractBloc>().add(GetContract(contractRoute));
  }

  Future<void> openContract(Uint8List contractBuffer) =>
      DocumentOpener.openPdf(contractBuffer, fileName: 'contract.pdf');
}
