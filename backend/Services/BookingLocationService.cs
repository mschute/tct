namespace backend.Services;
using AutoMapper;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class BookingLocationService
{
    private readonly TCTravelContext _context;
    private readonly IMapper _mapper;

    public BookingLocationService(TCTravelContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<BookingLocationDTO>> GetBookingLocationsAsync()
    {
        var bookingLocations = await _context.BookingLocations.ToListAsync();
        return _mapper.Map<IEnumerable<BookingLocationDTO>>(bookingLocations);
    }

    public async Task<BookingLocationDTO> GetBookingLocationAsync(int bookingId, int locationId)
    {
        var bookingLocations = await _context.BookingLocations.FindAsync(bookingId, locationId);
        return _mapper.Map<BookingLocationDTO>(bookingLocations);
    }
    
    public async Task<IEnumerable<BookingLocationDTO>> GetBookingLocationByIdAsync(int bookingId)
    {
        var bookingLocations = await _context.BookingLocations.Where(bl => bl.BookingId == bookingId).ToListAsync();
        return bookingLocations.Select(bl => new BookingLocationDTO
        {
            BookingId = bl.BookingId,
            LocationId = bl.LocationId
        }).ToList();
        //return _mapper.Map<IEnumerable<BookingLocationDTO>>(bookingLocations);
    }

    public async Task AddBookingLocationAsync(BookingLocationDTO bookingLocationDTO)
    {
        var bookingLocation = _mapper.Map<BookingLocation>(bookingLocationDTO);
        _context.BookingLocations.Add(bookingLocation);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateBookingLocationAsync(BookingLocationDTO bookingLocationDTO)
    {
        var bookingLocation = _mapper.Map<BookingLocation>(bookingLocationDTO);
        _context.Entry(bookingLocationDTO).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteBookingLocationAsync(int bookingId, int locationId)
    {
        var bookingLocation = await _context.BookingLocations.FindAsync(bookingId, locationId);
        if (bookingLocation != null)
        {
            _context.BookingLocations.Remove(bookingLocation);
            await _context.SaveChangesAsync();
        }
    }

    public bool BookingLocationExists(int bookingId, int locationId)
    {
        return _context.BookingLocations.Any(e => e.BookingId == bookingId && e.LocationId == locationId);
    }
}