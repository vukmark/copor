import 'package:flutter_bloc/flutter_bloc.dart';

class FormSaveTriggerCubit extends Cubit<int> {
  FormSaveTriggerCubit() : super(0);

  void triggerSave() => emit(state + 1);
}
