namespace backend.DTOs;

public class BookingDTO
{
    public int BookingId { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime Date { get; set; }
    public int VehicleId { get; set; }
    public int DriverId { get; set; }
    public int CustomerId { get; set; }
    public ICollection<string> LocationNames { get; set; }
}