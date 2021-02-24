using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Models.ViewModels
{
    public class ScheduleBabysitViewModel
    {
        public UserProfile Babysitter { get; set; }
        public Babysit Babysit { get; set; }
        public List<Child> Children { get; set; }
      
    }
}
