using NashvilleBabysitter.Data;
using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Repositories
{
    public class ChildRepository : IChildRepository
    {
        private ApplicationDbContext _context;
        public ChildRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void Add(Child child)
        {
            _context.Add(child);
            _context.SaveChanges();
        }

        public Child GetChildrenById(int id)
        {
            return _context.Child
                .Where(c => c.Id == id)
                .FirstOrDefault();
        }
        public List<Child> GetChildrenByParentId(int id)
        {
            return _context.Child
                .Where(c => c.UserProfileId == id)
                .ToList();
        }
    }
}
