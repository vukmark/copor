# <Entity/Feature Name>

Status: 🔴 Not started | 🟡 In progress | 🟢 Implemented — <short caveat if any>

Owner: _(assign)_

Code: `packages/core/server/src/domain/Components/<X>`, `packages/core/server/src/client/Components/<X>`

## Purpose

What this is, why it exists, and what part of the system it scopes against
(link related entities here, e.g. `PermissionScope.X`, other modules this one
is related to but distinct from).

## Available for Roles

- **ROLE_NAME** — how this role interacts with the entity, and which
  `PermissionType` entries gate that (link
  [permissions.md](../workflow/permissions.md) for the general mechanism).
- Repeat per relevant role. State plainly if a role is not applicable.

## Data Shape (current)

```
SaveEntityDTO {
  id: string
  ...
}

GetEntityDTO {
  ...
}
```

## Expected Behavior

### Create

- Permission required.
- Validation rules.

### Update

- Permission required (note if scoped per-entity-id vs just per-role).
- Validation rules — same as create unless noted otherwise.

### Delete

- Permission required.
- What happens to dependent/owned resources.

### Read

- List each read endpoint and what it's gated/scoped by.

_(Omit any of the four sections above that don't apply to this entity.)_

## Business Rules

Bullet list of rules that aren't obvious from the code alone. Cite where each
one came from and when, e.g. `(client, YYYY-MM-DD)` or `(confirmed correct
during trace, YYYY-MM-DD)` — this is what lets a later reader tell "this is
settled" from "this is still someone's guess."

## Edge Cases

- **Resolved (client/trace, YYYY-MM-DD):** ...
- **Still open:** ...

## Known Bugs

- Description — `file/path.ts:LINE` — cross-link to another doc if the bug
  is documented in more detail there.

## Traced (YYYY-MM-DD)

Structural facts found by direct codebase investigation — not opinions, not
plans. Good place for "here's what the code actually does, confirmed by
reading it," including things that turned out to be gaps or unresolved
questions worth flagging.

## Open Questions (for follow-up with client)

1. Question — why it matters / what it affects.

## Test Cases

☐ Scenario → expected result
☐ ...

## Change History

_(log entries here as the module changes; cross-reference
[decisions.md](../decisions.md) for the "why")_

- **YYYY-MM-DD** — what changed and why.
