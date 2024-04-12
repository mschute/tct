namespace DefaultNamespace;

public class ItineraryLocationDTO
{
    public int ItineraryId { get; set; }
    public int LocationId { get; set; }
    public int StopOver { get; set; }
    public int TravelTimeNextLocale { get; set; }
    public ICollection<string> LocationNames { get; set; }
}