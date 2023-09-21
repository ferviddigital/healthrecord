# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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