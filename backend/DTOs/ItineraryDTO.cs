namespace backend.DTOs;

public class ItineraryDTO
{
    public int ItineraryId { get; set; }
    public DateTime TripDateStart { get; set; }
    public DateTime TripDateEnd { get; set; }
    public string CustomerName { get; set; }
    public int PassengerCount { get; set; }
}