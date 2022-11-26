using Microsoft.AspNetCore.Mvc;
using Okhaz.AppInterfaces.IoOperation;
using Okhaz.Models.Common;
using System;
using System.Linq;

namespace Okhaz.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IFTPUtility iFTPUtility;

        public UploadController(IFTPUtility iFTPUtility)
        {
            this.iFTPUtility = iFTPUtility;
        }

        [HttpPost, DisableRequestSizeLimit]
        public void Post()
        {
            try
            {
                var formCollection = Request.ReadFormAsync().Result;
                //var file = formCollection.Files.First();
                //var folderName = Path.Combine("Resources", "Images");
                //var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                //if (file.Length > 0)
                //{
                //    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                //    var fullPath = Path.Combine(pathToSave, fileName);
                //    var dbPath = Path.Combine(folderName, fileName);
                //    using (var stream = new FileStream(fullPath, FileMode.Create))
                //    {
                //        file.CopyTo(stream);
                //    }
                //    return Ok(new { dbPath });
                //}
                //else
                //{
                //    return BadRequest();
                //}
            }
            catch (Exception ex)
            {
                //return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        //[HttpPost]
        //[Route("{JobId}")]
        //public string PostFormData(IFormFile UploadedData, string JobId)
        //{
        //    user_manager user = AuthenticateUser.GetUserDetailsFromSession();
        //    if (user != null)
        //    {
        //        if (UploadedData.Length > 0)
        //        {
        //            using (var stream = UploadedData.OpenReadStream())
        //            {
        //                //return FTPUtility.UploadFileStream(stream, "filename");
        //            }
        //        }
        //    }
        //    return false.ToString();
        //}

        //[HttpPost, DisableRequestSizeLimit]
        //public IActionResult Upload1()
        //{
        //    try
        //    {
        //        var file = Request.Form.Files[0];
        //        var folderName = Path.Combine("Resources", "Images");
        //        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
        //        if (file.Length > 0)
        //        {
        //            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //            var fullPath = Path.Combine(pathToSave, fileName);
        //            var dbPath = Path.Combine(folderName, fileName);
        //            using (var stream = new FileStream(fullPath, FileMode.Create))
        //            {
        //                file.CopyTo(stream);
        //            }
        //            return Ok(new { dbPath });
        //        }
        //        else
        //        {
        //            return BadRequest();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex}");
        //    }
        //}

        [HttpPost("PostFormData/{path}")]
        public bool PostFormData(string path)
        {
            var formCollection = Request.ReadFormAsync().Result;
            var file = formCollection.Files.First();
            iFTPUtility.WriteFile(new FtpDetails
            {
                FileName = path,
                OnlineBannerPath = "",
                FTPPassword = "",
                FTPUserID = ""
            }, file);

            return false;
        }
    }
}
