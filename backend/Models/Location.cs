namespace backend.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

public class Location
{
    public int LocationId { get; set; }
    public string LocationName { get; set; }
    public string LocationAddress { get; set; }
    public string LocationLat { get; set; }
    public string LocationLng { get; set; }
    public string LocationDescription { get; set; }
    
    [JsonIgnore]
    public ICollection<BookingLocation>? BookingLocations { get; set; }
    [JsonIgnore]
    public ICollection<ItineraryLocation>? ItineraryLocations { get; set; }
}