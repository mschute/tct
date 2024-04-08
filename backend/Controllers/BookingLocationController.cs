using backend.Helpers;
using backend.Models;
using backend.Services;
using backend.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


// Many-to-Many Controller Reference: https://nxk.io/2019/04/01/dealing-with-composite-primary-keys-and-entityframework-scaffolded-controllers/

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingLocationController : ControllerBase
    {
        private readonly TCTravelContext _context;
        private readonly ILogger<BookingLocationController> _logger;
        private readonly BookingLocationService _bookingLocationService;

        public BookingLocationController(TCTravelContext context, ILogger<BookingLocationController> logger, BookingLocationService bookingLocationService)
        {
            _context = context;
            _logger = logger;
            _bookingLocationService = bookingLocationService;
        }

        // GET: api/BookingLocation
        // Retrieve booking locations
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingLocationDTO>>> GetBookingLocations()
        {
            try
            {
                var bookingLocation = await _bookingLocationService.GetBookingLocationsAsync();

                _logger.LogInformationEx("Successfully retrieved BookingLocation");
                return Ok(bookingLocation);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // GET: api/BookingLocation/bookingId/locationId
        // Retrieve specific booking location
        //[Authorize(Roles = "SuperAdmin,Admin,ClientCompany,Customer,Driver")]
        [HttpGet("{bookingId}/{locationId}")]
        public async Task<ActionResult<BookingLocationDTO>> GetBookingLocation([FromRoute] int bookingId, [FromRoute] int locationId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest(ModelState);
                }
                var bookingLocation = await _bookingLocationService.GetBookingLocationAsync(bookingId, locationId);

                if (bookingLocation == null)
                {
                    _logger.LogErrorEx($"Booking {bookingId} / Location {locationId} not found");
                    return NotFound($"Booking {bookingId} / Location {locationId} not found");
                }
                
                _logger.LogInformationEx($"Booking {bookingId} / Location {locationId} retrieved successfully");
                return Ok(bookingLocation);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }
        
        // GET: api/BookingLocation/bookingId
        // Retrieve locations by bookingId
        //[Authorize(Roles = "SuperAdmin,Admin,ClientCompany,Customer,Driver")]
        [HttpGet("{bookingId}")]
        public async Task<ActionResult<IEnumerable<BookingLocationDTO>>> GetBookingLocationsByBookingId([FromRoute] int bookingId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest(ModelState);
                }
                var bookingLocations = await _bookingLocationService.GetBookingLocationByIdAsync(bookingId);
                    
                if (bookingLocations == null || !bookingLocations.Any())
                {
                    _logger.LogErrorEx($"Booking {bookingId} has no associated locations");
                    return NotFound($"Booking {bookingId} has no associated locations");
                }
                
                _logger.LogInformationEx($"Booking {bookingId} locations retrieved successfully");
                return Ok(bookingLocations);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // POST: api/BookingLocation
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPost]
        public async Task<ActionResult<BookingLocationDTO>> PostBookingLocation([FromBody] BookingLocationDTO bookingLocationDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                var createdBookingLocation = await _bookingLocationService.AddBookingLocationAsync(bookingLocationDTO);

                await _context.SaveChangesAsync();
                
                return CreatedAtAction("GetBookingLocation", new { bookingId = createdBookingLocation.BookingId, locationId = createdBookingLocation.LocationId }, createdBookingLocation);
            }
            catch (DbUpdateException ex)
            {
                if (BookingLocationExists(createdBookingLocation.BookingId, createdBookingLocation.LocationId))
                {
                    var statusConflict = new StatusCodeResult(StatusCodes.Status409Conflict);
                    _logger.LogError($"Failed with error: {statusConflict}");
                    return statusConflict;
                }
                
                _logger.LogError($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }
        
        // PUT: api/BookingLocation/bookingId/locationId
        // Update specific BookingLocation
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPut("{bookingId}/{locationId}")]
        public async Task<IActionResult> PutBookingLocation([FromRoute] int bookingId, [FromRoute] int locationId, [FromBody] BookingLocationDTO bookingLocationDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                if (bookingId != bookingLocationDTO.BookingId && locationId != bookingLocationDTO.LocationId)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest();
                }
                
                await _bookingLocationService.UpdateBookingLocationAsync(bookingLocationDTO);
                
                _logger.LogInformationEx($"Booking {bookingId} / Location {locationId} updated successfully");
                return Ok($"Booking {bookingId} / Location {locationId} updated successfully");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!BookingLocationExists(bookingId, locationId))
                {
                    _logger.LogErrorEx($"Booking {bookingId} / Location {locationId} not found");
                    return NotFound($"Booking {bookingId} / Location {locationId} not found");
                }
                
                _logger.LogError($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // DELETE: api/BookingLocation/5
        // Delete specific booking
        [HttpDelete("{id}")]
        //[Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> DeleteBookingLocation([FromRoute] int bookingId, [FromRoute] int locationId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }
                
                await _bookingLocationService.DeleteBookingLocationAsync(bookingId, locationId);

                _logger.LogInformationEx($"Booking {bookingId} / Location {locationId} deleted successfully");
                return Ok($"Booking {bookingId} / Location {locationId} deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        private bool BookingLocationExists(int bookingId, int locationId)
        {
            return _context.BookingLocations.Any(e => e.BookingId == bookingId && e.LocationId == locationId);
        }
    }
}