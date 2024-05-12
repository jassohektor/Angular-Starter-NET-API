using System;
using System.Linq;
using Web.Api.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    [Route("api/buildings")]
    public class BuildingController : Controller
    {
        private readonly ApiContext _context;
        public BuildingController(ApiContext context) {
            _context = context;
        }

        // Get all records.
        // GET: api/values
        [HttpGet]
        public IActionResult Index() {
            try {
                var items = _context.Buildings.Where(e => e.Active);
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

        // Get a single record.
        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try {
                var item = _context.Buildings.FirstOrDefault(e => e.Active && e.Id == id);
                if (item != null) {
                    return Ok(item);
                }
                else {
                    return StatusCode(404, "Not Found: Requested info not available!");
                }
            }
            catch (Exception ex) {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }

        // Creates a new record.
        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Building model)
        {
            try
            {
                if (!model.Id.HasValue)
                {
                    Building entity = new Building {
                        CreatedDate = DateTime.UtcNow
                    };
                    entity.LocationId = model.LocationId;
                    entity.Property = model.Property;
                    entity.Description = model.Description;
                    entity.UpdatedDate = DateTime.UtcNow;
                    entity.ModifiedBy = model.ModifiedBy;
                    entity.Active = true;
                    _context.Add(entity);
                    model = entity;
                }
                _context.SaveChanges();
                return Ok(model);
            }
            catch (Exception ex) {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }

        // Updates an existing record.
        // PUT api/values/5
        [HttpPut]
        public IActionResult Put([FromBody]Building model)
        {
            try {
                if (ModelState.IsValid) {
                    Building entity = _context.Set<Building>().SingleOrDefault(s => s.Id == model.Id);
                    entity.LocationId = model.LocationId;
                    entity.Property = model.Property;
                    entity.Description = model.Description;
                    entity.UpdatedDate = DateTime.UtcNow;
                    entity.ModifiedBy = model.ModifiedBy;
                    _context.SaveChanges();
                    return Ok(entity);
                }
                else {
                    return StatusCode(500, "Model does not meet the expected entity class!");
                }
            }
            catch (Exception ex) {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}/{modifiedBy}")]
        public IActionResult Delete(int Id, Guid modifiedBy)
        {
            try {
                var entity = _context.Buildings.FirstOrDefault(e => e.Id == Id);
                entity.ModifiedBy = modifiedBy;
                entity.Active = false;

                _context.SaveChanges();
                return Ok(Id);
            }
            catch (Exception ex) {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }
    }
}
