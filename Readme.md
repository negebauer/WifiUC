[![CircleCI](https://circleci.com/gh/negebauer/WifiUC/tree/dev.svg?style=svg)](https://circleci.com/gh/negebauer/WifiUC/tree/dev)
[![Dependency Status](https://dependencyci.com/github/negebauer/WifiUC/badge)](https://dependencyci.com/github/negebauer/WifiUC)

## Testing

- Run `npm run generate_env YOUR_USER YOUR_PASS`

Or

- Run `npm run generate_env`
- Replace the `WIFIUC_USER` and `WIFIUC_PASS` fields in the generated `.env` file with your username and password

And then just
```bash
npm test
```
