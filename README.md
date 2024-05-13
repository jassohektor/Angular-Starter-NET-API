<p align="center" style="font-weight: bolder;">
  <h1>Angular Starter with .NET REST API & SQL Database</h1>
</p>

This project is an Angular Starter with .NET REST API &amp; SQL-DB which includes angular material, ngx-gallery and CRUD operations. I made this project in the year 2020 but has been updated recently and contains everything you need to run an Angular application and connect UI actions to a REST Web-API in charge to handle http requests operations and store data into a SQL database using entity relational model, can't say is perfect because I wanted to invest more time to implement security with JWT and interceptors using route Guards, some API pattern like UnitOfWork and DB indexing but I'm pretty sure everything done is based on best SOLID practices. 

**Prerequisites:**
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
![image](https://github.com/jassohektor/Angular-Starter-NET-API-SQLDB/assets/168608755/b4e4563d-aab3-4c32-b0aa-0087b89b4244)


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

* Let's say you don't want to waste money on cloud services or getting a server from third party companies, well you can still test your feature to store images and see the results.
![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/fbf9d44b-7031-4bca-aab0-63032a56bdee)

* Unfortunately we have to press [CTRL + S] directly to our code no matter if you didin't do any change because helps to compile the application upon file saves and reload the browser with the newly compiled application and all new changes including stored files, obviously I did it this way to test out results but once getting Azure or AWS services we can store files on the cloud to scale things up.
![image](https://github.com/jassohektor/Angular-Starter-NET-API/assets/168608755/4822acab-34be-4feb-b6c1-4336fd44ba4b)


<p align="center" style="font-weight: bolder;">
  Notes
</p>
This repository covers what you may call a fullstack development to get started with your own project on both the frontend and backend scenarios, however if you take a look to the code, architecture and design you will found a pretty singular way to handle some features to get expected results and how I come up with some nice ideas to give shape and logic to tricky actions users have to interact with. At the end of the day we are creative souls always pushing forward to the future along with new technologies coming out every year and new ways to implement solutions to real life needs.
<br>
<br>
<br>
<p align="center" style="font-weight: bolder;">
  Fun Fact
</p>
<br>
Is funny that in my current job I had to take over a project made by a team from India and they grabbed such "starter project" from a hackathon event back in the day and feels kind of strange because they got fired due the lack of understanding the scope of the project with client needs and also how to provide good results to the business model which is pretty specific when it comes to create design and logic to scale backend workloads across multiple services. The client was very disappointed after fire other 2 teams and some "senior" developers until I came to the rescue and I have almost 5 years working here since then!🪪
