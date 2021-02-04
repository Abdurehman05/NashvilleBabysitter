using Microsoft.AspNetCore.Mvc;
using NashvilleBabysitter.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTypeController : ControllerBase
    {
        private IUserTypeRepository _userTypeRepo;
        public UserTypeController(IUserTypeRepository userTypeRepo)
        {
            _userTypeRepo = userTypeRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userTypeRepo.GetAll());
        }
    }
}

