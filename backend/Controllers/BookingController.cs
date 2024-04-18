using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using backend.Helpers;
using backend.Models;
using backend.DTOs;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly TCTravelContext _context;
        private readonly ILogger<BookingController> _logger;

        public BookingController(TCTravelContext context, ILogger<BookingController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Booking
        // Retrieve all bookings
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookings()
        {
            try
            {
                var bookingsWithLocations = await _context.Bookings
                    .Include(b => b.BookingLocations)
                        .ThenInclude(bl => bl.Location)
                    .Include(b => b.Vehicle)
                    .Include(d => d.Driver)
                    .Include(c => c.Customer)
                    .ToListAsync();

                var bookingDTOs = await Task.WhenAll(bookingsWithLocations.Select(async booking =>
                {
                    var LocationIds = booking.BookingLocations.Select(bl => bl.LocationId).ToList();
                    var vehicle = await _context.Vehicles.FindAsync(booking.VehicleId);
                    var driver = await _context.Drivers.FindAsync(booking.DriverId);
                    var customer = await _context.Customers.FindAsync(booking.CustomerId);

                    return new BookingDTO
                    {
                        BookingId = booking.BookingId,
                        TotalPrice = booking.TotalPrice,
                        TripDate = booking.TripDate,
                        TripStartTime = booking.TripStartTime,
                        TripEndTime = booking.TripEndTime,
                        VehicleName = vehicle != null? $"{vehicle.Make} {vehicle.Model}" : null,
                        DriverName = driver != null? $"{driver.FirstName} {driver.LastName}" : null,
                        CustomerName = customer != null? $"{customer.FirstName} {customer.LastName}" : null,
                        LocationNames = booking.BookingLocations.Select(bl => bl.Location.LocationName).ToList(),
                        BookingNotes = booking.BookingNotes,
                    };
                }));
                
                _logger.LogInformationEx("Successfully retrieved Bookings");
                return Ok(bookingDTOs);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // GET: api/Booking/5
        // Retrieve specific bookings
        [Authorize(Roles = "Admin, Customer")]
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDTO>> GetBooking(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest(ModelState);
                }

                var booking = await _context.Bookings
                    .Include(b => b.BookingLocations)
                        .ThenInclude(bl => bl.Location)
                    .Include(b => b.Vehicle)
                    .Include(b => b.Customer)
                    .Include(b => b.Driver)
                    .FirstOrDefaultAsync(b => b.BookingId == id);

                
                if (booking == null)
                {
                    _logger.LogErrorEx($"Error, booking {id} not found.");
                    return NotFound();
                }
                
                var bookingDTO = new BookingDTO
                {
                    BookingId = booking.BookingId,
                    TotalPrice = booking.TotalPrice,
                    TripDate = booking.TripDate,
                    TripStartTime = booking.TripStartTime,
                    TripEndTime = booking.TripEndTime,
                    VehicleName = booking.Vehicle != null ? $"{booking.Vehicle.Make} {booking.Vehicle.Model}" : null,
                    DriverName = booking.Driver != null ? $"{booking.Driver.FirstName} {booking.Driver.LastName}" : null,
                    CustomerName = booking.Customer != null ? $"{booking.Customer.FirstName} {booking.Customer.LastName}" : null,
                    LocationNames = booking.BookingLocations.Select(bl => bl.Location.LocationName).ToList(),
                    BookingNotes = booking.BookingNotes,
                };
                
                _logger.LogInformationEx($"Booking {id} retrieved successfully.");
                return Ok(bookingDTO);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }
        
        // GET: api/Booking/ByCustomer/{customerId}
        // Retrieve bookings by customer ID
        [Authorize(Roles = "Admin, Customer")]
        [HttpGet("ByCustomer/{customerId}")]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookingsByCustomer(int customerId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest(ModelState);
                }

                var bookingsWithLocations = await _context.Bookings
                    .Include(b => b.BookingLocations)
                        .ThenInclude(bl => bl.Location)
                    .Include(b => b.Vehicle)
                    .Include(b => b.Customer)
                    .Include(b => b.Driver)
                    .Where(b => b.CustomerId == customerId)
                    .ToListAsync();

                var bookingDTOs = await Task.WhenAll(bookingsWithLocations.Select(async booking =>
                {
                    var vehicle = await _context.Vehicles.FindAsync(booking.VehicleId);
                    var driver = await _context.Drivers.FindAsync(booking.DriverId);

                    return new BookingDTO
                    {
                        BookingId = booking.BookingId,
                        TotalPrice = booking.TotalPrice,
                        TripDate = booking.TripDate,
                        TripStartTime = booking.TripStartTime,
                        TripEndTime = booking.TripEndTime,
                        VehicleName = vehicle != null ? $"{vehicle.Make} {vehicle.Model}" : null,
                        DriverName = driver != null ? $"{driver.FirstName} {driver.LastName}" : null,
                        CustomerName = booking.Customer != null ? $"{booking.Customer.FirstName} {booking.Customer.LastName}" : null,
                        LocationNames = booking.BookingLocations.Select(bl => bl.Location.LocationName).ToList(),
                        BookingNotes = booking.BookingNotes,
                    };
                }));

                _logger.LogInformationEx($"Successfully retrieved Bookings for Customer ID: {customerId}");
                return Ok(bookingDTOs);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // PUT: api/Booking/5
        // Update specific booking
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                if (id != booking.BookingId)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest();
                }

                _context.Entry(booking).State = EntityState.Modified;

                await _context.SaveChangesAsync();
                
                _logger.LogInformationEx($"Booking {id} updated successfully");
                return Ok($"Booking {id} updated successfully");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!BookingExists(id))
                {
                    _logger.LogErrorEx($"Booking {id} not found");
                    return NotFound($"Booking {id} not found");
                }
                
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // POST: api/Booking
        // Create booking
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }
                
                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();

                _logger.LogInformationEx($"Booking created successfully");
                return CreatedAtAction("GetBooking", new { id = booking.BookingId }, booking);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // DELETE: api/Booking/5
        // Delete specific booking
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [Authorize(Roles = "Admin, Customer")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }
                
                var booking = await _context.Bookings.FindAsync(id);

                if (booking == null)
                {
                    _logger.LogErrorEx($"Booking {id} not found");
                    return NotFound($"Booking {id} not found");
                }

                _context.Bookings.Remove(booking);
                
                await _context.SaveChangesAsync();

                _logger.LogInformationEx($"Booking {id} deleted successfully");
                return Ok($"Booking {id} deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.BookingId == id);
        }
    }
}
