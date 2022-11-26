using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Okhaz.Models
{
    public class GridModel
    {
        public int start { get; set; }
        public int limit { get; set; }
        public string sortCol { get; set; }
        public int sortOrder { get; set; }
        public string searchVal { get; set; }
    }
}