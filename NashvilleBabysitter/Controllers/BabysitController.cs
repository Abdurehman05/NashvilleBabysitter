using Microsoft.AspNetCore.Mvc;
using NashvilleBabysitter.Models;
using NashvilleBabysitter.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BabysitController : ControllerBase
    {
        private IBabysitRepository _babysitRepo;
        private IUserProfileRepository _repo;

        public BabysitController(IBabysitRepository babysitRepo, IUserProfileRepository repo)
        {
            _babysitRepo = babysitRepo;
            _repo = repo;
        }

        [HttpGet("getbyparent/{id}")]
        public IActionResult GetBabysitsByParentId(int id)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id != id)
            {
                return Unauthorized();
            }

            try
            {
                var babysits = _babysitRepo.GetUpcomingBabysitsByParentId(id);
                return Ok(babysits);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }




        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
