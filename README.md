Version 2 - Tay Country Travel ASP.NET Core Web API with ReactJS Front-end

This project is for Tay Country Travel, a luxury transport service for golfing, heritage, and tourist destinations. The booking system enables Admins to manage bookings, drivers, vehicles, locations, and customers, while providing a seamless user experience for customers to plan their itineraries.

Features:

Customer Side:

- Customers can create, update, or delete itineraries.
- Use Google Maps API integration to select destinations directly from the map.
- Dynamically add or remove destinations from the itinerary and specify stopover times.
- The system automatically calculates the estimated total duration of the tour based on the selected locations and times.

Admin Side:

- Admins can manage bookings, customers, drivers, vehicles, and locations.
- They can create, edit, or delete records and manage itinerary requests submitted by customers.

Authentication:

- The system uses JWT tokens for user authentication, including sign-up, sign-in, and automatic sign-out upon token expiration.

Backend:

- ASP.NET Core Web API: Utilizes the MVC architecture, with Models handling business logic and database mapping, and Controllers for CRUD operations.
- RESTful API: The backend exposes a RESTful API that allows the front-end to communicate with the server for booking management, customer data, itineraries, and more. It supports GET, POST, PUT, and DELETE requests to handle various operations.
- SQLite: Database configuration for persistence.
- Dependency Injection: Employed for logging, database configuration, identity framework, email service, JWT tokens, and role management.
- MailKit: For sending emails through SMTP.

Frontend:

- ReactJS: A dynamic and responsive front-end framework for creating interactive UI elements.
- CSS: Styled the application for a clean and intuitive user experience.
- Google Maps API: Integrated to allow customers to visually select locations on a map, which are then automatically added to their itinerary form. Customers can adjust stopover times, and the system calculates the total travel duration.

Design:

- Custom Travel Itinerary Form: Allows users to interact with the map, select locations, adjust time spent at each stop, and add notes. This form integrates seamlessly with the RESTful API to provide accurate travel estimates.

NuGet Packages:

- MailKit
- Microsoft.AspNetCore.Authentication.JwtBearer
- Microsoft.AspNetCore.Identity.EntityFrameworkCore
- Microsoft.EntityFrameworkCore & Tools
- Serilog.Extensions.Logging.File
- Microsoft.Extensions.Logging.Console & EventLog
- Npgsql.EntityFrameworkCore.PostgreSQL

