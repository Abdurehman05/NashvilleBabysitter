using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Models.ViewModels
{
    public class ChildProfileViewModel
    {
        public Child child { get; set; }

        public List<UserProfile> Babysitters { get; set; }

        public UserProfile UserProfile { get; set; }
        public List<Babysit> Babysits { get; set; }

    }
}
