using System.Text.Json.Serialization;

namespace backend.Models;

public class Itinerary
{
    public int ItineraryId { get; set; }
    public DateOnly Date { get; set; }
    public int PassengerCount { get; set; }
    
    [JsonIgnore]
    public ICollection<Location>? Locations { get; set; }
}