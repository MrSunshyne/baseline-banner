# Setup Guide 🚀

Quick setup guide for the Baseline Banner project.

## Initial Setup

1. **Install dependencies**:
   ```bash
   cd /Users/sun/Projects/github.com/MrSunshyne/baseline-banner
   pnpm install
   ```

2. **Generate TypeScript types**:
   ```bash
   pnpm generate-types
   ```

3. **Build all packages**:
   ```bash
   pnpm build
   ```

## Project Structure

```
baseline-banner/
├── packages/
│   ├── core/                 # Core TypeScript library
│   │   ├── src/
│   │   │   ├── api.ts       # API logic and types
│   │   │   ├── types.ts     # Generated feature IDs (1080+)
│   │   │   └── index.ts     # Main exports
│   │   └── package.json     # @baseline-banner/core
│   │
│   └── vue/                  # Vue 3 wrapper
│       ├── src/
│       │   ├── BaselineChecker.vue  # Main component
│       │   └── index.ts     # Vue plugin exports
│       └── package.json     # @baseline-banner/vue
│
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # Workspace definition
└── README.md                # Project documentation
```

## Development Commands

- `pnpm build` - Build all packages
- `pnpm dev` - Watch mode for development
- `pnpm generate-types` - Regenerate TypeScript types from web-features
- `pnpm test` - Run tests
- `pnpm type-check` - Type checking

## Publishing (Later)

When ready to publish:

1. **Version packages**: `pnpm changeset`
2. **Update versions**: `pnpm version`
3. **Publish**: `pnpm release`

## Framework Roadmap

Future framework wrappers to add:
- [ ] React (`@baseline-banner/react`)
- [ ] Svelte (`@baseline-banner/svelte`)
- [ ] Angular (`@baseline-banner/angular`)
- [ ] Solid (`@baseline-banner/solid`)

Each will follow the same pattern:
1. Create `packages/{framework}/` directory
2. Create wrapper component using core logic
3. Add to workspace and build pipeline

## Next Steps

1. ✅ Core package with API logic
2. ✅ Vue wrapper component  
3. ✅ TypeScript support with 1080+ feature IDs
4. ✅ Build pipeline with Vite
5. 🚀 Ready for development and iteration!

The project is now fully set up and ready for development. The Vue component matches the functionality from your Nuxt project and can be published as separate npm packages.
