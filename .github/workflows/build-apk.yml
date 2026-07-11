name: Build Android APK

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Project Dependencies
        run: npm install

      - name: Build Web Production Assets
        run: npm run build

      - name: Setup Java Development Kit
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '21'

      - name: Setup Android SDK and Capacitor
        run: |
          npm install @capacitor/core @capacitor/cli
          npm install @capacitor/android
          
          # 1. Dynamically check where the production assets are built (dist or build)
          if [ -d "dist" ]; then
            echo "Detected build directory: dist"
            WEB_DIR="dist"
          elif [ -d "build" ]; then
            echo "Detected build directory: build"
            WEB_DIR="build"
          else
            echo "Error: Could not find build directory (neither 'dist' nor 'build' exists)."
            exit 1
          fi
          
          # 2. Write the correct configuration dynamically
          echo '{"appId": "com.tokenzuae.messmate", "appName": "mess-mate-app", "webDir": "'$WEB_DIR'"}' > capacitor.config.json
          
          # 3. Freshly install Android platform
          rm -rf android
          npx cap add android
          
          # 4. Inject Kotlin duplicate class resolution
          echo -e "\nsubprojects {\n    configurations.configureEach {\n        resolutionStrategy {\n            exclude group: \"org.jetbrains.kotlin\", module: \"kotlin-stdlib-jdk8\"\n            exclude group: \"org.jetbrains.kotlin\", module: \"kotlin-stdlib-jdk7\"\n        }\n    }\n}" >> android/build.gradle
          
          npx cap sync android

      - name: Build Debug APK
        run: |
          cd android
          ./gradlew assembleDebug

      - name: Upload Finished APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: mess-mate-app-apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
