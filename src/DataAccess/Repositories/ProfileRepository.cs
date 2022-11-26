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
    public class ProfileRepository : BaseRepository<OnlineOrder>
    {
        BaseRepository<OnlineOrder> repo;
        public ProfileRepository()
        {
            repo = new BaseRepository<OnlineOrder>();
        }

        public dynamic GetUserDetailsbyBranchID(string branchID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", branchID);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetUserDetailsbyBranchID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetUserDetailsByBranchuserID(int UserID, string branchID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@BranchID", branchID);
                parameters[1] = new SqlParameter("@ID", UserID);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetUserDetailsByBranchuserID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool UpdatePassword_UserManager(string ID, string branchID, string passWord)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[4];
                parameters[0] = new SqlParameter("@ID", ID);
                parameters[1] = new SqlParameter("@BranchID", branchID);
                parameters[2] = new SqlParameter("@passWord", passWord);
                parameters[3] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[3].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[dbo].[SP_UpdatePassword_UserManager]", parameters);

                retVAl = (bool)parameters[3].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool UpdateEmail_UserManager(string ID, string branchID, string emailId)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[4];
                parameters[0] = new SqlParameter("@ID", ID);
                parameters[1] = new SqlParameter("@BranchID", branchID);
                parameters[2] = new SqlParameter("@emailId", emailId);
                parameters[3] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[3].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[dbo].[SP_UpdateEmail_UserManager]", parameters);

                retVAl = (bool)parameters[3].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }
    }
}
