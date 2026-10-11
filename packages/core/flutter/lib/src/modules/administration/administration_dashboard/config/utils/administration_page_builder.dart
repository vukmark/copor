import 'package:copor_core/src/components/password_validation/bloc/password_validation_bloc.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/config/administration_route_factory.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/config/utils/additional_page_builder.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/administration_namespaces.dart';
import 'package:copor_core/src/modules/administration/log/presentation/log_info_page.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc_impl.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

abstract class AdministrationPageBuilder {
  final String namespace;

  const AdministrationPageBuilder({required this.namespace});

  List<RouteBase> createRoute() => AdministrationRouteFactory.createRoute(
    namespace: namespace,
    additionalPageBuilder: getAdditionalPageBuilder(),
    additionalProvidersBuilder: getAdditionalProvidersBuilder(),
    useModalCreateRoute: useModalCreateRoute(),
    useModalEditRoute: useModalEditRoute(),
  );

  String getFilterKey() => AdministrationNamespaces.getFilterKey(namespace);

  String getRoute() => AdministrationNamespaces.getRoute(namespace);

  String Function(CommonTranslation) getEditTitle() =>
      AdministrationNamespaces.getTranslatedEditTitle(namespace);

  String Function(CommonTranslation) getCreateTitle() =>
      AdministrationNamespaces.getTranslatedCreateTitle(namespace);

  String getNamespace() => namespace;

  AdditionalPageBuilder? getAdditionalPageBuilder() => null;

  List<BlocProvider> Function()? getAdditionalProvidersBuilder() => null;

  bool useModalCreateRoute() => true;

  bool useModalEditRoute() => true;
}

class RolePage extends AdministrationPageBuilder {
  const RolePage() : super(namespace: AdministrationNamespaces.role);

  @override
  bool useModalCreateRoute() => true;

  @override
  bool useModalEditRoute() => true;
}

class UserPage extends AdministrationPageBuilder {
  const UserPage() : super(namespace: AdministrationNamespaces.user);

  @override
  List<BlocProvider> Function()? getAdditionalProvidersBuilder() =>
      () => [
        BlocScopeRegistry.provider<StateSimpleListBloc>(namespace),
        BlocScopeRegistry.provider<PasswordValidationBloc>(namespace),
      ];
}

class ContractTypePage extends AdministrationPageBuilder {
  const ContractTypePage() : super(namespace: AdministrationNamespaces.contractType);
}

class ContentItemsPage extends AdministrationPageBuilder {
  const ContentItemsPage() : super(namespace: AdministrationNamespaces.contentItem);

  @override
  List<BlocProvider> Function()? getAdditionalProvidersBuilder() =>
      () => [BlocScopeRegistry.provider<RoleSimpleListBloc>(namespace)];
}

class AiContextItemPage extends AdministrationPageBuilder {
  const AiContextItemPage() : super(namespace: AdministrationNamespaces.aiContextItem);
}

class LevelPage extends AdministrationPageBuilder {
  const LevelPage() : super(namespace: AdministrationNamespaces.level);
}

class DeletionRequestsPage extends AdministrationPageBuilder {
  const DeletionRequestsPage() : super(namespace: AdministrationNamespaces.deletionRequests);
}

class TagPage extends AdministrationPageBuilder {
  const TagPage() : super(namespace: AdministrationNamespaces.tag);
}

class LanguagePage extends AdministrationPageBuilder {
  const LanguagePage() : super(namespace: AdministrationNamespaces.language);
}

class NativeLanguagePage extends AdministrationPageBuilder {
  const NativeLanguagePage() : super(namespace: AdministrationNamespaces.nativeLanguage);
}

class RegionPage extends AdministrationPageBuilder {
  const RegionPage() : super(namespace: AdministrationNamespaces.region);

  @override
  List<BlocProvider> Function()? getAdditionalProvidersBuilder() =>
      () => [BlocScopeRegistry.provider<StateSimpleListBloc>(namespace)];
}

class RegionCityPage extends AdministrationPageBuilder {
  const RegionCityPage() : super(namespace: AdministrationNamespaces.regionCity);

  @override
  List<BlocProvider> Function()? getAdditionalProvidersBuilder() =>
      () => [BlocScopeRegistry.provider<StateSimpleListBloc>(namespace)];
}

class TenantPage extends AdministrationPageBuilder {
  const TenantPage() : super(namespace: AdministrationNamespaces.tenant);

  @override
  List<BlocProvider> Function()? getAdditionalProvidersBuilder() =>
      () => [BlocScopeRegistry.provider<StateSimpleListBloc>(namespace)];
}

class LogPage extends AdministrationPageBuilder {
  const LogPage() : super(namespace: AdministrationNamespaces.log);

  @override
  AdditionalPageBuilder? getAdditionalPageBuilder() => AdditionalPageBuilder(
    pageKey: 'info',
    pageBuilder: (id) => LogInfoPage(id: id!),
    title: (t) => t.VIEW_LOG_DATA,
  );
}

class SystemSettingsPage extends AdministrationPageBuilder {
  const SystemSettingsPage() : super(namespace: AdministrationNamespaces.systemSettings);
}

class StatePage extends AdministrationPageBuilder {
  const StatePage() : super(namespace: AdministrationNamespaces.state);

  @override
  List<BlocProvider> Function()? getAdditionalProvidersBuilder() =>
      () => [BlocScopeRegistry.provider<StateSimpleListBloc>(namespace)];
}
