using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sparkle_Capstone.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> Get();
        void Add(Category category);
    }
}
