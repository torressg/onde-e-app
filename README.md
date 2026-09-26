# Onde É

Indoor navigation web app. It helps people find rooms inside large buildings where GPS doesn't reach, with a 3D map and generated routes.

**Live:** [onde-e-interface.vercel.app](https://onde-e-interface.vercel.app)

Built in 2024 as my Computer Science capstone project (TCC) at Universidade Municipal de São Caetano do Sul (USCS). The map covers the ground floor of the USCS Conceição campus.

<p align="center">
  <img alt="Home screen" src="./assets/pagina-inical.jpg" width="200px">
  <img alt="List of rooms" src="./assets/lista-ambientes.jpg" width="200px">
</p>

## Features

- Navigate a 3D map of the building
- Generate a route to any room
- Browse every room on the floor

## Stack

- **Next.js**, **React** and **TypeScript**
- **Back4App** for data
- Designed in [Figma](https://www.figma.com/design/nir8gyMAED39S0mPGQTLLY/Onde%C3%89?node-id=0-1&t=7aLrdIN1HRZLLCVz-1)

## Running locally

Requires Node.js.

```bash
git clone https://github.com/torressg/onde-e-app
cd onde-e-app
npm i
npm run dev   # http://localhost:3000
```

The app reads its data from Back4App through environment variables. The table data and a step-by-step guide to set up `.env` are in this [Google Drive folder](https://drive.google.com/drive/folders/1kQaJXp2ytjZYAL31rDRF3U_2frqtNjTX?usp=sharing).

## License

MIT
