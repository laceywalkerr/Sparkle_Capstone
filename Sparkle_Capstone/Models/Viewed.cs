using System.ComponentModel.DataAnnotations;

namespace Sparkle_Capstone
{
    public class Viewed
    {
        public int Id { get; set; }
        public int ReviewId { get; set; }
        public Review Review { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}