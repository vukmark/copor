import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CoporFormEventDispatcher {
  static CoporForm coporForm = CoporForm();
}

class CoporForm {
  void getCoporForm(String baseEndpoint, [String? id]) {
    final context = useContext();

    final String endpoint = id != null ? '$baseEndpoint/$id' : baseEndpoint;

    useEffect(() {
      final coporFormBloc = context.read<CoporFormBloc>();

      if (!coporFormBloc.isClosed) {
        coporFormBloc.add(GetCoporForm(endpoint));
      }

      return () {
        if (!coporFormBloc.isClosed) {
          coporFormBloc.add(const ClearCoporForm());
        }
      };
    }, [endpoint]);
  }

  void getPublicCoporForm(String baseEndpoint, [String? id]) {
    final context = useContext();

    final String endpoint = id != null ? '$baseEndpoint/$id' : baseEndpoint;

    useEffect(() {
      final coporFormBloc = context.read<CoporFormBloc>();

      if (!coporFormBloc.isClosed) {
        coporFormBloc.add(GetPublicCoporForm(endpoint));
      }

      return () {
        if (!coporFormBloc.isClosed) {
          coporFormBloc.add(const ClearCoporForm());
        }
      };
    }, [endpoint]);
  }

  void filterCommonPasswordsField(
    BuildContext context,
    bool blockCommonPasswords,
    Map<String, dynamic> currentValues,
  ) {
    final coporFormBloc = context.read<CoporFormBloc>();

    if (!coporFormBloc.isClosed) {
      coporFormBloc.add(FilterCommonPasswordsField(blockCommonPasswords, currentValues));
    }
  }
}
