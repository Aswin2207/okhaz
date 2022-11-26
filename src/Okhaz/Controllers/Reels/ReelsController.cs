using DataAccess.Models;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Reels
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReelsController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private ReelRepository repo;

        public ReelsController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new ReelRepository();
        }

        /// <summary>
        /// Reel Create
        /// </summary>
        /// <returns></returns>
        [HttpPost("CreateReel")]
        public object CreateReel([FromBody] ReelCU objReelCU)
        {
            object products = repo.CreateReel(objReelCU);
            return (products);
        }

        /// <summary>
        /// Reel Detail Create
        /// </summary>
        /// <returns></returns>
        [HttpPost("CreateReelDetail")]
        public object CreateReelDetail([FromBody] ReelDetailsC objReelDetailsC)
        {
            object products = repo.CreateReelDetail(objReelDetailsC);
            return (products);
        }

        /// <summary>
        /// Delete Reel by ReelID
        /// </summary>
        /// <param name="ReelID"></param>
        /// <returns></returns>
        [HttpDelete("DelReelByReelID/{ReelID}")]
        public object DelReelByReelID(int ReelID)
        {
            object products = repo.DelReelByReelID(ReelID);
            return (products);
        }

        /// <summary>
        /// Get Reel By Branch Code
        /// </summary>
        /// <returns></returns>
        /// <param name="BranchCode"></param>
        /// <returns></returns>
        [HttpGet("GetReelByBranchCode")]
        public object GetReelByBranchCode()
        {
            object products = repo.GetReelByBranchCode(userIdentity.BranchId);
            //object products = repo.GetWheelGameMasterByUserId("4");
            return (products);
        }

        /// <summary>
        /// Get Reel By Reel ID
        /// </summary>
        /// <returns></returns>
        /// <param name="BranchCode"></param>
        /// <param name="ReelID"></param>
        /// <returns></returns>
        [HttpGet("GetReelByReelID/{ReelID})")]
        public object GetReelByReelID(int ReelID)
        {
            object products = repo.GetReelByReelID(userIdentity.BranchId, ReelID);
            //object products = repo.GetWheelGameMasterByUserId("4");
            return (products);
        }

        /// <summary>
        /// Get Reel Details By Branch Code
        /// </summary>
        /// <returns></returns>
        /// <param name="BranchCode"></param>
        /// <returns></returns>
        [HttpGet("GetReelDetailsByBranchCode")]
        public object GetReelDetailsByBranchCode()
        {
            object products = repo.GetReelDetailsByBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Reel Details By Reel Detail ID
        /// </summary>
        /// <returns></returns>
        /// <param name="BranchCode"></param>
        /// <param name="ReelDetailID"></param>
        /// <returns></returns>
        [HttpGet("GetReelDetailsByReelDetailID/{ReelDetailID})")]
        public object GetReelDetailsByReelDetailID(int ReelDetailID)
        {
            object products = repo.GetReelDetailsByReelDetailID(userIdentity.BranchId, ReelDetailID);
            return (products);
        }

        /// <summary>
        /// Get Reel Details By Reel ID
        /// </summary>
        /// <returns></returns>
        /// <param name="BranchCode"></param>
        /// <param name="ReelID"></param>
        /// <returns></returns>
        [HttpGet("GetReelDetailsByReelID/{ReelID})")]
        public object GetReelDetailsByReelID(int ReelID)
        {
            object products = repo.GetReelDetailsByReelID(userIdentity.BranchId, ReelID);
            return (products);
        }

        /// <summary>
        /// Reel Update
        /// </summary>
        /// <returns></returns>
        [HttpPost("UpdateReel")]
        public object UpdateReel([FromBody] ReelUPD objReelUPD)
        {
            object products = repo.UpdateReel(objReelUPD);
            return (products);
        }
    }
}
