using System.Text.Json.Serialization;

namespace backend.Models;

public class Vehicle
{
    public int VehicleId { get; set; }
    public string? Make { get; set; }
    public string? Model { get; set; }
    public string? GasType { get; set; }
    public int Seats { get; set; }
    public decimal PricePerDay { get; set; }
    
    [JsonIgnore]
    public ICollection<Booking>? Bookings { get; set; } 
}