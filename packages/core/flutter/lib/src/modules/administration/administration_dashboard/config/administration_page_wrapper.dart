import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_core/src/data/model/filter/bloc/utils/filter_bloc_event_dispatcher.dart';
import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/administration_namespaces.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class AdministrationPageWrapper<T extends TranslationModel> extends HookWidget {
  final String namespace;
  final Widget child;

  const AdministrationPageWrapper({super.key, required this.child, required this.namespace});

  @override
  Widget build(BuildContext context) {
    final filterKey = AdministrationNamespaces.getFilterKey(namespace);
    final route = AdministrationNamespaces.getRoute(namespace);

    useEffect(() {
      FilterBlocEventDispatcher.loadFilters('/filter/$filterKey');

      return () {
        final current = currentUri();

        if (!current!.contains(route)) {
          BlocScopeRegistry.dispose(namespace);
        }
      };
    }, []);

    return child;
  }
}
