using System;
using System.IO;
using System.Drawing;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    [Route("api/fileupload")]
    public class FileUploadController : BaseController<FileUploadController>
    {
        // GET: /<controller>/
        public IActionResult Index() {
            return View();
        }

        /// <summary>
        /// Uploads the specified file.
        /// </summary>
        /// <param name="file">The file sent with the HttpRequest.</param>
        /// <returns>Task&lt;IActionResult&gt;.</returns>
        [HttpPost] //[FromBody]FromFile content = null
        public async Task<IActionResult> Upload() {
            try {
                IFormFile file;
                StringValues path;
                if (Request.Form.Files.Count > 0) {
                    file = Request.Form.Files[0];
                    Request.Form.TryGetValue("path", out path);
                }
                else {
                    return BadRequest("File is null.");
                }
                    
                return await UploadFileAPI(file, path);
            }
            catch (Exception ex) {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }
    }
    public class FromFile {
        public IFormFile file;
        public string path;
    }
}
