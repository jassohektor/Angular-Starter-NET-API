using System;
using System.Linq;
using Web.Api.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly ApiContext _context;
        public UserController(ApiContext context) {
            _context = context;
        }

        // Get all records.
        // GET: api/user/
        [HttpGet]
        public IActionResult Index()
        {
            try {
                var items = _context.Users.Where(e => e.Active);
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

        // Get a single record to authenticate user.
        // GET api/user/email/password
        [HttpGet("{email}/{password}")]
        public IActionResult Get(string email, string password)
        {
            try {
                byte[] sha512;
                using (SHA512 shaM = new SHA512Managed()) {
                    sha512 = shaM.ComputeHash(Encoding.UTF8.GetBytes(password));
                }

                var user = _context.Users.FirstOrDefault(e => e.Email == email && e.UserPW.Equals(sha512));
                if (user != null) {
                    return Ok(user);
                }
                else {
                    return StatusCode(401, "Wrong Credentials: invalid username or password!");
                }
            }
            catch (Exception ex) {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }

        // Creates a new record.
        // POST api/user/password
        [HttpPost("{password}")]
        public IActionResult Post([FromBody]User model, string password)
        {
            try {
                if (model.Id.Equals(Guid.Empty) || model.Id == null) {
                    User entity = new User {
                        CreatedDate = DateTime.UtcNow
                    };
                    entity.CityId = model.CityId;
                    entity.FirstName = model.FirstName;
                    entity.LastName = model.LastName;
                    entity.AlsoKnownAs = model.AlsoKnownAs;
                    entity.Title = model.Title;
                    entity.Email = model.Email;
                    entity.Phone = model.Phone;
                    entity.Address = model.Address;
                    entity.ZipCode = model.ZipCode;
                    entity.Gender = model.Gender;
                    byte[] sha512;
                    using (SHA512 shaM = new SHA512Managed()) {
                        sha512 = shaM.ComputeHash(Encoding.UTF8.GetBytes(password));
                    }
                    entity.UserPW = sha512;
                    entity.Notes = model.Notes;
                    entity.BirthDate = model.BirthDate;
                    entity.PhotoUrl = model.PhotoUrl;
                    entity.Points = model.Points;
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
        // PUT api/user/password?
        [HttpPut("{password?}")]
        public IActionResult Put([FromBody]User model, string password)
        {
            try {
                if (ModelState.IsValid) {
                    User entity = _context.Set<User>().SingleOrDefault(s => s.Id == model.Id);
                    entity.CityId = model.CityId;
                    entity.FirstName = model.FirstName;
                    entity.LastName = model.LastName;
                    entity.AlsoKnownAs = model.AlsoKnownAs;
                    entity.Title = model.Title;
                    entity.Email = model.Email;
                    entity.Phone = model.Phone;
                    entity.Address = model.Address;
                    entity.ZipCode = model.ZipCode;
                    entity.Gender = model.Gender;

                    byte[] sha512;
                    if (!string.IsNullOrEmpty(password)) {
                        using (SHA512 shaM = new SHA512Managed()) {
                            sha512 = shaM.ComputeHash(Encoding.UTF8.GetBytes(password));
                        }
                        entity.UserPW = sha512;
                    }
                    entity.Notes = model.Notes;
                    entity.BirthDate = model.BirthDate;
                    entity.PhotoUrl = model.PhotoUrl;
                    entity.Points = model.Points;
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

        // DELETE api/user/id/modifiedBy
        [HttpDelete("{id}/{modifiedBy}")]
        public IActionResult Delete(Guid Id, Guid modifiedBy)
        {
            try {
                var entity = _context.Users.FirstOrDefault(e => e.Id == Id);
                entity.ModifiedBy = modifiedBy;
                entity.Active = false;

                _context.SaveChanges();
                return Ok(Id);
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
