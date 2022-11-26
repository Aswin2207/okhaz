using Microsoft.AspNetCore.Http;
using Okhaz.AppInterfaces.IoOperation;
using Okhaz.Models.Common;
using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace Okhaz.Common.Global
{
    public class FTPUtility : IFTPUtility
    {
        public async Task<bool> UploadFileStream(FtpDetails ftpDetails, Stream stream)
        {
            try
            {
                string ftpPath = ftpDetails.OnlineBannerPath + "/" + ftpDetails.FileName;
                string ftpUserName = ftpDetails.FTPUserID;
                string ftpPassword = ftpDetails.FTPPassword;
                FtpWebRequest request = (FtpWebRequest)FtpWebRequest.Create(ftpPath);
                request.Method = WebRequestMethods.Ftp.UploadFile;
                request.Credentials = new NetworkCredential(ftpUserName, ftpPassword);
                request.UsePassive = true;
                request.UseBinary = true;
                request.KeepAlive = false;

                using (Stream requestStream = request.GetRequestStream())
                {
                    byte[] buffer = new byte[stream.Length];
                    stream.Read(buffer, 0, buffer.Length);
                    await requestStream.WriteAsync(buffer, 0, buffer.Length);
                    requestStream.Close();
                }
                return true;
            }
            catch (Exception ex)
            {
                //Logger.Log("Exception while uploading file stream", ex);
                return false;
            }
        }

        public bool WriteFile(FtpDetails ftpDetails, IFormFile file)
        {
            string ftpPath = ftpDetails.OnlineBannerPath + "/" + ftpDetails.FileName;
            string ftpUserName = ftpDetails.FTPUserID;
            string ftpPassword = ftpDetails.FTPPassword;
            FtpWebRequest request = (FtpWebRequest)FtpWebRequest.Create(ftpPath);
            request.Method = WebRequestMethods.Ftp.UploadFile;
            request.Credentials = new NetworkCredential(ftpUserName, ftpPassword);
            request.UsePassive = true;
            request.UseBinary = true;
            request.KeepAlive = false;

            using (Stream requestStream = request.GetRequestStream())
            {
                file.CopyTo(requestStream);
                requestStream.Close();
            }
            return true;
        }
    }
}
