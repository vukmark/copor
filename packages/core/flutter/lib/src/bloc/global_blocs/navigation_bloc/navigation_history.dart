import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/data/data_source/navigation/navigation_history_local_source.dart';
import 'package:copor_core/src/data/model/base_model.dart';

class NavigationHistory {
  final NavigationHistoryLocalSource _dataSource;
  final List<NavigationHistoryModel> _history = [];

  NavigationHistory({required NavigationHistoryLocalSource dataSource}) : _dataSource = dataSource;

  Future<void> init() async {
    final loadedHistory = await _dataSource.getHistory();
    _history.clear();
    _history.addAll(loadedHistory.where((e) => !AppRoutes.overlayRoutes.contains(e.pathName)));
    _dataSource.saveHistory(_history);
  }

  void push(NavigationHistoryModel currentUrl) {
    if (_history.isNotEmpty && _history.last.uri == currentUrl.uri) {
      return;
    }
    _history.add(currentUrl);
    _dataSource.saveHistory(_history);
  }

  String? pop() {
    if (_history.isNotEmpty) {
      _history.removeLast();
    }
    while (_history.isNotEmpty && AppRoutes.overlayRoutes.contains(_history.last.pathName)) {
      _history.removeLast();
    }
    _dataSource.saveHistory(_history);

    return _history.isEmpty ? null : _history.last.uri;
  }

  String? getLastPathName() {
    if (_history.isEmpty) {
      return null;
    }
    return _history.last.pathName;
  }

  String? findMostRecentUri(String pathName) {
    for (var i = _history.length - 2; i >= 0; i--) {
      if (_history[i].pathName == pathName) {
        return _history[i].uri;
      }
    }
    return null;
  }

  /// Discards every entry after the most recent occurrence of [pathName],
  /// so that entry becomes the top of the stack, and returns its uri.
  String? popToPath(String pathName) {
    for (var i = _history.length - 2; i >= 0; i--) {
      if (_history[i].pathName == pathName) {
        _history.removeRange(i + 1, _history.length);
        _dataSource.saveHistory(_history);
        return _history.last.uri;
      }
    }
    return null;
  }

  String? getLastUri() {
    if (_history.isEmpty) {
      return null;
    }
    return _history.last.uri;
  }
}

class NavigationHistoryModel extends BaseModel {
  final String uri;
  final String pathName;

  static const String namespaceStatic = 'navigation_history';

  const NavigationHistoryModel({required this.uri, required this.pathName});

  @override
  String get namespace => namespaceStatic;

  @override
  Map<String, dynamic> toJson() => {'uri': uri, 'pathName': pathName};

  factory NavigationHistoryModel.fromJson(Map<String, dynamic> map) =>
      NavigationHistoryModel(uri: map['uri'] as String, pathName: map['pathName'] as String);
}
