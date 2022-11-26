using Okhaz.Models;
using DataAccess.DAL;
using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc;

namespace Okhaz.Controllers.SessionController
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private BaseRepository<customer_master> customerRepo;
        private BaseRepository<user_manager> userRepo;

        public SignUpController(user_manager userDetails)
        {
            userRepo = new BaseRepository<user_manager>();
            customerRepo = new BaseRepository<customer_master>();
        }

        [HttpGet]
        public object Get(string email)
        {
            List<user_manager> users = userRepo.Get((x) => x.emailId == email).ToList();
            return (users);
        }

        [HttpPost("RegisterUser")]
        public object RegisterUser(RegistrationModel userDetails)
        {
            if (userDetails != null && !string.IsNullOrWhiteSpace(userDetails.emailId))
            {
                var user = new user_manager();
                user.branchid = "b002";
                user.emailId = userDetails.emailId;
                user.userName = userDetails.userName;
                user.userType = userDetails.userType;
                user.passWord = userDetails.passWord;

                var customer = new customer_master();
                customer.cusEmail = userDetails.emailId;
                customer.AccountName = userDetails.company_name;
                //customer.tax_number = userDetails.tax_number;

                userRepo.Insert(user);
                customerRepo.Insert(customer);
            }
            return null;
        }
    }
}
