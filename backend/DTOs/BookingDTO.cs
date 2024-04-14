namespace backend.DTOs;

public class BookingDTO
{
    public int BookingId { get; set; }
    public decimal TotalPrice { get; set; }
    public DateOnly TripDate { get; set; }
    public TimeOnly TripStartTime { get; set; }
    public TimeOnly TripEndTime { get; set; }
    public string VehicleName { get; set; }
    public string DriverName { get; set; }
    public string CustomerName { get; set; }
    public ICollection<string> LocationNames { get; set; }
    public string BookingNotes { get; set; }
}