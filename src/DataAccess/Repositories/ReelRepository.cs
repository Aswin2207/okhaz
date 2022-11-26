using Microsoft.Extensions.Configuration;
using DataAccess.DAL;
using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;

namespace DataAccess.Repositories
{
    public class ReelRepository : BaseRepository<OnlineOrder>
    {
        BaseRepository<OnlineOrder> repo;
        public ReelRepository()
        {
            repo = new BaseRepository<OnlineOrder>();
        }

        public dynamic GetReelByBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchID", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[ok].[SP_GetReelByBranchID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetReelByReelID(string BranchCode, int ReelID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@BranchID", BranchCode);
                parameters[1] = new SqlParameter("@ReelID", ReelID);

                return DBConnection.ExecuteProcedureReturnDataSet("[ok].[SP_GetReelByBranchID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool CreateReel(ReelCU objReelCU)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[16];
                parameters[0] = new SqlParameter("@BranchID", objReelCU.BranchID);
                parameters[1] = new SqlParameter("@ReelTitle", objReelCU.ReelTitle);
                parameters[2] = new SqlParameter("@StartDate", objReelCU.StartDate);
                parameters[3] = new SqlParameter("@ExpiryDate", objReelCU.ExpiryDate);
                parameters[4] = new SqlParameter("@CreateDate", objReelCU.CreateDate);
                parameters[5] = new SqlParameter("@LastUpdateDate", objReelCU.LastUpdateDate);
                parameters[6] = new SqlParameter("@UserID", objReelCU.UserID);
                parameters[7] = new SqlParameter("@ReelLocation", objReelCU.ReelLocation);
                parameters[8] = new SqlParameter("@ReelStatus", objReelCU.ReelStatus);
                parameters[9] = new SqlParameter("@ReelViewCount", objReelCU.ReelViewCount);
                parameters[10] = new SqlParameter("@Filename", objReelCU.Filename);
                parameters[11] = new SqlParameter("@Fileheight", objReelCU.Fileheight);
                parameters[12] = new SqlParameter("@Filewidth", objReelCU.Filewidth);
                parameters[13] = new SqlParameter("@Filesize", objReelCU.Filesize);
                parameters[14] = new SqlParameter("@DeviceName", objReelCU.DeviceName);

                parameters[15] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[15].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_Reel_Create]", parameters);

                retVAl = (bool)parameters[15].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool UpdateReel(ReelUPD objReelUPD)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[12];
                parameters[0] = new SqlParameter("@ReelID", objReelUPD.ReelID);
                parameters[1] = new SqlParameter("@ReelTitle", objReelUPD.ReelTitle);
                parameters[2] = new SqlParameter("@StartDate", objReelUPD.StartDate);
                parameters[3] = new SqlParameter("@ExpiryDate", objReelUPD.ExpiryDate);
                parameters[4] = new SqlParameter("@LastUpdateDate", objReelUPD.LastUpdateDate);
                parameters[5] = new SqlParameter("@ReelLocation", objReelUPD.ReelLocation);
                parameters[6] = new SqlParameter("@Filename", objReelUPD.Filename);
                parameters[7] = new SqlParameter("@Fileheight", objReelUPD.Fileheight);
                parameters[8] = new SqlParameter("@Filewidth", objReelUPD.Filewidth);
                parameters[9] = new SqlParameter("@Filesize", objReelUPD.Filesize);
                parameters[10] = new SqlParameter("@DeviceName", objReelUPD.DeviceName);

                parameters[11] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[11].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_Reel_Update]", parameters);

                retVAl = (bool)parameters[11].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool DelReelByReelID(int ReelID)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@ReelID", ReelID);
                parameters[1] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[1].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_Reel_Delete]", parameters);

                retVAl = (bool)parameters[1].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }
            return retVAl;
        }

        //Reel Details

        public dynamic GetReelDetailsByBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchID", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[ok].[SP_GetReelDetailsByBranchID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetReelDetailsByReelID(string BranchCode, int ReelID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@BranchID", BranchCode);
                parameters[1] = new SqlParameter("@ReelID", ReelID);

                return DBConnection.ExecuteProcedureReturnDataSet("[ok].[SP_GetReelDetailsByBranchID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetReelDetailsByReelDetailID(string BranchCode, int ReelDetailID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@BranchID", BranchCode);
                parameters[1] = new SqlParameter("@ReelDetailID", ReelDetailID);

                return DBConnection.ExecuteProcedureReturnDataSet("[ok].[SP_GetReelDetailsByReelDetailID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool CreateReelDetail(ReelDetailsC objReelDetailsC)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[6];
                parameters[0] = new SqlParameter("@ReelID", objReelDetailsC.ReelID);
                parameters[1] = new SqlParameter("@BranchID", objReelDetailsC.BranchID);
                parameters[2] = new SqlParameter("@WhoView_UserID", objReelDetailsC.WhoView_UserID);
                parameters[3] = new SqlParameter("@LastViewDate", objReelDetailsC.LastViewDate);
                parameters[4] = new SqlParameter("@ReelDetailStatus", objReelDetailsC.ReelDetailStatus);

                parameters[5] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[5].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_ReelDetail_Create]", parameters);

                retVAl = (bool)parameters[5].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }
    }
}
