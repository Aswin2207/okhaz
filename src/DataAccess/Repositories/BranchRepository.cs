using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Repositories
{
    public class BranchRepository : BaseRepository<branch_master>
    {
        BaseRepository<branch_master> repo;
        public BranchRepository()
        {
            repo = new BaseRepository<branch_master>();
        }

        public branch_master GetBranchInfo(string branchId)
        {
            if (!string.IsNullOrWhiteSpace(branchId))
            {
                List<branch_master> list = repo.Get(x => x.branchid == branchId);
                if(list.Count > 0)
                {
                    return list[0];
                }
            }
            return null;
        }

    }
}
