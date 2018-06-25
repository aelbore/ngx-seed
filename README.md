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
|   ├─ app                                # Application Project specific folder
|   |  ├─ app.component.html 
|   |  ├─ app.component.scss
|   |  ├─ app.component.ts 
|   |  ├─ app.module.ts
|   |  ├─ app.route.module.ts
|   |  ├─ index.ts  
|   |  └─ package.json     
|   ├─ libs                               # Libs or web components library     
|      ├─ <navbar>                        # example of web components folder
|      |  ├─ src                          # this should mandatory, all source code should be inside `src`
|      |  |  ├─ index.ts                  # export all .ts files or components,modules,pipes and services
|      |  |  ├─ main.ts                   # bootstrap your web component module
|      |  |  ├─ navbar.component.html     # <optional>, all your markup codes
|      |  |  ├─ navbar.component.scss     # <optional>, all your style codes, you can have `.css` extension.
|      |  |  ├─ navbar.component.ts       # all your component, markup <optional>, style <optional>
|      |  |  └─ navbar.module.ts          # your web component module, define your custom elements
|      |  └── package.json                # <mandatory> `name` should be same as folder name
|      ├─ .....	 	             
|       
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



