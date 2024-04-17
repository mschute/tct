namespace backend.DTOs;

public class CustomerDTO
{
    public int CustomerId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateOnly? Dob { get; set; }
    public string? Nationality { get; set; }
}