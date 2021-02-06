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
    public class ChildController : ControllerBase
    {
        private IChildRepository _childRepo;
        private IUserProfileRepository _repo;

        public ChildController(IChildRepository childRepo, IUserProfileRepository repo)
        {
            _childRepo = childRepo;
            _repo = repo;
        }

        [HttpPost("{id}")]
        public IActionResult Post(Child child)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id != child.UserProfileId)
            {
                return Unauthorized();
            }
            //child.UserProfileId = currentUser.Id;
            _childRepo.Add(child);
            return Ok(child);
        }

     
        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByParent(int id)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id != id)
            {
                return Unauthorized();
            }
            var children = _childRepo.GetChildrenByParentId(id);
            return Ok(children);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
