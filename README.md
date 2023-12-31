# HealthRecord
Record, track, and visualize your personal health data.

## About
HealthRecord allows individuals to record, track and visualize vital measurements and notes related to their personal health across their devices. HealthRecord data is stored in the browser for basic privacy using CRDT ([Conflict-free Replicated Data Type](https://crdt.tech/)) architecture and synced with other devices using WebRTC. HealthRecord also supports tracking multiple people in one HealthRecord. HealthRecord aims to be [local-first software](https://www.inkandswitch.com/local-first/).

See a deployment at [healthrecord.pages.dev](https://healthrecord.pages.dev/)

### Screenshots

Screenshots from the mobile PWA.

|`Overview`&nbsp;|&nbsp;&nbsp;&nbsp;`Vitals`&nbsp;&nbsp;|&nbsp;`Logbook`&nbsp;&nbsp;|
|:---:|:---:|:---:|
| ![Overview](https://github.com/ferviddigital/healthrecord/assets/1065321/e12093c8-7fbc-4eff-843a-db7ebc2ab4be) |  ![Vital](https://github.com/ferviddigital/healthrecord/assets/1065321/f9542321-bfaf-4a95-b3d5-935a1b9bd556) | ![Logbook](https://github.com/ferviddigital/healthrecord/assets/1065321/02750a9e-7486-4da0-84b6-a1707e3d1658) |

### Built With
[![Yjs][Yjs]][Yjs-url] [![Vue][Vue.js]][Vue-url] [![Vite][Vite]][Vite-url] [![Tailwind-CSS][Tailwind-CSS]][Tailwind-CSS-url] [![PostCSS][PostCSS]][PostCSS-url] [![Chart.js][Chart.js]][Chartjs-url] [![Cloudflare-Pages][Cloudflare-Pages]][Cloudflare-Pages-url] [![AGPL][AGPL]][AGPL-url]


## Features
* Track personal medical information, vitals and notes for yourself or family members
* Keep your health data portable
* Save, edit, and view multiple people to track
* Save and edit custom vitals to measure
* Save, edit, and view vital measurements
* Set low and high values for specific vitals
* Identify trends with graph visualizations
* Log a note to keep track of your physical state or symptoms
* Log a note when adding a measurement to provide more context
* Download and open passphrase encrypted data
* Sync health data between devices peer-to-peer with WebRTC
* Installs as PWA from browser
* Uses CRDT ([Conflict-free Replicated Data Type](https://crdt.tech/)) architecture.

## Getting Started
To get a local copy up and running follow these simple steps.

### Installation

1. Clone repository
```sh
git clone git@github.com:ferviddigital/healthrecord.git
```

2. Install NPM packages
```sh
cd healthrecord
npm install
```

## Usage
```sh
npm run dev
```

Visit [localhost:5173](http://localhost:5173) in your browser.

## Roadmap
- [ ] Track medications
- [ ] AI insights and vitals suggestions
- [ ] Optionally sync file to iCloud Drive, Google Drive, NextCloud
- [ ] Export data in HL7 FHIR specification

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This software is licensed under the [AGPL license](./LICENSE).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

HealthRecord Copyright &copy; 2023 Fervid Digital.

## Contact

Roy McKenzie - roy@fervid.digital

Project Link: [https://github.com/ferviddigital/healthrecord](https://github.com/ferviddigital/healthrecord)


<!-- Badges -->
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/

[Vite]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vitejs.dev/

[Tailwind-CSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-CSS-url]: https://tailwindcss.com/

[Chart.js]: https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white
[Chartjs-url]: https://www.chartjs.org/

[PostCSS]: https://img.shields.io/badge/postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white
[PostCSS-url]: https://postcss.org/

[Cloudflare-Pages]: https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=for-the-badge&logo=Cloudflare%20Pages&logoColor=white
[Cloudflare-Pages-url]: https://pages.cloudflare.com/

[Yjs]: https://img.shields.io/badge/Yjs-6beb84?style=for-the-badge
[Yjs-url]: https://docs.yjs.dev/

[AGPL]: https://img.shields.io/badge/license-AGPL-blue.svg?style=for-the-badge
[AGPL-url]: https://www.gnu.org/licenses/agpl-3.0.html
