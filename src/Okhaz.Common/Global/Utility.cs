using System;
using System.Text;

namespace Okhaz.Common.Global
{
    public class Utility
    {
        public static string ConvertBase64ToString(string encodedString)
        {
            if (!string.IsNullOrWhiteSpace(encodedString))
            {
                try
                {
                    byte[] data = Convert.FromBase64String(encodedString);
                    string decodedString = Encoding.UTF8.GetString(data);
                    return decodedString;
                }
                catch (Exception ex)
                {
                }
            }
            return encodedString;
        }

        public static void WriteImageFiles()
        {
        }
    }
}
