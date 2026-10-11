# Dynamic Forms — Field Reference

This document lists every available field type, the client-side class to use, and how it appears on the frontend.

For the end-to-end flow see [dynamic_forms_end_to_end.md](./dynamic_forms_end_to_end.md).
For how to wire up a form to an administration page see [administration_client_pattern.md](./administration_client_pattern.md).

---

## How to define a field (client side)

Every field extends a base class and optionally implements one of:

- `RequiredField` — adds `getRequiredMessage()`, marks the field mandatory
- `OptionalField` — adds `getOptionalMessage()`, shows a hint
- `UsePredefinedValues<T>` — adds `getValues()`, provides the dropdown options list

All field constructors receive the current value as their first argument (from the entity DTO). For the create case this comes from `getDefaultFormValues()` in the form controller.

---

## Field types

### Text inputs

| Client class | `FormFieldType` | Frontend widget | `getValue()` type | Notes |
|---|---|---|---|---|
| `TextField` | `TEXT` | `DTTextInput` | `String` | Generic single-line text |
| `NameField` | `TEXT` | `DTTextInput` | `String` | Semantic alias for name fields |
| `DescriptionField` | `TEXT` | `DTTextBoxInput` | `String` | Multi-line (3–12 lines) |
| `EmailField` | `EMAIL` | `DTEmailInput` | `String` | Email validation; renders disabled as `DISABLED_TEXT` |
| `GeneralEmailField` | `EMAIL` | `DTEmailInput` | `String` | Email without strict format check |
| `PostalCodeField` | `TEXT` | `DTTextInput` | `String` | Postal/zip code |
| `PasswordField` | `PASSWORD` | `DTPasswordField` ×2 | `String` | Password + confirm, match validation |
| `HtmlTextField` | `HTML_TEXT` | `HtmlInputField` | `String` | Rich text / HTML editor |
| `DisabledTextField` | `DISABLED_TEXT` | `DTDisabledTextInput` | `String` | Read-only display |
| `HiddenField` | `HIDDEN` | `SizedBox.shrink()` | `String` | Invisible; value included in submission |

**Custom text field:**
```typescript
class MyField extends TextField implements RequiredField {
    getRequiredMessage(): string { return 'MY_FIELD_IS_REQUIRED'; }
    protected getLabel(): string { return 'MY_LABEL'; }
    protected getName(): string { return 'myFieldName'; }
}
```

---

### Number inputs

| Client class | `FormFieldType` | Frontend widget | `getValue()` type |
|---|---|---|---|
| `NumberField` | `NUMBER` | `DTNumberInput` | `int` |
| `DoubleField` | `DOUBLE` | `DTDoubleInput` | `double?` |
| `LatitudeField` | `DOUBLE` | `DTDoubleInput` | `double?` |
| `LongitudeField` | `DOUBLE` | `DTDoubleInput` | `double?` |

---

### Date inputs

No ready-made server class at the moment — the unused `DateField` /
`StartDateField` / `EndDateField` were removed on 2026-10-10.
`FormFieldType.DATE` and the frontend's `DateInputField` still exist; add a
field class (value: ISO 8601 `String`) when a form needs one.

---|---|---|---|---|
| `DateField` | `DATE` | `DateInputField` | `String` (ISO 8601) | Generic date picker |
| `StartDateField` | `DATE` | `DateInputField` | `String` | Semantic alias |
| `EndDateField` | `DATE` | `DateInputField` | `String` | Semantic alias |

---

### Dropdown inputs

| Client class | `FormFieldType` | Frontend widget | `getValue()` type | Notes |
|---|---|---|---|---|
| `DropDownField<T>` | `DROPDOWN` | `DTDropdownInput` | `T` | Base class; extend and implement `getLabel()`, `getName()`, `getValues()` |
| `PublishStatusField` | `PUBLISH_STATUS` | `DTDropdownInput` | `String` | Hardcoded publish status options |
| `YesNoDropDownField` | `BOOLEAN` | `DTDropdownInput` | `bool` | Converts boolean to YES/NO options |
| `CountryField` | `COUNTRY` | `CountryInput` | `String` | Triggers state list reload on change |
| `StateField` | `STATE` | `StateInput` | `String` | Repopulates when country changes |

**Custom dropdown field:**
```typescript
class TenantField extends DropDownField<string> implements RequiredField {
    constructor(currentValue: NameAndIdDTO, private tenantList: NameAndIdDTO[]) {
        super(currentValue);
    }
    getRequiredMessage(): string { return 'TENANT_IS_REQUIRED'; }
    protected getLabel(): string { return 'TENANT'; }
    protected getName(): string { return 'tenantId'; }
    protected getValues(): NameAndIdDTO[] { return this.tenantList; }
}
```

---

### Searchable dropdowns

| Client class | `FormFieldType` | Frontend widget | `getValue()` type | Notes |
|---|---|---|---|---|
| `SearchableDropdownField` | `SEARCHABLE_DROPDOWN` | `SearchableDropdownInput` | `String` | Single select; fetches results async via `/simple-list` on keystroke |
| `SearchableMultiselect` | `SEARCHABLE_MULTISELECT` | `SearchableMultiselectInput` | `List<dynamic>` | Multi select with chips |

The `key` in the field's `searchableDropdown.key` value tells the frontend which `/simple-list` endpoint to query for search results.

---

### Special / composite inputs

| Client class | `FormFieldType` | Frontend widget | `getValue()` type | Notes |
|---|---|---|---|---|
| `ColorField` | `COLOR` | `ColorDropdown` | `int` | Color palette picker; value is color integer |

---

### Layout / display only

| Client class | `FormFieldType` | Frontend widget | Submitted | Notes |
|---|---|---|---|---|
| `HeaderField` | `HEADER` | `DTInfoRow` + `Divider` | No | Section heading |
| `DividerField` | `DIVIDER` | `Divider` | No | Visual separator |
| `SizedBoxField` | `SIZEDBOX` | `SizedBox` | No | Vertical spacing |

---

## FieldValue shape

The `currentValue` object in the JSON always sends all keys; only the relevant one is non-null:

```json
{
  "text": "string or null",
  "date": "ISO8601 or null",
  "dropdown": [{ "id": "...", "name": "..." }],
  "number": 42,
  "doubleNumber": 3.14,
  "searchableDropdown": { "key": "region-id-value" },
  "phoneNumberList": [{ "countryCode": "+1", "number": "555..." }],
  "contract": null,
  "color": { "color": 4294967295, "colorSet": [...] }
}
```

---

## Adding a new field type

If none of the existing field types fit:

1. Add a value to `FormFieldType` enum → `packages/core/server/src/client/Core/Form/FormFieldType.ts`
2. Create the field class → `packages/core/server/src/client/Core/Form/` in the appropriate subdirectory
3. Add a `FieldType` entry to the Flutter enum → `packages/core/flutter/lib/src/modules/forms/data/model/copor_form_dto.dart`
4. Add a case to `FormHelper.getFormContent()` → `packages/core/flutter/lib/src/modules/forms/presentation/utils/form_helper.dart`
5. Create the `InputFieldModel` subclass → `packages/core/flutter/lib/src/modules/forms/data/model/input_field_model.dart`
