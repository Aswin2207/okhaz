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
    public class WheelGameRepository : BaseRepository<OnlineOrder>
    {
        BaseRepository<OnlineOrder> repo;
        public WheelGameRepository()
        {
            repo = new BaseRepository<OnlineOrder>();
        }

        public dynamic GetWheelGameMasterByUserId(string userId)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@UserID", userId);

                return DBConnection.ExecuteProcedureReturnDataSet("[ok].[SP_GetWheelGame_MasterList]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetWheelGameMasterByWGlID(int wGlID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@WGlID", wGlID);

                return DBConnection.ExecuteProcedureReturnDataSet("[ok].[SP_GetWheelGame_MasterDetails]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic CloneWheelGameMaster(int wGlID)
        {
            bool retVAl = false;
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@WGlID", wGlID);


                List<Dictionary<string, string>> wheel = DBConnection.ExecuteProcedureReturnDataSet("[ok].[SP_GetWheelGame_MasterDetails]", parameters);

                parameters = new SqlParameter[19];
                parameters[0] = new SqlParameter("@BranchID", wheel[0]["BranchID"]);
                parameters[1] = new SqlParameter("@WGTitle", wheel[0]["WGTitle"] + " - clone");
                parameters[2] = new SqlParameter("@WGTextSize", wheel[0]["WGTextSize"]);
                parameters[3] = new SqlParameter("@SliceRepeat", wheel[0]["SliceRepeat"]);
                parameters[4] = new SqlParameter("@SpinTime", wheel[0]["SpinTime"]);
                parameters[5] = new SqlParameter("@FairMode", wheel[0]["FairMode"]);
                parameters[6] = new SqlParameter("@CreateDate", wheel[0]["CreateDate"]);
                parameters[7] = new SqlParameter("@LastUpdateDate", wheel[0]["LastUpdateDate"]);
                parameters[8] = new SqlParameter("@UserID", wheel[0]["UserID"]);
                parameters[9] = new SqlParameter("@WinnerID", wheel[0]["WinnerID"]);
                parameters[10] = new SqlParameter("@WGScheduleTime", wheel[0]["WGScheduleTime"]);
                parameters[11] = new SqlParameter("@WGDescription", wheel[0]["WGDescription"]);
                parameters[12] = new SqlParameter("@MessageAfterWin", wheel[0]["MessageAfterWin"]);
                parameters[13] = new SqlParameter("@WGStatus", wheel[0]["WGStatus"]);
                parameters[14] = new SqlParameter("@LastUse", wheel[0]["LastUse"]);
                parameters[15] = new SqlParameter("@NumberofUsesAllowed", wheel[0]["NumberofUsesAllowed"]);
                parameters[16] = new SqlParameter("@IsActiveOnAndriod", wheel[0]["IsActiveOnAndriod"]);
                parameters[17] = new SqlParameter("@IsActiveOniOS", wheel[0]["IsActiveOniOS"]);
                parameters[18] = new SqlParameter("@IsActiveOnWeb", wheel[0]["IsActiveOnWeb"]);

                parameters[19] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[19].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_WheelGame_Master_Create]", parameters);

                retVAl = (bool)parameters[19].Value;
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetWheelSliceByWGlID(int wGlID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@WGlID", wGlID);

                return DBConnection.ExecuteProcedureReturnDataSet("[ok].[SP_GetWheelGameSlice_Details]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool DeleteWheelGameMaster(int wGlID)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@WGlID", wGlID);
                parameters[1] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[1].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_WheelGame_Master_Delete]", parameters);

                retVAl = (bool)parameters[1].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool DeleteWheelGameSlice(int wGlID)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@WGlID", wGlID);
                parameters[1] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[1].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_WheelGameSlice_Delete]", parameters);

                retVAl = (bool)parameters[1].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool WheelGameMasterCreate(WheelGameCreate objWheelGameCreate)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[19];
                parameters[0] = new SqlParameter("@BranchID", objWheelGameCreate.BranchID);
                parameters[1] = new SqlParameter("@WGTitle", objWheelGameCreate.WGTitle);
                parameters[2] = new SqlParameter("@WGTextSize", objWheelGameCreate.WGTextSize);
                parameters[3] = new SqlParameter("@SliceRepeat", objWheelGameCreate.SliceRepeat);
                parameters[4] = new SqlParameter("@SpinTime", objWheelGameCreate.SpinTime);
                parameters[5] = new SqlParameter("@FairMode", objWheelGameCreate.FairMode);
                parameters[6] = new SqlParameter("@CreateDate", objWheelGameCreate.CreateDate);
                parameters[7] = new SqlParameter("@LastUpdateDate", objWheelGameCreate.LastUpdateDate);
                parameters[8] = new SqlParameter("@UserID", objWheelGameCreate.UserID);
                parameters[9] = new SqlParameter("@WinnerID", objWheelGameCreate.WinnerID);
                parameters[10] = new SqlParameter("@WGScheduleTime", objWheelGameCreate.WGScheduleTime);
                parameters[11] = new SqlParameter("@WGDescription", objWheelGameCreate.WGDescription);
                parameters[12] = new SqlParameter("@MessageAfterWin", objWheelGameCreate.MessageAfterWin);
                parameters[13] = new SqlParameter("@WGStatus", objWheelGameCreate.WGStatus);
                parameters[14] = new SqlParameter("@LastUse", objWheelGameCreate.LastUse);
                parameters[15] = new SqlParameter("@NumberofUsesAllowed", objWheelGameCreate.NumberofUsesAllowed);
                parameters[16] = new SqlParameter("@IsActiveOnAndriod", objWheelGameCreate.IsActiveOnAndriod);
                parameters[17] = new SqlParameter("@IsActiveOniOS", objWheelGameCreate.IsActiveOniOS);
                parameters[18] = new SqlParameter("@IsActiveOnWeb", objWheelGameCreate.IsActiveOnWeb);

                parameters[19] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[19].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_WheelGame_Master_Create]", parameters);

                retVAl = (bool)parameters[19].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool UpdateWheelGameMaster(WheelGameMaster objWheelGameMaster)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[16];
                parameters[0] = new SqlParameter("@WGlID", objWheelGameMaster.WGlID);
                parameters[1] = new SqlParameter("@WGTitle", objWheelGameMaster.WGTitle);
                parameters[2] = new SqlParameter("@WGTextSize", objWheelGameMaster.WGTextSize);
                parameters[3] = new SqlParameter("@SliceRepeat", objWheelGameMaster.SliceRepeat);
                parameters[4] = new SqlParameter("@SpinTime", objWheelGameMaster.SpinTime);
                parameters[5] = new SqlParameter("@FairMode", objWheelGameMaster.FairMode);
                parameters[6] = new SqlParameter("@WinnerID", objWheelGameMaster.WinnerID);
                parameters[7] = new SqlParameter("@WGScheduleTime", objWheelGameMaster.WGScheduleTime);
                parameters[8] = new SqlParameter("@WGDescription", objWheelGameMaster.WGDescription);
                parameters[9] = new SqlParameter("@MessageAfterWin", objWheelGameMaster.MessageAfterWin);
                parameters[10] = new SqlParameter("@WGStatus", objWheelGameMaster.WGStatus);
                parameters[11] = new SqlParameter("@NumberofUsesAllowed", objWheelGameMaster.NumberofUsesAllowed);
                parameters[12] = new SqlParameter("@IsActiveOnAndriod", objWheelGameMaster.IsActiveOnAndriod);
                parameters[13] = new SqlParameter("@IsActiveOniOS", objWheelGameMaster.IsActiveOniOS);
                parameters[14] = new SqlParameter("@IsActiveOnWeb", objWheelGameMaster.IsActiveOnWeb);

                parameters[15] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[15].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_WheelGame_Master_Update]", parameters);

                retVAl = (bool)parameters[15].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool CreateWheelGameSlice(WheelGameSlice objWheelGameSlice)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[10];
                parameters[0] = new SqlParameter("@WGlID", objWheelGameSlice.WGlID);
                parameters[1] = new SqlParameter("@WGSText", objWheelGameSlice.WGSText);
                parameters[2] = new SqlParameter("@WGSTextColorCode", objWheelGameSlice.WGSTextColorCode);
                parameters[3] = new SqlParameter("@WGSBackGroudColorCode", objWheelGameSlice.WGSBackGroudColorCode);
                parameters[4] = new SqlParameter("@ImagePath", objWheelGameSlice.ImagePath);
                parameters[5] = new SqlParameter("@WGSCreateDate", objWheelGameSlice.WGSCreateDate);
                parameters[6] = new SqlParameter("@WGSLastUpdateDate", objWheelGameSlice.WGSLastUpdateDate);
                parameters[7] = new SqlParameter("@UserID", objWheelGameSlice.UserID);
                parameters[8] = new SqlParameter("@WGSstatus", objWheelGameSlice.WGSstatus);

                parameters[9] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[9].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_WheelGameSlice_Create]", parameters);

                retVAl = (bool)parameters[9].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool UpdateWheelGameSlice(WheelGameSlice objWheelGameSlice)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[10];
                parameters[0] = new SqlParameter("@WGSID", objWheelGameSlice.WGSID);
                parameters[1] = new SqlParameter("@WGlID", objWheelGameSlice.WGlID);
                parameters[2] = new SqlParameter("@WGSText", objWheelGameSlice.WGSText);
                parameters[3] = new SqlParameter("@WGSTextColorCode", objWheelGameSlice.WGSTextColorCode);
                parameters[4] = new SqlParameter("@WGSBackGroudColorCode", objWheelGameSlice.WGSBackGroudColorCode);
                parameters[5] = new SqlParameter("@ImagePath", objWheelGameSlice.ImagePath);
                parameters[6] = new SqlParameter("@WGSLastUpdateDate", objWheelGameSlice.WGSLastUpdateDate);
                parameters[7] = new SqlParameter("@UserID", objWheelGameSlice.UserID);
                parameters[8] = new SqlParameter("@WGSstatus", objWheelGameSlice.WGSstatus);

                parameters[9] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[9].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_WheelGameSlice_Update]", parameters);

                retVAl = (bool)parameters[9].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

    }
}
