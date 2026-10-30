# Project Dialogs Implementation Plan

**Goal:** Remove SweetAlert2 and deliver reusable project-owned MUI dialogs.
**Architecture:** AppDialog provides presentation; a queued external store and DialogHost provide promise-based showDialog(options): Promise<boolean> at the application root.
**Tech Stack:** React 18, MUI 6, Vitest, Testing Library; no new dependencies.
**Spec:** docs/superpowers/specs/2026-10-30-project-dialogs.md

## Constraints
Preserve business actions; match violet/Montserrat; use existing dependencies.

## Review focus
Cancel must never execute destructive actions. Concurrent requests must resolve separately. Text must render safely. Focus must return to its trigger. Pending actions must prevent duplicate submission and dismissal.

## Tasks
- [x] Write and run failing dialog tests for confirmation, cancellation, queueing, safe text, focus restoration, and pending state.
- [x] Implement src/ui/dialogs/{AppDialog.jsx,DialogHost.jsx,dialogService.js} and satisfy tests.
- [x] Mount host in src/App.jsx; migrate all 11 feature files and two test mocks to showDialog with boolean results.
- [x] Remove dependency and override; refresh package-lock.json.
- [x] Run targeted dialog/auth/commerce tests and affected-file ESLint; update Graphify; inspect targeted diff.

## Verification
18/18 targeted tests passed (dialogs, auth, commerce). Affected-file ESLint and git diff --check passed. No SweetAlert2 references remain in src or package manifests. Graphify AST update completed (700 nodes). Visual browser review was not run.
