import 'package:go_router/go_router.dart';

abstract class Dispatcher {
  Future<void> go(String url);
  Future<Object?> push(String url);
  Future<void> pop();
}

class DispatcherImpl implements Dispatcher {
  final GoRouter router;

  DispatcherImpl({required this.router});

  @override
  Future<void> go(String url) async {
    return router.go(url);
  }

  @override
  Future<Object?> push(String url) async {
    return router.push(url);
  }

  @override
  Future<void> pop() async {
    return router.pop();
  }
}
