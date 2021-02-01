using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sparkle_Capstone.Models.ViewModels;
using Sparkle_Capstone.Repositories;

namespace Sparkle_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {

        private IReviewRepository _repo;

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

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
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
    }
}