using Sparkle_Capstone.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sparkle_Capstone.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> Get()
        {
            return _context.Category.OrderBy(c => c.Name).ToList();
        }

        public void Add(Category category)
        {
            _context.Add(category);
            _context.SaveChanges();
        }
    }
}
