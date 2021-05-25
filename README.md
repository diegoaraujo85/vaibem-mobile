<h1 align="center">
App Mobile
</h1>

<p align="center">Aplicativo mobile.</p>

<hr><div style="text-align:center">

  ![PNG](./.github/logo.png)

</div><hr>

## Techs & Libs

- [x] [Expo SDK39](https://docs.expo.io/)
- [x] [React Native](https://reactnative.dev/docs/getting-started)
- [x] [Styled Components](https://styled-components.com/)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [Axios](https://github.com/axios/axios)
- [x] [react-native-responsive-fontsize](https://www.npmjs.com/package/react-native-responsive-fontsize)
- [x] [react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/)
- [x] [Yup](https://github.com/jquense/yup)
- [x] [date-fns](https://date-fns.org/)
- [x] [unform](https://unform.dev/)
- [x] [React Navigation](https://reactnavigation.org/docs/getting-started)
- [x] [Reactotron](https://github.com/infinitered/reactotron)

```bash
#install expo
$ yarn global add expo-cli

#make a project's clone
$ git clone {url_projeto}

#get inside the project's folder
$ cd {pasta_projeto}

# Install dependencies
$ expo install

# Run the server
$ expo start
```
---
```bash
#anotacao
expo build:android
expo build:ios

expo publish

yarn android --variant=release
yarn ios --configuration Release
```

# Generating releases (versioning)
```
#test
npx standard-version --dry-run

#generate next version
npx standard-version

#configuration on package.json scripts
yarn release

```

# Conect Reactotron in emulator
```
adb reverse tcp:9090 tcp:9090  
```

Made with ❤ by Diego Araujo 🚀 [Get in touch!](https://www.linkedin.com/in/diegooliveiradearaujo)
