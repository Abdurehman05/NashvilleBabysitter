using Microsoft.AspNetCore.Http;
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
    public class UserProfileController : ControllerBase
    {
        private IUserProfileRepository _repo;
        private IChildRepository _childRepo;
        private IBabysitRepository _babysitRepo;
        public UserProfileController(IUserProfileRepository repo, IChildRepository childRepo, IBabysitRepository babysitRepo)
        {
            _repo = repo;
            _childRepo = childRepo;
            _babysitRepo = babysitRepo;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_repo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("/parent/{id}")]
        public IActionResult GetParentById(int id)
        {
            var currentUser = GetCurrentUserProfile();
            UserProfile parent = _repo.GetParentById(id);

            if (currentUser.Id != id)
            {
                return Unauthorized();
            }
            List<Child> children = _childRepo.GetChildrenByParentId(parent.Id);
            List<UserProfile> babysitters = _repo.GetBabysitterByNeighborhoodId(parent.NeighborhoodId);
            List<Babysit> babysits = _babysitRepo.GetUpcomingBabysitsByParentId(parent.Id);

            ParentProfileViewModel vm = new ParentProfileViewModel()
            {
                UserProfile = parent,
                Children = children,
                Babysitters = babysitters,
                Babysits = babysits
            };

            return Ok(vm);
        }

        [HttpGet("/babysitter/{id}")]
        public IActionResult GetBabySitterById(int id)
        {
            var currentUser = GetCurrentUserProfile();
            UserProfile babysitter = _repo.GetBabysitterById(id);

            if (currentUser.Id != id)
            {
                return Unauthorized();
            }

            List<Babysit> babysits = _babysitRepo.GetBabysitsByBabysitterId(babysitter.Id);
            List<UserProfile> parents = _repo.GetAllParents();
            List<Child> parentChildren = new List<Child>();

            foreach (UserProfile parent in parents)
            {
                List<Child> children = _childRepo.GetChildrenByParentId(parent.Id);
                parentChildren.ForEach(child => parentChildren.Add(child));
            };

            int seconds = babysits.Sum(babysit => babysit.Duration);
            TimeSpan time = TimeSpan.FromSeconds(seconds);

            BabysitterProfileViewModel vm = new BabysitterProfileViewModel()
            {
                Babysitter = babysitter,
                Babysits = babysits,
                ParentChildren = parentChildren,
                Parents = parents,
                BabysitTime = $"{time.Hours} Hour {time.Minutes} minutes"

            };

            return Ok(vm);
        }

        [HttpGet("/babysitters/{neighborhoodId}")]
        public IActionResult GetBabySitterByNeighborhoodId(int neighborhoodId)
        {
            return Ok(_repo.GetBabysitterByNeighborhoodId(neighborhoodId));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            _repo.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
