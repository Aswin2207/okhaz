using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Okhaz.Models
{
    public class CategoryModel
    {
        public string categoryName { get; set; }
        public string parentCategoryId { get; set; }
    }
}