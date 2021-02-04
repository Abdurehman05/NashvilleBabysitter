using NashvilleBabysitter.Data;
using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Repositories
{
    public class NeighborhoodRepository : INeighborhoodRepository
    {
        private readonly ApplicationDbContext _context;
        public NeighborhoodRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Neighborhood> GetAll()
        {
            return _context.Neighborhood.ToList();
        }
    }
}
