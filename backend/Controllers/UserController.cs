using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Models;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UserController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ILogger<RolesController> _logger;

    public UserController(UserManager<IdentityUser> userManager, ILogger<RolesController> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        List<UserDTO> usersDTO = null;

        try
        {
            var users = await _userManager.Users.ToListAsync();
            usersDTO = new List<UserDTO>();

            foreach (var user in users)
            {
                var role = await GetUserRole(user);

                var userDTO = new UserDTO
                {
                    UserId = user.Id,
                    Email = user.Email,
                    RoleName = role
                };

                usersDTO.Add(userDTO);
            }

            _logger.LogInformationEx("Users retrieved successfully");
            return Ok(usersDTO);
        }
        catch (Exception ex)
        {
            _logger.LogErrorEx($"Failed with error: {ex}");
            return StatusCode(500, $"Failed with error: {ex}");
        }
    }

    private async Task<string> GetUserRole(IdentityUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        return roles.FirstOrDefault() ?? "No Role";
    }
}
