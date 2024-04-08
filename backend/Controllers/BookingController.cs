using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Helpers;
using backend.Models;
using backend.Services;
using backend.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly TCTravelContext _context;
        private readonly ILogger<BookingController> _logger;
        private readonly BookingService _bookingService;
        private readonly BookingLocationService _bookingLocationService;

        public BookingController(TCTravelContext context, ILogger<BookingController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Booking
        // Retrieve all bookings
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookings()
        {
            try
            {
                var bookings = await _bookingService.GetAllBookingsAsync();
            
                _logger.LogInformationEx("Successfully retrieved Bookings");
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // GET: api/Booking/5
        // Retrieve specific bookings
        //[Authorize(Roles = "SuperAdmin,Admin,ClientCompany,Customer,Driver")]
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
                
                var booking = await _bookingService.GetBookingByIdAsync(id);

                if (booking == null)
                {
                    _logger.LogErrorEx($"Error, booking {id} not found.");
                    return NotFound();
                }

                _logger.LogInformationEx($"Booking {id} retrieved successfully.");
                return Ok(booking);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // PUT: api/Booking/5
        // Update specific booking
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, BookingDTO bookingDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                if (id != bookingDTO.BookingId)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest();
                }

                await _bookingService.UpdateBookingAsync(bookingDTO);
                
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
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPost]
        public async Task<ActionResult<BookingDTO>> PostBooking(BookingDTO bookingDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                _logger.LogInformation("About to call create booking asynchrously");
                var createdBooking = await _bookingService.CreateBookingAsync(bookingDTO);
                var bookingId = createdBooking.BookingId;
                _logger.LogInformation($"This is the bookingIds: {bookingId}");
                _logger.LogInformation($"This is the bookingDTO: {bookingDTO}");

                var locationIds = bookingDTO.LocationIds;
                _logger.LogInformation($"This is the locationIds: {locationIds}");

                foreach (var locationId in locationIds)
                {
                    var bookingLocation = new BookingLocationDTO
                    {
                        BookingId = bookingId,
                        LocationId = locationId
                    };

                    var createdBookingLocation = await _bookingLocationService.CreatedBookingLocationAsync(bookingLocation);
                    _logger.LogInformation($"This is the createdBookingLocation: {createdBookingLocation}");
                    createdBooking.BookingLocations.Add(createdBookingLocation);
                }
                    
                _logger.LogInformation($"Booking created successfully");
                
                return CreatedAtAction(nameof(GetBooking), new { id = createdBooking.BookingId }, createdBooking);
                
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                await _bookingService.DeleteBookingAsync(id);
                return Ok($"Booking {id} deleted successfully");

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
