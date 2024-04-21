namespace backend.DTOs;

public class ItineraryDTO
{
    public int ItineraryId { get; set; }
    public DateOnly TripDate { get; set; }
    public TimeOnly TripStartTime { get; set; }
    public TimeOnly? TripEndTime { get; set; }
    public string CustomerName { get; set; }
    public int PassengerCount { get; set; }
    public ICollection<string> LocationNames { get; set; }
    public ICollection<int> StopOrders { get; set; }
    public ICollection<int> StopOvers { get; set; }
    public string ItineraryNotes { get; set; }
}