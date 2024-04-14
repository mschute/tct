using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Helpers;
using backend.Models;
using backend.DTOs;

// Many-to-Many Controller Reference: https://nxk.io/2019/04/01/dealing-with-composite-primary-keys-and-entityframework-scaffolded-controllers/

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryLocationController : ControllerBase
    {
        private readonly TCTravelContext _context;
        private readonly ILogger<ItineraryLocationController> _logger;

        public ItineraryLocationController(TCTravelContext context, ILogger<ItineraryLocationController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/ItineraryLocation
        // Retrieve itinerary locations
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItineraryLocation>>> GetItineraryLocations()
        {
            try
            {
                var itineraryLocation = await _context.ItineraryLocations.ToListAsync();

                _logger.LogInformationEx("Successfully retrieved ItineraryLocation");
                return itineraryLocation;
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // GET: api/ItineraryLocation/itineraryId
        // Retrieve itinerary locations by itinerary Id
        [HttpGet("{itineraryId}")]
        public async Task<ActionResult<IEnumerable<ItineraryLocation>>> GetItineraryLocationsByItineraryId([FromRoute] int itineraryId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest(ModelState);
                }
                
                var itineraryLocations = await _context.ItineraryLocations
                    .Where(il => il.ItineraryId == itineraryId)
                    .ToListAsync();

                if (itineraryLocations == null)
                {
                    _logger.LogErrorEx($"Itinerary {itineraryId}");
                    return NotFound($"Itinerary {itineraryId}");
                }

                _logger.LogInformationEx($"Itinerary {itineraryId}");
                return Ok(itineraryLocations);
                    
                if (itineraryLocations == null || !itineraryLocations.Any())
                {
                    _logger.LogErrorEx($"Itinerary {itineraryId} has no associated locations");
                    return NotFound($"Itinerary {itineraryId} has no associated locations");
                }
                
                _logger.LogInformationEx($"Itinerary {itineraryId} locations retrieved successfully");
                return Ok(itineraryLocations);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }
        
        // GET: api/ItineraryLocation/itineraryId/locationId
        // Retrieve specific itinerary location
        //[Authorize(Roles = "SuperAdmin,Admin,Customer,Driver")]
        [HttpGet("{itineraryId}/{locationId}")]
        public async Task<ActionResult<ItineraryLocation>> GetItineraryLocation([FromRoute] int itineraryId, [FromRoute] int locationId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest(ModelState);
                }
                
                var itineraryLocation = await _context.ItineraryLocations.FindAsync(itineraryId, locationId);

                if (itineraryLocation == null)
                {
                    _logger.LogErrorEx($"Itinerary {itineraryId} / Location {locationId} not found");
                    return NotFound($"Itinerary {itineraryId} / Location {locationId} not found");
                }
                
                _logger.LogInformationEx($"Itinerary {itineraryId} / Location {locationId} retrieved successfully");
                return Ok(itineraryLocation);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // POST: api/ItineraryLocation
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPost]
        public async Task<ActionResult<ItineraryLocation>> PostItineraryLocation([FromBody] ItineraryLocationDTO itineraryLocationDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                var itineraryLocation = new ItineraryLocation
                {
                    ItineraryId = itineraryLocationDTO.ItineraryId,
                    LocationId = itineraryLocationDTO.LocationId,
                    StopOver = itineraryLocationDTO.StopOver,
                    StopOrder = itineraryLocationDTO.StopOrder,
                    TravelTimeNextLocale = itineraryLocationDTO.TravelTimeNextLocale
                };
                _context.ItineraryLocations.Add(itineraryLocation);

                await _context.SaveChangesAsync();
                
                return CreatedAtAction("GetItineraryLocation", new { itineraryId = itineraryLocation.ItineraryId, locationId = itineraryLocation.LocationId}, itineraryLocation);
            }
            catch (DbUpdateException ex)
            {
                if (ItineraryLocationExists(itineraryLocationDTO.ItineraryId, itineraryLocationDTO.LocationId))
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
        
        // PUT: api/ItineraryLocation/itineraryId/locationId
        // Update specific ItineraryLocation
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPut("{itineraryId}/{locationId}")]
        public async Task<IActionResult> PutItineraryLocation([FromRoute] int itineraryId, [FromRoute] int locationId, [FromBody] ItineraryLocation itineraryLocation)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                if (itineraryId != itineraryLocation.ItineraryId && locationId != itineraryLocation.LocationId)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest();
                }

                _context.Entry(itineraryLocation).State = EntityState.Modified;

                await _context.SaveChangesAsync();
                
                _logger.LogInformationEx($"Itinerary {itineraryId} / Location {locationId} updated successfully");
                return Ok($"Itinerary {itineraryId} / Location {locationId} updated successfully");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ItineraryLocationExists(itineraryId, locationId))
                {
                    _logger.LogErrorEx($"Itinerary {itineraryId} / Location {locationId} not found");
                    return NotFound($"Itinerary {itineraryId} / Location {locationId} not found");
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

        // DELETE: api/ItineraryLocation/5
        // Delete specific itinerary
        [HttpDelete("{id}")]
        //[Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> DeleteItineraryLocation([FromRoute] int itineraryId, [FromRoute] int locationId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }
                
                var itineraryLocation = await _context.ItineraryLocations.FindAsync(itineraryId, locationId);
                
                if (itineraryLocation == null)
                {
                    _logger.LogErrorEx($"Itinerary {itineraryId} / Location {locationId} not found");
                    return NotFound($"Itinerary {itineraryId} / Location {locationId} not found");
                }

                _context.ItineraryLocations.Remove(itineraryLocation);
                await _context.SaveChangesAsync();

                _logger.LogInformationEx($"Itinerary {itineraryId} / Location {locationId} deleted successfully");
                return Ok($"Itinerary {itineraryId} / Location {locationId} deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        private bool ItineraryLocationExists(int itineraryId, int locationId)
        {
            return _context.ItineraryLocations.Any(e => e.ItineraryId == itineraryId && e.LocationId == locationId);
        }
    }
}
