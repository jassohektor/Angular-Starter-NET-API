using System;
using System.Text;
using System.Linq;
using Web.Api.Models;
using System.Xml;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Web.Api.Controllers
{
    [Route("api/event")]
    public class EventController : Controller
    {
        private readonly ApiContext _context;
        public EventController(ApiContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index(int amount) {
            try {
                return StatusCode(204, "No Content: Empty data source!");
            }
            catch (Exception ex) {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }

        [HttpGet("clients")]
        public IActionResult getClients() {
            try {
                return StatusCode(204, "No Content: Empty data source!");
            }
            catch (Exception ex) {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }

        [HttpGet("reports/{startDate}/{endDate}")] //http://localhost:5000/api/event/reports/2019-07-01T00:00:00/2019-07-31T23:00:00
        public async Task<IActionResult> getRecords(DateTime startDate, DateTime endDate, int startIndex = 1) {
            try {
                return StatusCode(204, "No Content: Empty data source!");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        // Creates a new record : POST api/event, body?
        [HttpPost]
        public IActionResult Post([FromBody]Event model)
        {
            try
            {
                return StatusCode(204, "No Content: Empty data source!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }

        // DELETE api/event/uniqueId
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var entity = _context.Events.FirstOrDefault(e => e.Id == id);
                entity.Active = false;
                _context.SaveChanges();
                return Ok(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }
    }
}
