using System.ComponentModel.DataAnnotations;

namespace Sparkle_Capstone
{
    public class Category
    {
        public int Id { get; set; }

        [MaxLength(50)]
        [Required]
        public string Name { get; set; }
    }
}