using NashvilleBabysitter.Data;
using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Repositories
{
    public class UserTypeRepository : IUserTypeRepository
    {
        private readonly ApplicationDbContext _context;
        public UserTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<UserType> GetAll()
        {
            return _context.UserType.ToList();
        }
    }
}
