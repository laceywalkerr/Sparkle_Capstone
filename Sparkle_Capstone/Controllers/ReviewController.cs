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

        public ReviewController(IReviewRepository repo, IUserProfileRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
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
            var reviews = _repo.GetByUserId(firebaseUser.Id);
            return Ok(reviews);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var review = _repo.GetById(id);
            if (review == null)
            {
                return NotFound();
            }

            //var reactionCounts = _repo.GetReactionCounts(id);
            var reviewDetails = new ReviewDetails()
            {
                Review = review,
                // ReactionCounts = reactionCounts
            };
            return Ok(reviewDetails);
        }

        // [HttpGet("{reviewId}/{userId}")]
        // public IActionResult GetById(int id)
        // {
        //     var firebaseUser = ControllerUtils.GetCurrentUserProfile(_userRepo, User);
        //     var reviews = _repo.GetByUserId(firebaseUser.Id);
        //     var review = _repo.GetById(id);
        //     if (review == null)
        //     {
        //         return NotFound();
        //     }

        //     var reviewDetails = new ReviewDetails()
        //     {
        //         Review = review
        //     };
        //     return Ok(reviewDetails);
        // }

        //[HttpPost]
        //public IActionResult Post(Review review)
        //{
        //    var currentUser = GetCurrentUserProfile();

        //    _repo.Add(review);
        //    return CreatedAtAction("Get", new { id = review.Id }, review);
        //}

        [HttpPost]
        public IActionResult Add(Review review)
        {
            _repo.Add(review);
            return Ok(review);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}