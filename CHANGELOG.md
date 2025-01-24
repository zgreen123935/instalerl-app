# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Created dedicated `types/index.ts` for shared TypeScript interfaces
- Added proper error handling for Airtable API requests
- Added `CHANGES.md` to document all code modifications
- Created test API client for debugging Airtable connection

### Changed
- Updated Vite configuration for better preview mode support
- Modified package.json scripts for proper production preview
- Improved store implementation with proper TypeScript types
- Enhanced error handling in data fetching logic

### Fixed
- Added proper host configuration for Vite preview server
- Implemented proper type validation for Airtable records
- Added Procfile for DigitalOcean deployment
- Fixed preview command to use correct host and port

### Removed
- Removed Express server in favor of static file hosting
- Removed unnecessary dependencies (express, compression)
- Removed stale type declaration files

## [0.1.0] - 2025-01-24

### Added
- Initial project setup with Vue 3 and TypeScript
- Basic Airtable integration
- Vue Router setup
- Pinia store implementation
- Basic UI components

### Changed
- Migrated to Vite build system
- Updated to TypeScript strict mode

### Security
- Moved Airtable credentials to environment variables
- Added proper type validation for API responses
