namespace backend.Services;
using AutoMapper;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class BookingService
{
    private readonly TCTravelContext _context;
    private readonly IMapper _mapper;

    public BookingService(TCTravelContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<BookingDTO>> GetAllBookingsAsync()
    {
        var bookings = await _context.Bookings.ToListAsync();
        return _mapper.Map<IEnumerable<BookingDTO>>(bookings);
    }

    public async Task<BookingDTO> GetBookingByIdAsync(int id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        return _mapper.Map<BookingDTO>(booking);
    }

    public async Task UpdateBookingAsync(BookingDTO bookingDTO)
    {
        var booking = _mapper.Map<Booking>(bookingDTO);
        _context.Entry(booking).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task CreateBookingAsync(BookingDTO bookingDTO)
    {
        var booking = _mapper.Map<Booking>(bookingDTO);
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteBookingAsync(int id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking != null)
        {
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
        }
    }
}