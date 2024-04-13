using System.Text.Json.Serialization;

namespace backend.Models;

public class Itinerary
{
    public int ItineraryId { get; set; }
    public DateOnly TripDate { get; set; }
    public TimeOnly TripStartTime { get; set; }
    public TimeOnly TripEndTime { get; set; }
    public int PassengerCount { get; set; }
    public int? CustomerId { get; set; }
    public Customer? Customer { get; set; }
    public string ItineraryNotes { get; set; }
    public ICollection<ItineraryLocation>? ItineraryLocations { get; set; }
}