using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sparkle_Capstone.Controllers.Utils;
using Sparkle_Capstone.Models.ViewModels;
using Sparkle_Capstone.Repositories;

namespace Sparkle_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {

        private IReviewRepository _repo;
        private IUserProfileRepository _userRepo;

        public ReviewController(IReviewRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var reviews = _repo.Get();
            return Ok(reviews);
        }

        [HttpGet("getbyuserid")]
        public IActionResult GetByUserId()
        {
            var firebaseUser = ControllerUtils.GetCurrentUserProfile(_userRepo, User);
            var posts = _repo.GetByUserId(firebaseUser.Id);
            return Ok(posts);
        }

        [HttpGet("{reviewId}/{userId}")]
        public IActionResult GetById(int id)
        {
            var firebaseUser = ControllerUtils.GetCurrentUserProfile(_userRepo, User);
            var review = _repo.GetById(id);
            if (review == null)
            {
                return NotFound();
            }

            var reviewDetails = new ReviewDetails()
            {
                Review = review
                //ReactionCounts = reactionCounts
            };
            return Ok(reviewDetails);
        }

        [HttpPost]
        public IActionResult Post(Review review)
        {
            var currentUser = GetCurrentUserProfile();

            _repo.Add(review);
            return CreatedAtAction("Get", new { id = review.Id }, review);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}