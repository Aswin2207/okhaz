using DataAccess.DAL;
using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class CustomerReporsitory : BaseRepository<customer_master>
    {
        BaseRepository<customer_master> repo;

        public CustomerReporsitory()
        {
            repo = new BaseRepository<customer_master>();
        }

        public void AddCustomer(customer_master item, string branchCode)
        {
            if (item != null)
            {
                item.branchid = branchCode;
                repo.Insert(item);
                repo.Save();
            }
        }

        public object GetCustomerList(string branchCode, string searchVal)
        {
            if (!string.IsNullOrWhiteSpace(branchCode))
            {
                Expression<Func<customer_master, bool>> filter = x => (x.branchid == branchCode && (x.cusEmail.Contains(searchVal) || x.custName.Contains(searchVal) || x.AccountName.Contains(searchVal)));
                long length = repo.getDataCount(filter);
                IEnumerable<customer_master> data = repo.Get(filter);
                return data;
            }
            return null;
        }
    }
}
