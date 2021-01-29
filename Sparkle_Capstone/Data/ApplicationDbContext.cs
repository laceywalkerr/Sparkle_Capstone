using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Sparkle_Capstone.Models;

namespace Sparkle_Capstone.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Review> Review { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }

    }
    
}
