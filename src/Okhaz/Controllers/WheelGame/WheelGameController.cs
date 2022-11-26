using DataAccess.Models;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.WheelGame
{
    [Route("api/[controller]")]
    [ApiController]
    public class WheelGameController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private WheelGameRepository repo;

        public WheelGameController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new WheelGameRepository();
        }

        /// <summary>
        /// Get Wheel game Master Details by wGlID
        /// </summary>
        /// <param name="wGlID"></param>
        /// <returns></returns>
        [HttpGet("CloneWheelGameMaster/{wGlID}")]
        public object CloneWheelGameMaster(int wGlID)
        {
            object products = repo.CloneWheelGameMaster(wGlID);
            return (products);
        }

        /// <summary>
        /// Creating Wheel game Slice Details
        /// </summary>
        /// <param name="wGlID"></param>
        /// <returns></returns>
        [HttpPost("CreateWheelGameSlice")]
        public object CreateWheelGameSlice([FromBody] WheelGameSlice objWheelGameSlice)
        {
            object products = repo.CreateWheelGameSlice(objWheelGameSlice);
            return (products);
        }

        /// <summary>
        /// Delete Wheel game Mastter Details by wGlID
        /// </summary>
        /// <param name="wGlID"></param>
        /// <returns></returns>
        [HttpDelete("DeleteWheelGameSlice/{wGlID}")]
        public object DeleteWheelGameMaster(int wGlID)
        {
            object products = repo.DeleteWheelGameSlice(wGlID);
            return (products);
        }

        /// <summary>
        /// Get Wheel game Master Details by User Id
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetWheelGameMasterByUserId")]
        public object GetWheelGameMasterByUserId()
        {
            object products = repo.GetWheelGameMasterByUserId(userIdentity.UserId);
            //object products = repo.GetWheelGameMasterByUserId("4");
            return (products);
        }

        /// <summary>
        /// Get Wheel game Master Details by wGlID
        /// </summary>
        /// <param name="wGlID"></param>
        /// <returns></returns>
        [HttpGet("GetWheelGameMasterByWGlID/{wGlID}")]
        public object GetWheelGameMasterByWGlID(int wGlID)
        {
            object products = repo.GetWheelGameMasterByWGlID(wGlID);
            return (products);
        }

        /// <summary>
        /// Get Wheel game Slice Details by wGlID
        /// </summary>
        /// <param name="wGlID"></param>
        /// <returns></returns>
        [HttpGet("GetWheelSliceByWGlID/{wGlID}")]
        public object GetWheelSliceByWGlID(int wGlID)
        {
            object products = repo.GetWheelSliceByWGlID(wGlID);
            return (products);
        }

        /// <summary>
        /// Updating Wheel game Master Details
        /// </summary>
        /// <param name="wGlID"></param>
        /// <returns></returns>
        [HttpPost("UpdateWheelGameMaster")]
        public object UpdateWheelGameMaster([FromBody] WheelGameMaster objWheelGameMaster)
        {
            object products = repo.UpdateWheelGameMaster(objWheelGameMaster);
            return (products);
        }

        /// <summary>
        /// Updating Wheel game Slice Details
        /// </summary>
        /// <param name="WGSID"></param>
        /// <returns></returns>
        [HttpPost("UpdateWheelGameSlice")]
        public object UpdateWheelGameSlice([FromBody] WheelGameSlice objWheelGameSlice)
        {
            object products = repo.UpdateWheelGameSlice(objWheelGameSlice);
            return (products);
        }

        /// <summary>
        /// Create Wheel Game Master
        /// </summary>
        /// <returns></returns>
        [HttpPost("WheelGameMasterCreate")]
        public object WheelGameMasterCreate([FromBody] WheelGameCreate objWheelGameCreate)
        {
            object products = repo.WheelGameMasterCreate(objWheelGameCreate);
            return (products);
        }
    }
}
