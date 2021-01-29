using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Sparkle_Capstone.Models;

namespace Sparkle_Capstone.Repositories
{
    interface IUserProfileRepository
    {

        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}
