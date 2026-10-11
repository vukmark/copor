import 'package:data_table_2/data_table_2.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/buttons/copor_button.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_admin/feature_admin_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_admin/feature_admin_event.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/feature_admin/feature_admin_state.dart';
import 'package:copor_core/src/modules/administration/feature_flags/config/feature_page_scope.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/model/feature_model.dart';
import 'package:copor_core/src/modules/administration/feature_flags/presentation/feature_card_mobile.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class FeaturePage extends HookWidget {
  const FeaturePage({super.key});

  List<FeatureModel> _deepCopy(List<FeatureModel> source) {
    return source
        .map(
          (f) => FeatureModel(
            featureId: f.featureId,
            featureName: f.featureName,
            roleList: f.roleList
                .map(
                  (r) =>
                      FeatureRoleModel(roleId: r.roleId, roleName: r.roleName, enabled: r.enabled),
                )
                .toList(),
          ),
        )
        .toList();
  }

  void onSubmit(
    BuildContext context,
    FeatureAdminState state,
    ValueNotifier<List<FeatureModel>> editedFeatures,
  ) {
    final originalData = state.result?.data ?? [];
    final dtos = editedFeatures.value
        .where((editedFeature) {
          final originalFeature = originalData.firstWhere(
            (f) => f.featureId == editedFeature.featureId,
            orElse: () => editedFeature,
          );
          return editedFeature.roleList.asMap().entries.any((entry) {
            final roleIndex = entry.key;
            return entry.value.enabled != originalFeature.roleList[roleIndex].enabled;
          });
        })
        .map((f) {
          final enabledRoles = f.roleList.where((r) => r.enabled).map((r) => r.roleId).toList();
          return FeatureModelDTO(featureId: f.featureId, enabledRoles: enabledRoles);
        })
        .toList();

    if (dtos.isNotEmpty) {
      context.read<FeatureAdminBloc>().add(SetFeatureList(dtos));
    }
  }

  @override
  Widget build(BuildContext context) {
    final editedFeatures = useState<List<FeatureModel>>([]);
    final translation = context.getState.commonTranslation.ensuredData;

    useEffect(() {
      context.read<FeatureAdminBloc>().add(GetFeatureListForRoles());
      return () {
        final current = currentUri();

        if (!current!.contains(AppRoutes.featureFlags)) {
          BlocScopeRegistry.dispose(FeaturePageScope.featurePageScopeString);
        }
      };
    }, const []);

    return MultiBlocListener(
      listeners: [
        BlocListener<FeatureAdminBloc, FeatureAdminState>(
          listenWhen: (previous, current) => !previous.isUpdated && current.isUpdated,
          listener: (context, state) {
            context.getBloc.appScaffold.addBanner(
              DSBanner.success(translation.FEATURE_FLAGS_SAVED, source: 'feature_flags_success'),
            );
            context.read<FeatureAdminBloc>().add(GetFeatureListForRoles());
          },
        ),
        BlocListener<FeatureAdminBloc, FeatureAdminState>(
          listenWhen: (previous, current) => previous.result != current.result,
          listener: (context, state) {
            if (state.result != null && state.result!.data.isNotEmpty) {
              editedFeatures.value = _deepCopy(state.result!.data);
            }
          },
        ),
      ],
      child: BlocBuilder<FeatureAdminBloc, FeatureAdminState>(
        builder: (context, state) {
          if ((state.isLoading || state.result == null) &&
              state.failure == null &&
              editedFeatures.value.isEmpty) {
            return const SizedBox.shrink();
          }

          if (state.failure != null && editedFeatures.value.isEmpty) {
            return const SizedBox.shrink();
          }

          if (editedFeatures.value.isEmpty) {
            return Center(child: Text(translation.NO_FEATURES_FOUND));
          }

          return DSPageWrapper(
            isMobile: context.isMobile,
            children: [
              _buildFeatureContent(context, editedFeatures, translation),
              _buildBottomActionBar(context, state, editedFeatures, translation),
            ],
          );
        },
      ),
    );
  }

  Widget _buildFeatureContent(
    BuildContext context,
    ValueNotifier<List<FeatureModel>> editedFeatures,
    CommonTranslation translation,
  ) {
    final features = editedFeatures.value;
    final roles = features.first.roleList;

    return Expanded(
      child: context.isMobile
          ? _buildMobileView(context, editedFeatures, translation)
          : _buildDesktopView(context, editedFeatures, roles, translation),
    );
  }

  Widget _buildMobileView(
    BuildContext context,
    ValueNotifier<List<FeatureModel>> editedFeatures,
    CommonTranslation translation,
  ) {
    return ListView.builder(
      itemCount: editedFeatures.value.length,
      itemBuilder: (context, index) {
        final feature = editedFeatures.value[index];
        return FeatureCardMobile(
          translation: translation,
          feature: feature,
          onToggleAll: (enableAll) {
            final copy = _deepCopy(editedFeatures.value);
            for (int i = 0; i < copy[index].roleList.length; i++) {
              final role = copy[index].roleList[i];
              copy[index].roleList[i] = FeatureRoleModel(
                roleId: role.roleId,
                roleName: role.roleName,
                enabled: enableAll,
              );
            }
            editedFeatures.value = copy;
          },
          onToggleRole: (roleIndex, enabled) {
            final copy = _deepCopy(editedFeatures.value);
            final role = copy[index].roleList[roleIndex];
            copy[index].roleList[roleIndex] = FeatureRoleModel(
              roleId: role.roleId,
              roleName: role.roleName,
              enabled: enabled,
            );
            editedFeatures.value = copy;
          },
        );
      },
    );
  }

  Widget _buildDesktopView(
    BuildContext context,
    ValueNotifier<List<FeatureModel>> editedFeatures,
    List<FeatureRoleModel> roles,
    CommonTranslation translation,
  ) {
    return DataTable2(
      isHorizontalScrollBarVisible: true,
      columnSpacing: 12,
      horizontalMargin: 20,
      minWidth: 900,
      dataRowHeight: 60,
      headingRowDecoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerHighest,
        border: BoxBorder.fromLTRB(
          bottom: BorderSide(color: Theme.of(context).colorScheme.outline, width: 0.5),
        ),
      ),
      columns: _buildTableColumns(roles, translation),
      rows: editedFeatures.value
          .asMap()
          .entries
          .map((entry) => _buildFeatureRow(context, entry.key, entry.value, editedFeatures))
          .toList(),
    );
  }

  List<DataColumn2> _buildTableColumns(
    List<FeatureRoleModel> roles,
    CommonTranslation translation,
  ) {
    return [
      DataColumn2(label: Text(translation.FEATURE), size: ColumnSize.M),
      DataColumn2(
        label: Text(translation.GLOBAL),
        size: ColumnSize.L,
        headingRowAlignment: MainAxisAlignment.center,
      ),
      ...roles.map(
        (role) => DataColumn2(
          label: SizedBox(
            width: 150,
            child: Text(role.roleName, softWrap: true, textAlign: TextAlign.center),
          ),
          size: ColumnSize.L,
          headingRowAlignment: MainAxisAlignment.center,
        ),
      ),
    ];
  }

  DataRow2 _buildFeatureRow(
    BuildContext context,
    int featureIndex,
    FeatureModel feature,
    ValueNotifier<List<FeatureModel>> editedFeatures,
  ) {
    final allEnabled = feature.roleList.every((r) => r.enabled);

    return DataRow2(
      cells: [
        DataCell(Text(feature.featureName)),
        DataCell(
          Center(
            child: Switch(
              value: allEnabled,
              onChanged: (val) {
                final copy = _deepCopy(editedFeatures.value);
                for (int i = 0; i < copy[featureIndex].roleList.length; i++) {
                  final role = copy[featureIndex].roleList[i];
                  copy[featureIndex].roleList[i] = FeatureRoleModel(
                    roleId: role.roleId,
                    roleName: role.roleName,
                    enabled: val,
                  );
                }
                editedFeatures.value = copy;
              },
            ),
          ),
        ),
        ...feature.roleList.asMap().entries.map((entry) {
          final roleIndex = entry.key;
          final role = entry.value;
          return DataCell(
            Center(
              child: Switch(
                value: role.enabled,
                onChanged: (val) {
                  final copy = _deepCopy(editedFeatures.value);
                  copy[featureIndex].roleList[roleIndex] = FeatureRoleModel(
                    roleId: role.roleId,
                    roleName: role.roleName,
                    enabled: val,
                  );
                  editedFeatures.value = copy;
                },
              ),
            ),
          );
        }),
      ],
    );
  }

  Widget _buildBottomActionBar(
    BuildContext context,
    FeatureAdminState state,
    ValueNotifier<List<FeatureModel>> editedFeatures,
    CommonTranslation translation,
  ) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        boxShadow: [
          BoxShadow(color: Colors.black.withAlpha(5), offset: const Offset(0, -2), blurRadius: 4.0),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          CoporButton(
            outlined: true,
            onPressed: () {
              if (state.result != null) {
                editedFeatures.value = _deepCopy(state.result!.data);
              }
            },
            label: translation.DISCARD,
          ),
          const SizedBox(width: 16.0),
          CoporButton(
            onPressed: () => onSubmit(context, state, editedFeatures),
            label: translation.SAVE,
          ),
        ],
      ),
    );
  }
}
