You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Developer Preferences

### File Structure

- Every component must ship with all four files: `<name>.component.html`, `<name>.component.scss`, `<name>.component.ts`, and `<name>.component.spec.ts`
- Component file names must follow the format `<name>.component.<file-format>` (e.g. `hero.component.ts`, `hero.component.html`, `hero.component.scss`, `hero.component.spec.ts`)
- Keep all shared, non-component code under `src/app/core/` organized by kind:
  - `core/interfaces/` — one interface per file, named `<name>.interface.ts`
  - `core/types/` — one type alias per file, named `<name>.type.ts`
  - `core/consts/` — one constants file per domain, named `<name>.const.ts`
  - `core/enums/` — one enum per file, named `<name>.enum.ts`
  - `core/services/app/` — application services (theme, language, etc.)
  - `core/services/api/` — API/HTTP services (one per backend resource)
- Components must NOT declare interfaces, type aliases, or data constants locally; import them from `core/` instead
- Keep interfaces and type aliases in separate files even when they belong together; have the interface import the type it needs

### Typing

- Every class property must have an explicit type annotation and an explicit access modifier (`public`/`private`/`protected`):
  - wrong: `readonly languages = LANGUAGES;`
  - right: `public readonly languages: Array<SpokenLanguage> = LANGUAGES;`
- Every method must have an explicit access modifier (`public`/`private`/`protected`): `public toggle()`, `private load()`
- Constructors and Angular lifecycle methods must also have an explicit access modifier: `public constructor()`, `public ngOnInit()`, `public ngOnDestroy(): void`
- Every method must declare an explicit return type, including `void` for methods that return nothing: `public toggle(): void`, `private load(): Theme`
- Use `Array<T>` instead of `T[]` for array types

### Enums over String Literals

- Model string-valued domains with an enum, and export a union type alias of the enum members for use as a type:
  ```ts
  export enum AppLanguage {
    en = 'en',
    fa = 'fa',
  }

  export type Language = AppLanguage.en | AppLanguage.fa;
  ```
- Use the enum everywhere (values, comparisons, switches) to prevent hardcoding raw strings; never assign a raw string literal to the union type
- Use camelCase enum member names even when the string value contains hyphens or spaces (e.g. `frontEnd = 'front-end'`). Hyphenated member names (e.g. `'front-end'`) break the Angular compiler
