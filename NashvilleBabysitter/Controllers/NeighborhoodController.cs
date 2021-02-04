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
    public class NeighborhoodController : ControllerBase
    {
        private INeighborhoodRepository _neighborhoodRepo;
        public NeighborhoodController(INeighborhoodRepository neighborhoodRepo)
        {
            _neighborhoodRepo = neighborhoodRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_neighborhoodRepo.GetAll());
        }
    }
}
