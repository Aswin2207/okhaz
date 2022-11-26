using DataAccess.DAL.ConfigReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAL
{
    internal class DBConnection
    {
        public static object ExecuteProcedure(string procName, params SqlParameter[] paramters)
        {
            using (var sqlConnection = new SqlConnection(SettingsReaderInstanceManager.Instance.ConnectionString))
            {
                using (var command = sqlConnection.CreateCommand())
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = procName;
                    if (paramters != null)
                    {
                        command.Parameters.AddRange(paramters);
                    }
                    sqlConnection.Open();
                    var ret = command.ExecuteScalar();
                    return ret;
                }
            }
            // return result;
        }

        public static List<T> ExecuteProcedureConvertToList<T>(string procName,
         params SqlParameter[] paramters)
        {
            DataSet result = null;
            DataTable dt = new DataTable();
            List<Dictionary<string, string>> retData = new List<Dictionary<string, string>>();
            using (var sqlConnection = new SqlConnection(SettingsReaderInstanceManager.Instance.ConnectionString))
            {
                using (var command = sqlConnection.CreateCommand())
                {
                    using (SqlDataAdapter sda = new SqlDataAdapter(command))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.CommandText = procName;
                        if (paramters != null)
                        {
                            command.Parameters.AddRange(paramters);
                        }
                        result = new DataSet();
                        sda.Fill(result);

                        dt = result.Tables[0];

                        var columnNames = dt.Columns.Cast<DataColumn>().Select(c => c.ColumnName.ToLower()).ToList();
                        var properties = typeof(T).GetProperties();
                        return dt.AsEnumerable().Select(row =>
                        {
                            var objT = Activator.CreateInstance<T>();
                            foreach (var pro in properties)
                            {
                                if (columnNames.Contains(pro.Name.ToLower()))
                                {
                                    try
                                    {
                                        pro.SetValue(objT, row[pro.Name]);
                                    }
                                    catch (Exception ex) { }
                                }
                            }
                            return objT;
                        }).ToList();
                    }
                }
            }
        }

        public static List<Dictionary<string, string>> ExecuteProcedureReturnDataSet(string procName,
         params SqlParameter[] paramters)
        {
            DataSet result = null;
            List<Dictionary<string, string>> retData = new List<Dictionary<string, string>>();
            using (var sqlConnection = new SqlConnection(SettingsReaderInstanceManager.Instance.ConnectionString))
            {
                using (var command = sqlConnection.CreateCommand())
                {
                    using (SqlDataAdapter sda = new SqlDataAdapter(command))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.CommandText = procName;
                        if (paramters != null)
                        {
                            command.Parameters.AddRange(paramters);
                        }
                        result = new DataSet();
                        sda.Fill(result);
                        var rows = result.Tables[0].Rows[0].ItemArray;

                        for (int i = 0; i < result.Tables[0].Rows.Count; i++)
                        {
                            Dictionary<string, string> d = new Dictionary<string, string>();
                            for (int j = 0; j < result.Tables[0].Rows[i].ItemArray.Length; j++)
                            {
                                d.Add(result.Tables[0].Columns[j].ToString(), result.Tables[0].Rows[i].ItemArray[j].ToString());
                            }
                            retData.Add(d);
                        }
                    }
                }
            }
            return retData;
        }

        public SqlConnection connection()
        {
            SqlConnection con = new SqlConnection(SettingsReaderInstanceManager.Instance.ConnectionString);
            return con;
        }

        //using (var sqlConnection = new SqlConnection(connString))
        //{
        //    using (var command = sqlConnection.CreateCommand())
        //    {
        //        command.CommandType = System.Data.CommandType.StoredProcedure;
        //        command.CommandText = ;
        //    }
        //}

        //DataSet data = SqlHelper.ExecuteDataset(con, CommandType.StoredProcedure, , parameters);
        //if (data.Tables[0].Rows.Count > 0)
        //{
        //    return data.Tables[0].Rows[0].ItemArray.ToArray();
        //}
    }
}
