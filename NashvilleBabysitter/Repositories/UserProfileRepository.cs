﻿using Microsoft.EntityFrameworkCore;
using NashvilleBabysitter.Data;
using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .Include(up => up.Neighborhood)
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);

        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
    }
}
