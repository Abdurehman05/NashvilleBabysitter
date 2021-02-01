using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(28)]
        public string FirebaseUserId { get; set; }
        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }
        [Required]
        [MaxLength(50)]
        public string FullName { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        [MaxLength(200)]
        public string Address { get; set; }
        [Required]
        [MaxLength(55)]
        public string Phone { get; set; }
        public DateTime CreateDateTime { get; set; }
        [MaxLength(500)]
        [DataType(DataType.ImageUrl)]
        public string ImageUrl { get; set; }
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }
        public int NeighborhoodId { get; set; }
        public Neighborhood Neighborhood { get; set; }


    }
}
