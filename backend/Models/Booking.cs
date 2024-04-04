using System.Text.Json.Serialization;

namespace backend.Models;

public class Booking
{
    public int BookingId { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime Date { get; set; }
    public int VehicleId { get; set; }
    [JsonIgnore]
    public Vehicle? Vehicle { get; set; }
    public int DriverId { get; set; }
    [JsonIgnore]
    public Driver? Driver { get; set; }
    public int CustomerId { get; set; }
    [JsonIgnore]
    public Customer? Customer { get; set; }
    
    public ICollection<BookingLocation>? BookingLocations { get; set; }
}