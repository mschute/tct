Version 2 - Tay Country Travel ASP.NET Framework Core Web API with ReactJS front-end

This project is for Tay Country Travel, a luxury travel company that offers transportation for golfing, heritage landscapes and other tourist destinations. This service aims to create a booking system that will allow Admin to create bookings that will record the associated Driver, Vehicle, Locations, Customers (Passengers), and other related information. Customers can look at potential destinations on a Map (offered by Google Maps API). The user can add destinations on the itinerary which will automatically be added to the form. The Customer can add the amount of time they can stop over at that location. They can also dynamically remove the locations on the itinerary. The Customer will select a date and start time and the end time will be calculated automatically. They can add any notes they so wish. The Admin will see this itinerary request and will then create an official booking for the Customer.

Not only does the Admin have the ability to see the Customers pending itineraries and create a booking, but they can also add, edit and delete information for Drivers, Locations, Vehicles. They can also view information for Users, Customres and Roles.

This service also has a register, sign-up and sign-out functionality. Users and their roles are identified at sign-in and are verified through a JWT token. Users will automatically be signed-out after the JWT token expires.

Customers can create and delete an itinerary, update their Customer Info and delete a booking for their account.

Created a RESTful backend API service for ASP.NET Framework Core using a Model View Controller architectural pattern to aid in organisation. The Model folder contains classes that hold the business logic and aid in mapping the database for data to be stored in. Controllers contain Create Retrieve Update and Delete actions that will operate on the database based on the business logic of the models. Views are not implemented in this version.

Dependency injection is used for logging, configuring the database, identity framework, email service, defining user roles, and JWT token and events. SQLite database configuration is implemented. JWT Bearer Events methods are overridden in order to add logging functionality for these events. MailKit, a .NET mail-client library created by Jeffrey Stedfast was used for sending registration emails through Simple Mail Transfer Protocol (SMTP). Logs are output to the Console as well as saved to a created new file each day the program is run. Two helper classes were created to aid in the functionality of the program, one to check if a user’s passwords meets the business requirements and a logger extension to aid in printing uniform logs. Identity Framework was used to aid user registration and role functionality. The role assigned to a particular user was used to adjust their authorization for various CRUD actions on the website.

NuGet packages installed for this project are:

• MailKit • Microsoft.AspNetCore.Authentication.JwtBearer • Microsoft.AspNetCore.Identity.EntityFrameworkCore • Microsoft.Extensions.Logging.Console • Microsoft.Extensions.Logging.EventLog • Microsoft.VisualStudio.Web.CodeGeneration.Design • Serilog.Extensions.Logging.File, Microsoft.EntityFrameworkCore • Microsoft.EntityFrameworkCore.Tools • Microsoft.Extensions.DependencyInjection • Npgsql.EntityFrameworkCore.PostgreSQL


