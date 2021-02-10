using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Repositories
{
    public interface IUserProfileRepository
    {

        void Add(UserProfile userProfile);
        List<UserProfile> GetAllParents();
        UserProfile GetBabysitterById(int id);
        List<UserProfile> GetBabysitterByNeighborhoodId(int neighborhoodId);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetParentById(int id);
        List<UserProfile> GetParentsByNeighborhoodId(int neighborhoodId);
    }
}
