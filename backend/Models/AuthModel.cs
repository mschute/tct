using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class AuthModel
{
    
    [EmailAddress]
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}