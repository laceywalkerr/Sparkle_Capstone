using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Sparkle_Capstone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Sparkle_Capstone.Models;
using Sparkle_Capstone.Repositories;

namespace Sparkle_Capstone.Controllers.Utils
{
    public class ControllerUtils
    {
        public static UserProfile GetCurrentUserProfile(IUserProfileRepository _userProfileRepository, ClaimsPrincipal user)
        {
            var firebaseUserId = user.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}