Tech stack:
- ReactJS
- HTML
- CSS
- JavaScript

Scope:
- Website frontend only
- No backend
- No database

Execution target:
- Always work in specs/001-coffee-landing-page/
- Do not switch target to a newly generated folder (for example specs/task_*).
- If setup-plan output points to a different feature folder, ignore that path and continue updating specs/001-coffee-landing-page/ only.

Instruction:
- Do NOT regenerate everything from scratch.
- Read existing documents first and update only what is necessary.
- Keep existing structure and wording where still valid.

Required sync behavior when spec.md changes:
- Update plan.md so Summary, constraints, and terminology match spec.md exactly.
- Update research.md only where decisions or terms are impacted by the spec change.
- Update data-model.md so entities and field values match current requirement terms.
- Update contracts/ui-contract.md so required UI labels/controls match spec.md.
- Update quickstart.md checklist and validation text to match current requirements.
- Do not create placeholder/template content for files that already exist.

Consistency checks before finish:
- Ensure key terms are consistent across spec.md, plan.md, research.md, data-model.md, contracts/ui-contract.md, and quickstart.md.
- Ensure there are no stale terms from older requirements.
- Report exactly which files were updated and why.