using System;
using System.IO;
using System.Linq;
using System.Drawing;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    public class BaseController<T> : Controller where T : BaseController<T>
    {
        protected async Task<JsonResult> UploadFileAPI(IFormFile file, string path)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            var fileIdentifier = $"{Guid.NewGuid()}{fileExtension}";
            path += fileIdentifier;

            // valid image extensions to process
            var imageExtensions = new List<string> { "png", "jpg", "jpeg", "gif", "tiff" };
            if (imageExtensions.Contains(fileExtension.Replace(".", "").ToLower()))
            {
                using (var stream = new FileStream(path, FileMode.Create)) {
                    await file.CopyToAsync(stream);
                }
                /*/ Resize the selected image.
                using (Image img = Image.FromStream(file.OpenReadStream())) {
                    //Resize
                    using (Image ScaledImage = img.ResizeToFit(1024, 1024, true, false, false)) {
                        //Upload image to azure cloud storage
                        Stream filseStream = new MemoryStream(ScaledImage.ToByteArray());
                        await blockBlob.UploadFromStreamAsync(fileStream);
                    }
                }
                */
            }
            else {
                // Create the blob with the contents of the selected file.
                using (var fileStream = file.OpenReadStream()) {
                    var stream = new FileStream(path, FileMode.Create, FileAccess.Write);
                    await stream.CopyToAsync(fileStream);
                    fileStream.Dispose();
                }
            }
            return Json(new {
                Identifier = fileIdentifier,
                Name = file.Name,
                fileSize = file.Length,
                storageUri = path
            });
        }


    }
}
