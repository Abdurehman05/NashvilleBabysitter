using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Models.ViewModels
{
    public class BabysitterProfileViewModel
    {
        public UserProfile Babysitter { get; set; }
        public List<Babysit> Babysits { get; set; }
        public List<UserProfile> Parents { get; set; }
        public List<Child> Children { get; set; }
        public string BabysitTime { get; set; }
    }
}
