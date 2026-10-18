# Pokédex

A Pokédex app (school final assignment) on [PokeAPI](https://pokeapi.co/docs/v2): list, search, detail, evolution chain, favorites and compare.

## Stack and structure

- Expo Router, TanStack Query, expo-sqlite. Must run in **Expo Go**: no libraries that need a development build.
- Screens in `src/app/`, data through hooks in `src/hooks/`, API calls and SQL in `src/services/`, reusable UI in `src/components/`.
- Screens never call `fetch` or SQLite directly; they use a hook. Pure logic (filtering, mapping API data) lives in its own function so it can be tested without UI.
- Colours, fonts and spacing only from `src/constants/theme.ts`. No hard-coded colours in components.
- Every load has a loading state and an error state with a "Try again" button.
- Design: follow the Figma screenshots in `docs/figma/`. Font: Rubik (`Fonts` in the theme).
- Specs: `specs/product.md` and `specs/features/*.md`. Build only what the feature spec says; its Out of Scope is a hard limit.

## Workflow

- One GitHub issue per feature, one branch per issue: `feature/<issue-number>-<short-name>`.
- First post a plan with a `- [ ]` task list on the issue (`gh issue comment`). Wait for my "go" before writing code.
- Small commits. Run `npm run lint` and `npm run typecheck` before saying a task is done.
- Pull request body contains `closes #<number>`. Merge with a merge commit, **never squash**.
- Never force-push, never rewrite history. My git history is part of my hand-in.
- After running a generator (`create-expo-app` etc.), check that it did not create its own `.git` and run `git log` to confirm the history is intact.

---

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
