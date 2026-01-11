# HealthRecord Agent Guidelines

This document provides coding guidelines and development workflow instructions for agents working on the HealthRecord codebase.

## Project Overview

HealthRecord is a Vue.js 3 application built with TypeScript, Vite, and Tailwind CSS. It uses CRDT (Conflict-free Replicated Data Type) architecture with Yjs for data synchronization across devices. The app tracks personal health data including vitals, measurements, and notes.

## Development Environment Setup

### Prerequisites
- Node.js (LTS version)
- npm or yarn

### Installation
```bash
git clone git@github.com:ferviddigital/healthrecord.git
cd healthrecord
npm install
```

### Development Server
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Build Commands

### Development
- `npm run dev` - Start development server with hot reload

### Production Build
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

### PWA Assets
- `npm run generate-pwa-assets` - Generate PWA icons and splash screens
- `npm run generate-pwa-icon` - Generate PWA icons only
- `npm run generate-pwa-splash` - Generate PWA splash screens only

## Type Checking and Linting

### TypeScript
The project uses strict TypeScript configuration. Run type checking with:
```bash
npx vue-tsc --noEmit
```

### Linting
No dedicated linter is configured. The project relies on TypeScript's strict mode for code quality enforcement.

## Testing

The project currently does not have a test suite configured. When adding tests in the future:

1. Install a testing framework (recommended: Vitest for Vite projects)
2. Create test files alongside source files with `.test.ts` or `.spec.ts` extension
3. Add test scripts to `package.json`

Example test command structure (when implemented):
```bash
npm run test          # Run all tests
npm run test:unit     # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run test:coverage # Generate coverage report
```

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: All TypeScript strict checks are enabled
- **Target**: ESNext
- **Module resolution**: Node with ESNext modules
- **Unused variables**: Not allowed (`noUnusedLocals: true`)
- **Unused parameters**: Not allowed (`noUnusedParameters: true`)
- **Implicit returns**: Not allowed (`noImplicitReturns: true`)

### Prettier Configuration
```json
{
  "singleQuote": true,
  "printWidth": 100,
  "arrowParens": "avoid",
  "bracketSameLine": true,
  "htmlWhitespaceSensitivity": "ignore"
}
```

### Vue.js Patterns

#### Component Structure
Use Vue 3 Composition API with `<script setup lang="ts">`:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { someStore } from '@stores/someStore';

// Props and emits
interface Props {
  personId: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  submit: [payload: SomeType];
  destroy: [];
}>();

// Reactive data
const isLoading = ref(false);

// Computed properties
const computedValue = computed(() => {
  // computation logic
});

// Functions
const handleSubmit = () => {
  // logic
};
</script>

<template>
  <!-- Template content -->
</template>
```

#### Component Naming
- PascalCase for component files: `PersonList.vue`
- kebab-case for component usage: `<person-list>`
- Component folders: Group related components in subdirectories

### Import Organization

1. Vue.js imports first
2. Third-party libraries
3. Internal imports using path aliases
4. Relative imports (avoid when possible)

```typescript
import { ref, computed, onMounted } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { people } from '@stores/people';
import PersonListItem from './PersonListItem.vue';
```

### Path Aliases

- `@stores/*` → `./src/stores/*`
- `@project-types/*` → `./src/types/*`
- `@components/*` → `./src/components/*`

### Type Definitions

#### Type Naming
- PascalCase for type names: `Person`, `HealthRecord`
- Suffix with `Type` if needed for clarity
- Use interfaces for object shapes, types for unions/primitives

#### Type Definition Files
- Place in `src/types/` directory
- Use `.d.ts` extension for ambient declarations
- Export all types for global availability

```typescript
// types/person.d.ts
type Person = {
  id: string;
  firstName: string;
  lastName: string;
  sex: string;
  dob: string;
};

type PartialPerson = Partial<Person>;
```

### Store/State Management

- Uses SyncedStore with Yjs for CRDT-based state management
- Store files in `src/stores/` directory
- Export computed values and functions

```typescript
// stores/people.ts
import { computed } from 'vue';
import { record } from '@stores/record';

/**
 * All tracked people
 *
 * @since 0.1.0
 */
export const people = computed(() => {
  if (!record.value) throw new Error('Record does not exist.');
  return record.value.people || [];
});
```

### Error Handling

- Throw descriptive Error objects with clear messages
- Use early returns for validation
- Validate required parameters at function entry

```typescript
export const create = ({ firstName, lastName, sex, dob }: PartialPerson): string => {
  if (!record.value) throw new Error('Record not found.');
  if (!firstName) throw new Error('Person must have a first name.');
  // ... more validation
};
```

### Function Documentation

Use JSDoc comments for public functions:

```typescript
/**
 * Create Person
 * @param person - Person data to create
 * @returns {string} New Person ID
 * @since 0.1.0
 */
export const create = (person: PartialPerson): string => {
  // implementation
};
```

### Naming Conventions

#### Variables and Functions
- camelCase: `personList`, `handleSubmit`, `isLoading`

#### Constants
- UPPER_SNAKE_CASE: `RECORD_VERSION`, `API_ENDPOINT`

#### Files and Directories
- kebab-case: `person-list.vue`, `health-record.ts`
- PascalCase for components: `PersonList.vue`

### CSS/Styling

- **Tailwind CSS**: Primary styling framework
- **Utility-first approach**: Use Tailwind classes in templates
- **Responsive design**: Use responsive prefixes (`sm:`, `md:`, `lg:`)
- **Custom CSS**: Place in `src/styles/style.css`

### Router Configuration

- Use lazy loading with dynamic imports
- Group routes by webpack chunks
- Use named routes consistently

```typescript
const Person = () => import(/* webpackChunkName: "group-person" */ '@components/Person/Person.vue');
```

### Security Best Practices

- Never commit secrets or API keys
- Validate all user inputs
- Use crypto.randomUUID() for ID generation
- Store sensitive data in secure localStorage with encryption

### Performance Considerations

- Use lazy loading for route components
- Implement virtual scrolling for large lists (future enhancement)
- Optimize bundle size with code splitting
- Use computed properties for derived state

### Git Workflow

#### Commit Messages
Follow conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/updates

#### Branching
- `main`/`master`: Production branch
- `develop`: Development branch
- Feature branches: `feature/description`
- Bug fixes: `fix/description`

### Deployment

The project deploys to Cloudflare Pages. Build output goes to the `dist/` directory.

### Future Enhancements

When implementing new features, consider:
- Adding comprehensive TypeScript types
- Implementing proper error boundaries
- Adding accessibility (ARIA labels, keyboard navigation)
- Progressive Web App enhancements
- Data export/import improvements

## Common Tasks

### Adding a New Component
1. Create component file in appropriate `src/components/` subdirectory
2. Use `<script setup lang="ts">` syntax
3. Define props and emits with proper typing
4. Add to router if needed
5. Update parent components to use the new component

### Adding a New Store
1. Create store file in `src/stores/`
2. Use computed properties for derived state
3. Export functions for state mutations
4. Add proper JSDoc documentation
5. Update types in `src/types/` if needed

### Adding a New Route
1. Create component in appropriate directory
2. Add lazy-loaded import to `src/router/index.ts`
3. Configure route with proper meta and props
4. Update navigation components

Remember to run `npm run build` and `npx vue-tsc --noEmit` before committing changes to ensure code quality.</content>
<parameter name="filePath">/Users/roy/Development/healthrecord/AGENTS.md