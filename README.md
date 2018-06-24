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

### Commands
```
npm run build
```

<table>
  <tr>
    <th>Arguments</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>--prod</code></td>
    <td class="tg-us36">It will build all the source code under src/libs</td>
  </tr>
  <tr>
  <tr>
     <td colspan=2>
      Example: <br />
      <code>npm run build -- --prod</code>
    </td>
  </tr>
</table>

<br />
<table>
  <tr>
    <th>Arguments</th>
    <th>Description</th>
  </tr>
 <tr>
    <td><code>--pkg [path of package.json]</code></td>
    <td class="tg-us36">This will build your component base on package.json file</td>
 </tr>
 <tr>
    <td colspan=2>
      Example: <br />
      <code>
        npm run build -- --prod --pkg src/libs/navbar/package.json
        <br />
        npm run build -- --pkg src/libs/navbar/package.json
      </code>
    </td>
 </tr>
</table>