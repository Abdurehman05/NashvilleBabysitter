using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Models
{
    public class Babysit
    {
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]

        public DateTime Date { get; set; }
        public int Duration { get; set; }
        public int ChildId { get; set; }
        public Child Child { get; set; }
        public int BabysitStatusId { get; set; }
        public BabysitStatus BabysitStatus { get; set; }
    }
}
