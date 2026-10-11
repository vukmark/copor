import 'package:flutter/material.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// Scope Builder abstract class for implementing buildScope method, which is
/// returned by wrapping it in the build method with transparent material.
abstract class ScopeBuilder extends StatelessWidget {
  final String id;
  final Widget child;

  const ScopeBuilder({super.key, required this.id, required this.child});

  Widget buildScope(BuildContext context, Widget child);

  @override
  Widget build(BuildContext context) {
    final materialChild = Material(type: MaterialType.transparency, child: child);

    return KeyedSubtree(key: ValueKey(id), child: buildScope(context, materialChild));
  }
}

///  Used for getting blocs with getIt and then registering those instances
/// as named Singletons. We name those Singletons so we can access them through
/// different routes through the id. In useEffects of pages, you should
/// dispose of them by calling BlocScopeRegistry.dispose(id), which triggers
/// the cleanup logic of BlocScopeRegistry.
class BlocScopeRegistry {
  static final Map<String, List<VoidCallback>> _cleanupRegistry = {};

  static BlocProvider<T> provider<T extends StateStreamableSource<Object?>>(String id) {
    if (!getIt.isRegistered<T>(instanceName: id)) {
      final instance = getIt<T>();
      getIt.registerSingleton<T>(instance, instanceName: id);

      if (!_cleanupRegistry.containsKey(id)) {
        _cleanupRegistry[id] = [];
      }
      _cleanupRegistry[id]!.add(() => getIt.unregister<T>(instanceName: id));

      /// uncomment for checking successful registration
      //final count = _cleanupRegistry.values.fold(0, (acc, list) => acc + list.length);
      //print('BlocScopeRegistry: Registered ${T.toString()} for $id. Total Blocs: $count');
    }

    return BlocProvider<T>.value(value: getIt<T>(instanceName: id));
  }

  static void dispose(String id) {
    final cleanups = _cleanupRegistry.remove(id);
    if (cleanups != null) {
      for (final cleanup in cleanups) {
        cleanup();
      }
    }

    /// uncomment for checking successful disposal
    //final count = _cleanupRegistry.values.fold(0, (acc, list) => acc + list.length);
    //print('BlocScopeRegistry: Disposed $id. Total Blocs remaining: $count');
  }
}
