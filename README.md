<h1>
  # Angular-Starter-NET-API-SQLDB
</h1>

This project is an Angular Starter with .NET REST API &amp; SQL-DB which includes angular material, ngx-gallery and CRUD operations. Contains everything you need to have to run an Angular application made from scratch to connect UI actions to a REST web-API in charge to handle http requests operations and store data into a SQL database using entity relational model, can't say is perfect because I wanted to invest more time to implement security with JWT and interceptors using route Guards, some API pattern like UnitOfWork and DB indexing but I'm pretty sure everything done is based on best SOLID practices. 

Prerequisites:
- Node: >=12.11.6
- Angular CLI >= 9.0.5
- Typescript: ^3.6.4
- NET Core >= 3

-------------------------------------------------------------------
 Visual Studio Community 2019 or later! <br> 
 SQLServer 2019 with (SQLSMS) or later! <br>
 VSCode to run in Terminal (optional) you can use CMD as well.
 
-------------------------------------------------------------------

 
* Let's start from the beginning, take a look to the attached DB script and remember to create your empty database before to run it, I made this script to create the business model very basic to start your app, run that script in your database and results should match below screenshot.
![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/2d9f9e91-8061-4e2d-b0ba-74d0da4a969d)


* Open the VS solution to load up both projects but change the startup project to target the "Web.Api" only and remember to update the appsettings.json schema with your server settings like Server name, Catalog, User and password, there is using my local database and the app won't work if you don't change that which is pretty obvious but just wanted to point it out. 
![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/71143b18-ffc8-4ef1-b8b5-e69e765fa959)

* Open your CMD or use VSCode terminal to run next commands:<br>
  1- **npm install**<br>
  2- **ng serve**<br>
![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/386f065b-05f6-45eb-93c1-ba63366e58ea)

* Go to your preferred browser and type localhost:4200 to display the app running. 
![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/5b04d9f8-4cf5-4ba2-a71f-1f7c77808df8)

* Enter credentials from the records manually inserted in the SQL script, type in the user and password to get access. 
![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/67080ea6-43ae-4bb9-921b-a84cf79c0b9a)

* Here in the angular-material form the logic is a bit tricky because the UI shows up the password value only when the logged user match the selected record in the active session but once the app gets refreshed or a different route is open that information get lost and you will find the password field value empty, however the record can be updated without any issue but this needs to be improved to get rid of that feature once JWT has been introduced to handle security and timeout session. We don't want to hold up any sensitive data right? anyways the reason that field comes empty is due the SHA2_512 bytes that cannot be decrypted.
![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/0f00bdd9-c753-4b3d-8eef-b1ededd6869e)

* The app can easily create, read, update or delete records by subscribing to observable methods located in the data.service in charge to perform http requests to call the web API.
![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/4ec7ab22-b9d7-4d1f-8629-6b007448f647)


![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/fbf9d44b-7031-4bca-aab0-63032a56bdee)


![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/4822acab-34be-4feb-b6c1-4336fd44ba4b)


