# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [0.4.1] - 2023-10-22

### Added
- Added Note view with an edit button
- Vital Summary chart shows high / low badge for specific measurement
- User can update owner name in Settings
- Introduced first typescript definition file

### Changed
- Mobile nav bar looks like traditional app navbar
- Update Signal Server URL in new edit view
- Updated packages

### Fixed


## [0.4.0] - 2023-10-17

### Added
- Measurements open in Vital and are highlighted on chart 
- Hovering on chart reveals dashed vertical line
- User sees date range, average, measurement count on Vital Chart View
- User sees relevant logs in Vital view
- User sees logbook preview in Person overview
- User can see notes and measurements under Logbook
- User can add note while creating measurement

### Changed
- Removed ChartJs Zoom plugin
- Updated headers on Vitals and Logbook to be Left-handed
- Refactored LogEntry
- Modals fills more horizontal space on mobile
- Headers are now components

### Fixed
- Viewport is not zoomable


## [0.3.5] - 2023-10-13

### Added

### Changed
- Measurement Create/Update form infers person and vital (when possible)
- Removed all Measurements view from Settings and Person

### Fixed
- Fixed bottom padding on standalone mobile navigation


## [0.3.4] - 2023-10-12

### Added

### Changed
- Refactoring storage

### Fixed
- Fixed issue importing previous data after logging out


## [0.3.3] - 2023-10-11

### Added
- Charts show range view options

### Changed
- Using non-parametric regression formula for vital trends
- Settings now holds People and Vitals management
- App centers a Person in nav once selected
- Headers are sticky and more app-y
- Manifest pulled into Vite config
- Refactoring

### Fixed
- Fix issue with two icons showing up in insight summary on person view
- Fixed scroll saving by fixing grid (no overflow)
- Fixed ChartJS implementation typing issues


## [0.3.2] - 2023-10-07

### Added
- Added "insights" to a Person's Vital view
- Added "insights" to a Person's view

### Changed
- Modified PWA config for development
- Better UI for mobile, desktop, and large screens

### Fixed
- .gitignore ignores the correct jsconfig filename
- Address type warnings


## [0.3.1] - 2023-10-04

### Added

### Changed
- Routes are lazy loaded and chunked
- Changed Sync language and desciptions in Settings view

### Fixed
- Signal Server URL updates in settings take effect on input blur

## [0.2.0] - 2023-09-29

### Added
- syncedStore, yjs, y-indexeddb, y-webrtc libraries

### Changed
- CRDT enabled through syncedStore and Yjs
- Changed storage provider from localstorage to indexedDB
- HealthRecord type now has an ID

### Fixed


## [0.1.8] - 2023-09-22

### Added
- Added package command to generate PWA icons and splash images

### Changed
- Fixed `@typedef` for health record from `Record` (already defined) to `HealthRecord`
- Manifest file is manually managed now
- Background is more dark

### Fixed
- Fixed manifest icons and shortcuts


## [0.1.7] - 2023-09-21

### Added
- Added `@typdefs` for person, vital, measurement, record

### Changed
- Measurement Value now saves as number
- Vital High and Low values now save as number
- Made views, stores and routes more CRUDy

### Fixed
- Fixed routing issue with creating and updating a person


## [0.1.6] - 2023-09-20

### Added
- Added Vital view for individual person
- Add measurement modal for Vital view autopopulates vital
- Person can pan vital graph

### Changed

### Fixed


## [0.1.5] - 2023-09-19

### Added
- Person autopopulates when adding new measurement from Person view

### Changed
- Cleaned up routing
- Routes more semantically nested

### Fixed


## [0.1.4] - 2023-09-19

### Added
- Added PWA support
- Added Apple splash startup images
- Added favicon
- Added PWA "Add measurement" shortcut

### Changed
- App looks more app-y

### Fixed


## [0.1.3] - 2023-09-18

### Added
- User can download passphrase encrypted data file
- User can load passphrase encrypted data file

### Changed
- UUID generation for objects (using browser built-in crypto.randomUUID)

### Fixed


## [0.1.2] - 2023-09-16

### Added
- Added placeholder examples for new Vital form
- Added methods for creating sample vitals for body weight, heart rate
- Informative notice for no data added to Measurements page
- Informative notice for no data added to Person page
- Informative notice for no data added to Vitals page
- Add measurement route added for Person

### Changed
- Added documentation notes to stores
- Add measurement form add action and cancel lead to previous route

### Fixed
- Vital chart on Person page more reactive with computed data


## [0.1.1] - 2023-09-15

### Added
- Added data owner name, app version, and copyright to Settings view
- Adjusted component view padding to be more app-y.
- Added CHANGELOG.md

### Changed

### Fixed

## [0.1.0] - 2023-09-15

Initialization