import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/administration_filter_keys.dart';

typedef TranslationBuilder = String Function(CommonTranslation);

class _AdminNamespaceConfig {
  final String filterKey;
  final String route;
  final TranslationBuilder title;
  final TranslationBuilder editTitle;
  final TranslationBuilder createTitle;

  const _AdminNamespaceConfig({
    required this.filterKey,
    required this.route,
    required this.title,
    this.editTitle = _defaultEditTitle,
    this.createTitle = _defaultCreateTitle,
  });

  static String _defaultEditTitle(CommonTranslation t) => t.EDIT;

  static String _defaultCreateTitle(CommonTranslation t) => t.CREATE;
}

class AdministrationNamespaces {
  AdministrationNamespaces._();

  static const String role = 'role';
  static const String user = 'user';
  static const String userGroups = 'user-groups';
  static const String contractType = 'contract-type';
  static const String contentItem = 'content-item';
  static const String deletionRequests = 'deletion-requests';
  static const String level = 'level';
  static const String tag = 'tag';
  static const String permissions = 'permissions';
  static const String featureFlags = 'feature-flags';
  static const String region = 'region';
  static const String regionCity = 'region-city';
  static const String language = 'language';
  static const String nativeLanguage = 'native-language';
  static const String tenant = 'tenant';
  static const String log = 'log';
  static const String systemSettings = 'system-settings';
  static const String state = 'state';
  static const String aiContextItem = 'ai-context-item';

  static final Map<String, _AdminNamespaceConfig> _configs = {
    role: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.role,
      route: AppRoutes.role,
      title: (t) => t.ROLE,
      editTitle: (t) => t.EDIT_ROLE,
      createTitle: (t) => t.CREATE_ROLE,
    ),
    user: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.user,
      route: AppRoutes.user,
      title: (t) => t.USERS,
      editTitle: (t) => t.EDIT_USER,
      createTitle: (t) => t.CREATE_USER,
    ),
    userGroups: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.userGroups,
      route: AppRoutes.userGroups,
      title: (t) => t.USER_GROUPS,
      editTitle: (t) => t.EDIT_USER_GROUP,
      createTitle: (t) => t.CREATE_USER_GROUP,
    ),
    contractType: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.contractType,
      route: AppRoutes.contractType,
      title: (t) => t.CONTRACT_TYPES,
      editTitle: (t) => t.EDIT_CONTRACT_TYPE,
      createTitle: (t) => t.CREATE_CONTRACT_TYPE,
    ),
    deletionRequests: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.deletionRequests,
      route: AppRoutes.deletionRequests,
      title: (t) => t.DELETION_REQUESTS,
      editTitle: (t) => t.EDIT_DELETION_REQUEST,
      createTitle: (t) => t.CREATE_DELETION_REQUEST,
    ),
    contentItem: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.contentItem,
      route: AppRoutes.contentItem,
      title: (t) => t.CONTENT_ITEM,
      editTitle: (t) => t.EDIT_CONTENT_ITEM,
      createTitle: (t) => t.CREATE_CONTENT_ITEM,
    ),
    aiContextItem: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.aiContextItem,
      route: AppRoutes.aiContextItem,
      title: (t) => t.AI_CONTEXT_ITEM,
      editTitle: (t) => t.EDIT,
      createTitle: (t) => t.CREATE,
    ),
    tag: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.tag,
      route: AppRoutes.tag,
      title: (t) => t.TAGS,
      editTitle: (t) => t.EDIT_TAG,
      createTitle: (t) => t.CREATE_TAG,
    ),
    region: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.region,
      route: AppRoutes.region,
      title: (t) => t.REGIONS,
      editTitle: (t) => t.EDIT_REGION,
      createTitle: (t) => t.CREATE_REGION,
    ),
    regionCity: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.regionCity,
      route: AppRoutes.regionCity,
      title: (t) => t.REGION_CITIES,
      editTitle: (t) => t.EDIT_REGION_CITY,
      createTitle: (t) => t.CREATE_REGION_CITY,
    ),
    language: _AdminNamespaceConfig(
      filterKey: 'Filter key not found for given namespace $language',
      route: AppRoutes.language,
      title: (t) => t.LANGUAGES,
      editTitle: (t) => 'Translated edit title name not found for given namespace $language',
      createTitle: (t) => 'Translated create title name not found for given namespace $language',
    ),
    nativeLanguage: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.nativeLanguage,
      route: AppRoutes.nativeLanguage,
      title: (t) => t.NATIVE_LANGUAGES,
      editTitle: (t) => t.EDIT_NATIVE_LANGUAGE,
      createTitle: (t) => t.CREATE_NATIVE_LANGUAGE,
    ),
    tenant: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.tenant,
      route: AppRoutes.tenant,
      title: (t) => t.TENANTS,
      editTitle: (t) => t.EDIT_TENANT,
      createTitle: (t) => t.CREATE_TENANT,
    ),
    log: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.log,
      route: AppRoutes.log,
      title: (t) => t.LOGS,
      editTitle: (t) => 'Translated edit title name not found for given namespace $log',
      createTitle: (t) => 'Translated create title name not found for given namespace $log',
    ),
    permissions: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.permissions,
      route: AppRoutes.permissions,
      title: (t) => t.PERMISSIONS,
    ),
    featureFlags: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.featureFlags,
      route: AppRoutes.featureFlags,
      title: (t) => t.FEATURE_FLAGS,
    ),
    systemSettings: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.systemSettings,
      route: AppRoutes.systemSettings,
      title: (t) => t.SYSTEM_SETTINGS,
      editTitle: (t) => t.EDIT_SYSTEM_SETTINGS,
    ),
    state: _AdminNamespaceConfig(
      filterKey: AdministrationFilterKeys.state,
      route: AppRoutes.state,
      title: (t) => t.STATE,
      editTitle: (t) => t.EDIT_STATE,
      createTitle: (t) => t.CREATE_STATE,
    ),
  };

  static String getFilterKey(String namespace) =>
      _configs[namespace]?.filterKey ?? 'Filter key not found for given namespace $namespace';

  static String getRoute(String namespace) =>
      _configs[namespace]?.route ?? 'Route not found for given namespace $namespace';

  static TranslationBuilder getTranslatedTitle(String namespace) =>
      _configs[namespace]?.title ??
      (t) => 'Translated title name not found for given namespace $namespace';

  static TranslationBuilder getTranslatedEditTitle(String namespace) =>
      _configs[namespace]?.editTitle ??
      (t) => 'Translated edit title name not found for given namespace $namespace';

  static TranslationBuilder getTranslatedCreateTitle(String namespace) =>
      _configs[namespace]?.createTitle ??
      (t) => 'Translated create title name not found for given namespace $namespace';

  static const noAddButtonPages = {
    AdministrationNamespaces.log,
    AdministrationNamespaces.language,
    AdministrationNamespaces.systemSettings,
    AdministrationNamespaces.deletionRequests,
  };

  static const noSearchBarPages = {
    AdministrationNamespaces.language,
    AdministrationNamespaces.log,
    AdministrationNamespaces.systemSettings,
  };

  static const noFilterButtonPages = {
    //AdministrationNamespaces.tenant,
    AdministrationNamespaces.region,
    AdministrationNamespaces.systemSettings,
  };
}
