import 'package:equatable/equatable.dart';

sealed class LanguageListEvent extends Equatable {
  const LanguageListEvent();

  @override
  List<Object?> get props => [];
}

class GetLanguage extends LanguageListEvent {}
