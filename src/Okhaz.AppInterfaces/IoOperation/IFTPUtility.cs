using Microsoft.AspNetCore.Http;
using Okhaz.Models.Common;
using System.IO;
using System.Threading.Tasks;

namespace Okhaz.AppInterfaces.IoOperation
{
    public interface IFTPUtility
    {
        Task<bool> UploadFileStream(FtpDetails ftpDetails, Stream stream);

        bool WriteFile(FtpDetails ftpDetails, IFormFile file);
    }
}
