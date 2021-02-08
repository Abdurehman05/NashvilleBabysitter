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

        [HttpPost]
        public IActionResult Post(Babysit babysit)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != babysit.Child.UserProfileId)
            {
                return Unauthorized();
            }
            UserProfile babysitter = _repo.GetBabysitterById(babysit.UserProfileId);
            ScheduleBabysitViewModel vm = new ScheduleBabysitViewModel()
            {
                Babysit = new Babysit()
                {
                    UserProfileId = babysitter.Id,
                    BabysitStatusId = 1
                    
                },
                Babysitter = babysitter,
                Children = _childRepo.GetChildrenByParentId(currentUser.Id)
            };
            babysit.Child.UserProfileId = currentUser.Id;
            babysit.Duration = 0;
            babysit.BabysitStatusId = 1;
            _babysitRepo.AddBabysit(babysit);
            return Ok(vm);
        }



        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
