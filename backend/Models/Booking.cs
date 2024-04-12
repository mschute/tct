using System.Text.Json.Serialization;

namespace backend.Models;

public class Booking
{
    public int BookingId { get; set; }
    public decimal TotalPrice { get; set; }
    public DateOnly TripDate { get; set; }
    public TimeOnly TripStartTime { get; set; }
    public TimeOnly TripEndTime { get; set; }
    public int VehicleId { get; set; }
    public Vehicle? Vehicle { get; set; }
    public int DriverId { get; set; }
    public Driver? Driver { get; set; }
    public int CustomerId { get; set; }
    public Customer? Customer { get; set; }
    
    public ICollection<BookingLocation>? BookingLocations { get; set; }
}