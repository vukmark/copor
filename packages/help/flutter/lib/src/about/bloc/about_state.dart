import 'package:copor_help/src/about/data/model/change_log_models.dart';

sealed class AboutState {
  const AboutState();
}

class AboutInitial extends AboutState {
  const AboutInitial();
}

class AboutLoading extends AboutState {
  const AboutLoading();
}

class AboutLoaded extends AboutState {
  final ChangeLogVersionInfo? info;
  final List<String> versions;

  const AboutLoaded({this.info, required this.versions});
}

class AboutError extends AboutState {
  const AboutError();
}
