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



        [HttpGet("{id}")]
        public IActionResult GetBabysitsById(int id)
        {
            var currentUser = GetCurrentUserProfile();

            //if (currentUser.Id != id)
            //{
            //    return Unauthorized();
            //}

            var babysits = _babysitRepo.GetBabysitById(id);
            return Ok(babysits);

        }

        [HttpGet("getbyparent/{id}")]
        public IActionResult GetBabysitsByParentId(int id)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id != id)
            {
                return Unauthorized();
            }

            var babysits = _babysitRepo.GetUpcomingBabysitsByParentId(id);
            return Ok(babysits);

        }

        [HttpGet("getbybabysitter/{id}")]
        public IActionResult GetBabysitsByBabysitterId(int id)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id != id)
            {
                return Unauthorized();
            }

            var babysits = _babysitRepo.GetAllBabysitsByBabysitterId(id);
            return Ok(babysits);

        }

        [HttpPost]
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

        [HttpPut("complete/{id}")]
        public IActionResult Complete(Babysit babysit)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != babysit.UserProfileId)
            {
                return Unauthorized();
            }
            babysit.BabysitStatusId = 3;
            _babysitRepo.Update(babysit);
            return Ok();
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


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var babysit = _babysitRepo.GetBabysitById(id);
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != babysit.UserProfileId)
            {
                return Unauthorized();
            }

            _babysitRepo.Delete(id);
            return Ok();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
