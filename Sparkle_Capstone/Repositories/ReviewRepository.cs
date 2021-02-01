﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sparkle_Capstone.Data;
using Sparkle_Capstone.Models.ViewModels;

namespace Sparkle_Capstone.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private ApplicationDbContext _context;

        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<ReviewSummary> Get()
        {
            return _context.Review
                .Include(r => r.Category)
                .Where(r => r.PublishDateTime <= DateTime.Now)
                .OrderByDescending(r => r.PublishDateTime)
                .Select(r => new ReviewSummary()
                {
                    Id = r.Id,
                        ImageLocation = r.ImageLocation,
                        UserId = r.UserProfileId,
                        DisplayName = r.UserProfile.DisplayName,
                        PublishDateTime = r.PublishDateTime,
                        Category = r.Category
                })
                .ToList();
        }

        public Review GetById(int id)
        {
            return _context.Review
                .Include(r => r.UserProfile)
                .Include(r => r.Category)
                .Where(r => r.Id == id)
                .FirstOrDefault();
        }

        public List<ReviewSummary> GetByUserId(int userId)
        {
            return _context.Review
                .Include(r => r.Category)
                .Where(r => r.UserProfileId == userId)
                .Select(r => new ReviewSummary()
                {
                    Id = r.Id,
                    ImageLocation = r.ImageLocation,
                    UserId = r.UserProfileId,
                    DisplayName = r.UserProfile.DisplayName,
                    PublishDateTime = r.PublishDateTime,
                    Category = r.Category
                })
                .ToList();
        }

        public List<Likes> GetLikeCounts(int postId)
        {
            throw new NotImplementedException();
        }

        public List<Viewed> GetViewCounts(int postId)
        {
            //    return _context.Reaction
            //        .Select(r => new ViewCount()
            //        {
            //            Reaction = r,
            //            Count = r.ReviewReactions.Count(pr => pr.ReviewId == postId)
            //        })
            //        .ToList();
            throw new NotImplementedException();
        }

    }

}