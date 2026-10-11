import 'package:bloc/bloc.dart';

class DeclinedCallsCubit extends Cubit<int> {
  DeclinedCallsCubit() : super(0);

  void setNumberOfDeclinedCalls(int number) => emit(number);

  void clearNumberOfDeclinedCalls() => emit(0);
}
