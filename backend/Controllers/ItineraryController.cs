using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Helpers;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryController : ControllerBase
    {
        private readonly TCTravelContext _context;
        private readonly ILogger<ItineraryController> _logger;

        public ItineraryController(TCTravelContext context, ILogger<ItineraryController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Itinerary
        // Retrieve all itineraries
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Itinerary>>> GetItineraries()
        {
            try
            {
                var itineraries = await _context.Itineraries.ToListAsync();
            
                _logger.LogInformationEx("Successfully retrieved Itinerariess");
                return Ok(itineraries);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // GET: api/Itinerary/5
        // Retrieve specific itinerariess
        //[Authorize(Roles = "SuperAdmin,Admin,ClientCompany,Customer,Driver")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Itinerary>> GetItinerary(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest(ModelState);
                }
                
                var itinerary = await _context.Itineraries.FindAsync(id);

                if (itinerary == null)
                {
                    _logger.LogErrorEx($"Error, itinerary {id} not found.");
                    return NotFound();
                }

                _logger.LogInformationEx($"Itinerary {id} retrieved successfully.");
                return Ok(itinerary);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // PUT: api/Itinerary/5
        // Update specific itinerary
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItinerary(int id, Itinerary itinerary)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                if (id != itinerary.ItineraryId)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest();
                }

                _context.Entry(itinerary).State = EntityState.Modified;

                await _context.SaveChangesAsync();
                
                _logger.LogInformationEx($"Itinerary {id} updated successfully");
                return Ok($"Itinerary {id} updated successfully");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ItineraryExists(id))
                {
                    _logger.LogErrorEx($"Itinerary {id} not found");
                    return NotFound($"Itinerary {id} not found");
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

        // POST: api/Itinerary
        // Create itinerary
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPost]
        public async Task<ActionResult<Itinerary>> PostItinerary(Itinerary itinerary)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }
                
                _context.Itineraries.Add(itinerary);
                await _context.SaveChangesAsync();

                _logger.LogInformationEx($"Itinerary created successfully");
                return CreatedAtAction("GetItinerary", new { id = itinerary.ItineraryId }, itinerary);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // DELETE: api/Itinerary/5
        // Delete specific itinerary
        //[Authorize(Roles = "SuperAdmin,Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItinerary(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }
                
                var itinerary = await _context.Itineraries.FindAsync(id);

                if (itinerary == null)
                {
                    _logger.LogErrorEx($"Itinerary {id} not found");
                    return NotFound($"Itinerary {id} not found");
                }

                _context.Itineraries.Remove(itinerary);
                
                await _context.SaveChangesAsync();

                _logger.LogInformationEx($"Itinerary {id} deleted successfully");
                return Ok($"Itinerary {id} deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        private bool ItineraryExists(int id)
        {
            return _context.Itineraries.Any(e => e.ItineraryId == id);
        }
    }
}