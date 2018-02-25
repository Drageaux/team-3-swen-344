## INSTALL DEPENDENCIES
1. make sure you are using Node 6.10.0 and above to avoid inconsistencies
2. run `npm install` to install packages for Express
3. `cd` to `angular` folder and run `npm install` to install packages for Angular
4. run `npm install -g @angular/cli nodemon` to install globally the packages for development

## RUN/BUILD ANGULAR APP
- **development**: `cd` to `angular` folder and run `npm run start`
  - this will start serving to http://localhost:4200 with live-reload
- **production**: `cd` to `angular` folder and run `npm run build`
  - this will compile the entire project (with Ahead-of-Time and Tree-Shaking) to the `dist` folder in root, where Express will directly access

## RUN EXPRESS APP
- **development**: run `npm run dev` and it will start serving to http://localhost:3000 with live-reload
- **production**: run `npm run start`
