using DataAccess.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Okhaz.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        BranchRepository repo;
        public BranchController()
        {
            repo = new BranchRepository();
        }
    }
}
