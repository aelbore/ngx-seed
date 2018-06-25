# ngx-seed
Angular Application Seed

## Getting Started 

* Clone ngx-seed repository
  ```
  git clone https://github.com/aelbore/ngx-seed.git
  ```
* Install dependencies
  ```
   npm install
  ```
* Start the Application
  ```
  npm start
  ```
  - this will build, watch the file changes, and live reload

<br />

### Project Structure
```
.
├── node_modules 
├── server         
├── src           
|   ├─ app
|   |  ├─ app.component.html 
|   |  ├─ app.component.scss
|   |  ├─ app.component.ts 
|   |  ├─ app.module.ts
|   |  ├─ app.route.module.ts
|   |  ├─ index.ts  
|   |  └─ package.json     
|   ├─ libs    
|      ├─ <navbar>
|        ├─ src
|        |  ├─ index.ts
|        |  ├─ main.ts
|        |  ├─ navbar.component.html
|        |  ├─ navbar.component.scss
|        |  ├─ navbar.component.ts
|        |  └─ navbar.module.ts
|        └── package.json   	             
|   
├── README.md
├── .devtools.json  
├── config.json  
├── gulpfile.js      
├── package.json
└── tsconfig.json
```

### Commands

##### Build your libs code
```
npm run build
```

##### Build your libs code for production
```
npm run build -- --prod
```

##### Build your libs code for a certain package for production
```
npm run build -- --prod --pkg src/libs/navbar/package.json
```

##### This will start your application
* It will build, watch file change and livereload you page
```
npm start
```



