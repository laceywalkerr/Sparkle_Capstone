using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sparkle_Capstone.Models.ViewModels;

namespace Sparkle_Capstone.Repositories
{
    public interface IReviewRepository
    {
        List<ReviewSummary> Get();
        Review GetById(int id);
        List<ReviewSummary> GetByUserId(int userId);
        List<Viewed> GetViewCounts(int reivewId);
        List<Likes> GetLikeCounts(int reviewId);
        void Add(Review review);
        void Delete(Review review);
        void Update(Review review);
        List<ReviewSummary> Search(string p);
    }
}