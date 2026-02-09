# Uplift (App Name)


# Run and deploy app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:** 


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

# Architecture Used

Our app uses a "Web-Native" hybrid architecture that combines the flexibility of the web with the power of a mobile app. We use React Native for Web to build our user interface, which allows us to write "mobile-style" code that runs perfectly in any browser. To make it a real app, we use Capacitor as a "native shell" that wraps our web code and provides a bridge to phone hardware like the camera and GPS. This approach is highly efficient because it lets us maintain one codebase for both web and mobile, speed up our development time, and use standard browser tools for debugging.
