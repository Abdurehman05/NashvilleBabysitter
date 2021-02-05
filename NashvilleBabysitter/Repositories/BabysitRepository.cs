using Microsoft.EntityFrameworkCore;
using NashvilleBabysitter.Data;
using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Repositories
{
    public class BabysitRepository : IBabysitRepository
    {
        private ApplicationDbContext _context;

        public BabysitRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Babysit> GetUpcomingBabysitsByParentId(int id)
        {
            return _context.Babysit
                .Include(b => b.UserProfile)
                .Include(b => b.Child)
                .Include(b => b.BabysitStatus)
                .Where(b => b.Child.UserProfileId == id)
                .Where(b => b.BabysitStatusId == 1 || b.BabysitStatusId == 2)
                .OrderByDescending(b => b.Date)
                .ToList();

        }
    }
}
