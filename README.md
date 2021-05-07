# DemoApp

an app for tracking and sending jobcoins

### Install instructions

Run the following commands in the terminal in DemoApp root dir

-   git clone https://github.com/Ligerlilly/DemoApp.git
-   cd DemoApp
-   npm install
-   cd ios && pod install
-   npm start (in another terminal in DemoApp root dir)
-   npm run ios
-   you can login as Alice or Bob

to get android to work (sigh) i had to

-   go in `Configure>SDK Manager` in android studio
-   select `SDK tools` and install `Google Play Licensing Library`
-   run this cmd in the terminal `export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"`
-   run cmd `npm run android`

### Technologies used

A non exhaustive list

-   [React Native](https://reactnative.dev/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)
-   [React Navigation](https://reactnavigation.org/)
-   [Victory](https://formidable.com/open-source/victory/)
-   [Jest](https://jestjs.io/)
-   [Enzyme](https://enzymejs.github.io/enzyme/)

### Tests

To run tests use cmd `npm run test` (More tests could be written)

### Notes

I haven't used redux-toolkit before, seems pretty cool I like the less boilerplate.
