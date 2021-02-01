using Microsoft.EntityFrameworkCore;
using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<Babysit> Babysit { get; set; }
        public DbSet<BabysitStatus> BabysitStatus { get; set; }
        public DbSet<Child> Child { get; set; }
        public DbSet<Neighborhood> Neighborhood { get; set; }







    }
}
