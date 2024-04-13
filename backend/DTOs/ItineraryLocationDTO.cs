namespace backend.DTOs;

public class ItineraryLocationDTO
{
    public int ItineraryId { get; set; }
    public int LocationId { get; set; }
    public int StopOver { get; set; }
    public int StopOrder { get; set; }
    public int TravelTimeNextLocale { get; set; }
}