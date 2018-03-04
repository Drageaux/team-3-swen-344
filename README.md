## INSTALL DEPENDENCIES
1. make sure you are using Node 6.10.0 and above to avoid inconsistencies
2. run `npm install` to automatically install packages for both Angular and Express
3. run `npm install -g concurrently @angular/cli nodemon` to install globally the packages for development

## RUN APP
- **development**: run `npm run dev`. Angular test server will start serving on http://localhost:4200, proxying to the Express server in port `3000` with live-reload for both client- and server-side code
- **production**: run `npm run start`. Node will build Angular for production into the `/dist` folder, and Express will serve it directly on http://localhost:3000

## DEPLOYMENT 
### The app is currently deployed on Heroku
- Staging: https://swen344-team3-staging.herokuapp.com/
- Production: https://swen344-team3.herokuapp.com/
