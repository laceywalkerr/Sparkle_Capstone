using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sparkle_Capstone
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
        public string Email { get; set; }

        // public List<Review> Review { get; set; }

    }
}