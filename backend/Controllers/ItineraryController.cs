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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItineraryDTO>>> GetItineraries()
        {
            try
            {
                var itineraries = await _context.Itineraries
                    .Include(i => i.ItineraryLocations)
                        .ThenInclude(il => il.Location)
                    .Include(i => i.Customer)
                    .ToListAsync();

                var itineraryDTOs = await Task.WhenAll(itineraries.Select(async itinerary =>
                {
                    var LocationIds = itinerary.ItineraryLocations.Select(il => il.LocationId).ToList();
                    var customer = await _context.Customers.FindAsync(itinerary.CustomerId);

                    var itineraryDTO = new ItineraryDTO
                    {
                        ItineraryId = itinerary.ItineraryId,
                        TripDate = itinerary.TripDate,
                        TripStartTime = itinerary.TripStartTime,
                        TripEndTime = itinerary.TripEndTime,
                        CustomerName = customer != null ? $"{customer.FirstName} {customer.LastName}" : null,
                        PassengerCount = itinerary.PassengerCount,
                        LocationNames = itinerary.ItineraryLocations.Select(il => il.Location.LocationName).ToList(),
                        StopOvers = itinerary.ItineraryLocations.Select(il => il.StopOver).ToList(),
                        StopOrders = itinerary.ItineraryLocations.Select(il => il.StopOrder).ToList(),
                        ItineraryNotes = itinerary.ItineraryNotes,
                    };

                    return itineraryDTO;
                }));
            
                _logger.LogInformationEx("Successfully retrieved Itinerariess");
                return Ok(itineraryDTOs);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }
        
        // GET: api/Itinerary/ByCustomer/{customerId}
        // Retrieve itineraries by customer ID
        [Authorize(Roles = "Admin, Customer")]
        [HttpGet("ByCustomer/{customerId}")]
        public async Task<ActionResult<IEnumerable<ItineraryDTO>>> GetItinerariesByCustomer(int customerId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest(ModelState);
                }

                var itineraries = await _context.Itineraries
                    .Include(i => i.ItineraryLocations)
                        .ThenInclude(il => il.Location)
                    .Include(i => i.Customer)
                    .Where(i => i.CustomerId == customerId)
                    .ToListAsync();

                var itineraryDTOs = await Task.WhenAll(itineraries.Select(async itinerary =>
                {
                    var customer = await _context.Customers.FindAsync(itinerary.CustomerId);

                    var itineraryDTO = new ItineraryDTO
                    {
                        ItineraryId = itinerary.ItineraryId,
                        TripDate = itinerary.TripDate,
                        TripStartTime = itinerary.TripStartTime,
                        TripEndTime = itinerary.TripEndTime,
                        CustomerName = customer != null ? $"{customer.FirstName} {customer.LastName}" : null,
                        PassengerCount = itinerary.PassengerCount,
                        LocationNames = itinerary.ItineraryLocations.Select(il => il.Location.LocationName).ToList(),
                        StopOvers = itinerary.ItineraryLocations.Select(il => il.StopOver).ToList(),
                        StopOrders = itinerary.ItineraryLocations.Select(il => il.StopOrder).ToList(),
                        ItineraryNotes = itinerary.ItineraryNotes,
                    };

                    return itineraryDTO;
                }));

                _logger.LogInformationEx($"Successfully retrieved itineraries for customer {customerId}");
                return Ok(itineraryDTOs);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // GET: api/Itinerary/5
        // Retrieve specific itinerariess
        [Authorize(Roles = "Admin, Customer")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ItineraryDTO>> GetItinerary(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx($"Invalid request");
                    return BadRequest(ModelState);
                }

                var itinerary = await _context.Itineraries
                    .Include(i => i.ItineraryLocations)
                        .ThenInclude(il => il.Location)
                    .Include(i => i.Customer)
                    .FirstOrDefaultAsync(i => i.ItineraryId == id);

                if (itinerary == null)
                {
                    _logger.LogErrorEx($"Error, itinerary {id} not found.");
                    return NotFound();
                }
                
                var itineraryDTO = new ItineraryDTO
                {
                    ItineraryId = itinerary.ItineraryId,
                    TripDate = itinerary.TripDate,
                    TripStartTime = itinerary.TripStartTime,
                    TripEndTime = itinerary.TripEndTime,
                    CustomerName = itinerary.Customer != null ? $"{itinerary.Customer.FirstName} {itinerary.Customer.LastName}" : null,
                    PassengerCount = itinerary.PassengerCount,
                    LocationNames = itinerary.ItineraryLocations.Select(il => il.Location.LocationName).ToList(),
                    StopOvers = itinerary.ItineraryLocations.Select(il => il.StopOver).ToList(),
                    StopOrders = itinerary.ItineraryLocations.Select(il => il.StopOrder).ToList(),
                    ItineraryNotes = itinerary.ItineraryNotes,
                };

                _logger.LogInformationEx($"Itinerary {id} retrieved successfully.");
                return Ok(itineraryDTO);
            }
            catch (Exception ex)
            {
                _logger.LogErrorEx($"Failed with error: {ex}");
                return StatusCode(500, $"Failed with error: {ex}");
            }
        }

        // PUT: api/Itinerary/5
        // Update specific itinerary
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles="Admin, Customer")]
        [HttpPost]
        public async Task<ActionResult<Itinerary>> PostItinerary(Itinerary itinerary)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogErrorEx("Invalid request");
                    return BadRequest("Model State is invalid: " + ModelState);
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
        [Authorize(Roles = "Admin, Customer")]
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
