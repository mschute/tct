using System.Text.Json.Serialization;

namespace backend.Models;

public class ItineraryLocation
{
    public int ItineraryId { get; set; }
    [JsonIgnore]
    public Itinerary? Itinerary { get; set; }
    public int LocationId { get; set; }
    [JsonIgnore]
    public Location? Location { get; set; }
    
    public int Duration { get; set; }
    
    public int TravelTimeNextLocale { get; set; }
    
}