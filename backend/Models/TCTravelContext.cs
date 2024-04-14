using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class TCTravelContext : IdentityDbContext<IdentityUser>
{
    public TCTravelContext(DbContextOptions<TCTravelContext> options)
        : base(options)
    {
        
    }
    
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Itinerary> Itineraries { get; set; }
    public DbSet<BookingLocation> BookingLocations { get; set; } = default!;
    public DbSet<ItineraryLocation> ItineraryLocations { get; set; } = default!;

    // overriding OnModelCreating to establish many-to-many relationship between Booking and Location and Itinerary and Location
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<ItineraryLocation>()
            .HasKey(il => new { il.ItineraryId, il.LocationId });
        modelBuilder.Entity<ItineraryLocation>()
            .HasOne(il => il.Itinerary)
            .WithMany(i => i.ItineraryLocations)
            .HasForeignKey(i => i.ItineraryId);
        modelBuilder.Entity<ItineraryLocation>()
            .HasOne(il => il.Location)
            .WithMany(l => l.ItineraryLocations)
            .HasForeignKey(l => l.LocationId);
        
        modelBuilder.Entity<BookingLocation>()
            .HasKey(bl => new { bl.BookingId, bl.LocationId });
        modelBuilder.Entity<BookingLocation>()
            .HasOne(bl => bl.Booking)
            .WithMany(l => l.BookingLocations)
            .HasForeignKey(b => b.BookingId);
        modelBuilder.Entity<BookingLocation>()
            .HasOne(bl => bl.Location)
            .WithMany(l => l.BookingLocations)
            .HasForeignKey(b => b.LocationId);
    }
}