using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        //TODO Add React page navigation?
        return View();
    }

    public IActionResult Privacy()
    {
        //TODO Add React page navigation?
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}