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

        [HttpGet("search")]
        public IActionResult Search(string p)
        {
            var reviews = _repo.Search(p);
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var reviewToDelete = _repo.GetById(id);

            if (reviewToDelete == null)
            {
                return NotFound();
            }

            _repo.Delete(reviewToDelete);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Review review)
        {
            var firebaseUser = ControllerUtils.GetCurrentUserProfile(_userRepo, User);

            var userProfile = review.UserProfileId;
            if (firebaseUser.Id != userProfile)
            {
                return NotFound();
            }

            if (id != review.Id)
            {
                return BadRequest();
            }

            _repo.Update(review);
            return Ok();
        }
    }
}