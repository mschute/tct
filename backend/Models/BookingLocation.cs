using System.Text.Json.Serialization;

namespace backend.Models;

public class BookingLocation
{
    public int BookingId { get; set; }
    public Booking? Booking { get; set; }
    public int LocationId { get; set; }
    public Location? Location { get; set; }
    
}