using Microsoft.AspNetCore.Mvc;
using NashvilleBabysitter.Models;
using NashvilleBabysitter.Models.ViewModels;
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
        private IChildRepository _childRepo;


        public BabysitController(IBabysitRepository babysitRepo, IUserProfileRepository repo, IChildRepository childRepo)
        {
            _babysitRepo = babysitRepo;
            _repo = repo;
            _childRepo = childRepo;
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

        [HttpPost("{id}")]
        public IActionResult Post(Babysit babysit)
        {
            var currentUser = GetCurrentUserProfile();
            var child = _childRepo.GetChildrenById(babysit.ChildId);
            if (currentUser.Id != child.UserProfileId)
            {
                return Unauthorized();
            }
            babysit.Duration = 0;
            babysit.BabysitStatusId = 1;

            _babysitRepo.AddBabysit(babysit);
            return Ok(babysit);
        }

        [HttpPut("confirm/{id}")]
        public IActionResult Confirm(Babysit babysit)
        {

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != babysit.UserProfileId)
            {
                return Unauthorized();
            }
            babysit.Duration = 0;
            babysit.BabysitStatusId = 2;

            _babysitRepo.Update(babysit);
            return Ok();
        }

        [HttpPut("deny/{id}")]
        public IActionResult Deny(Babysit babysit)
        {

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != babysit.UserProfileId)
            {
                return Unauthorized();
            }
            babysit.Duration = 0;
            babysit.BabysitStatusId = 4;

            _babysitRepo.Update(babysit);
            return Ok();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
