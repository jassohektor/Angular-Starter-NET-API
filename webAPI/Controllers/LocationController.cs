using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    [Route("api/locations")]
    public class LocationController : Controller
    {
        private readonly ApiContext _context;
        public LocationController(ApiContext context) {
            _context = context;
        }

        // Get all records.
        // GET: api/values
        [HttpGet]
        public IActionResult Index()
        {
            try {
                var items = _context.Locations.Where(e => e.Active);
                if (items.Count() > 0) {
                    return Ok(items);
                }
                else {
                    return StatusCode(204, "No Content: Empty data source!");
                }
            }
            catch (Exception ex) {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }
    }
}
