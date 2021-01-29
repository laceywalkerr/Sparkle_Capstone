using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sparkle_Capstone
{
    public class Review
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string NameOfProduct { get; set; }

        [Required]
        public string Content { get; set; }

        [MaxLength(255)]
        [DataType(DataType.ImageUrl)]
        public string ImageLocation { get; set; }
        public DateTime? PublishDateTime { get; set; }
        public int Rating { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

    }
}