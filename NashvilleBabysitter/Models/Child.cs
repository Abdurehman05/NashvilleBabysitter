using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Models
{
    public class Child
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(55)]
        public string Name { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        [MaxLength(500)]
        [DataType(DataType.ImageUrl)]
        public string ImageUrl { get; set; }
        [Required]
        public int Age { get; set; }
        [MaxLength(255)]
        public string Notes { get; set; }

    }
}
