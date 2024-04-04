namespace backend.Models;

public class Location
{
    public int LocationId { get; set; }
    public string LocationName { get; set; }
    public string LocationAddress { get; set; }
    public string LocationLat { get; set; }
    public string LocationLng { get; set; }
    public string LocationDescription { get; set; }
    
    public ICollection<BookingLocation>? BookingLocations { get; set; }
    public ICollection<ItineraryLocation>? ItineraryLocations { get; set; }
}