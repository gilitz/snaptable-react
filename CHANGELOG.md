# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v3.3.0

### Added

- Automated z-index calculation for sticky columns and headers
- `props.zIndex` property in column header props
- `cellProps.zIndex` property in cell props
- Automatic z-index management based on sticky column position and sticky header state

### Changed

- Z-index calculations are now handled internally by the library
- Simplified user code by removing manual z-index logic requirements
- Enhanced developer experience with automatic layering management

### Improved

- Reduced boilerplate code for sticky column implementations
- Cleaner user components with less complex logic
- Better separation of concerns between library logic and user UI

## v3.2.0

### Added

- Show/Hide columns functionality with built-in state management
- `tableState.getHiddenColumns()` method to get array of hidden columns
- `tableState.toggleColumnHidden(columnKey)` method to toggle specific column visibility
- `props.onToggleHidden()` method to hide a column from column header
- `column.hidden` property to set initial hidden state in column definition
- Enhanced layout persistence for hidden column states

### Changed

- Hidden column states are now saved to localStorage when `saveLayoutView` is enabled
- Improved component architecture and naming conventions

### Fixed

- Z-index issues when sticky headers and sticky columns are used together

## v3.1.0

### Added

- Sticky columns functionality with `hasStickyColumns` configuration
- `column.sticky` property to mark columns as sticky
- `props.isSticky` and `cellProps.isSticky` properties
- `props.stickyOffset` and `cellProps.stickyOffset` for positioning
- `props.onToggleSticky()` method to dynamically toggle sticky state
- `tableState.stickyColumns` and `tableState.stickyOffsets` properties

### Changed

- Enhanced drag & drop with sticky column constraints
- Improved layout persistence to include sticky column states

### Fixed

- Column reordering with sticky columns
- Layout persistence for sticky column configurations

## v3.0.0

### Added

- Complete rewrite as a truly headless library
- `useDataTable` hook for configuration
- `useTable` hook for table state management
- Column resizing functionality
- Drag & drop column reordering
- Layout persistence with localStorage
- Sticky header support
- Row click handlers
- TypeScript support with proper type definitions

### Changed

- **BREAKING**: Removed all UI components - now purely headless
- **BREAKING**: New API based on hooks instead of components
- **BREAKING**: Users must now build their own table markup

### Removed

- **BREAKING**: All built-in components and styling
- **BREAKING**: Previous component-based API

## v2.x - Legacy Versions

### Note

- Version 2.x and earlier were component-based with built-in styling
- These versions are no longer maintained
- See migration guide in README for upgrading to v3.x headless architecture

---

## Migration Guides

### From v2.x to v3.x

See the [Migration Guide](./README.md#migration-from-v2x) in the README for detailed instructions on upgrading from component-based to headless architecture.

### From v3.2.x to v3.3.x

No breaking changes. The z-index calculations are now handled automatically, but the old manual approach will still work if you prefer to override the automatic values.
