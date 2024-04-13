using System.Text.Json.Serialization;

namespace backend.Models;

public class ItineraryLocation
{
    public int ItineraryId { get; set; }
    public Itinerary? Itinerary { get; set; }
    public int LocationId { get; set; }
    public Location? Location { get; set; }
    public int StopOrder { get; set; }
    public int StopOver { get; set; }
    public int TravelTimeNextLocale { get; set; }
}