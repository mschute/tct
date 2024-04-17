using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Customer
{
    public int CustomerId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateOnly? Dob { get; set; }
    public string? Nationality { get; set; }
    
    public string? UserId { get; set; }
    
    [JsonIgnore]
    public IdentityUser? User { get; set;  }
    
    [JsonIgnore]
    public ICollection<Booking>? Bookings { get; set; } 
    
    [JsonIgnore]
    public ICollection<Itinerary>? Itineraries { get; set; } 
}