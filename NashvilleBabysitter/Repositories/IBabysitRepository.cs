using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Repositories
{
    public interface IBabysitRepository
    {
        void AddBabysit(Babysit babysit);
        void Delete(int id);
        List<Babysit> GetAllBabysitsByBabysitterId(int babysitterId);
        Babysit GetBabysitById(int id);
        List<Babysit> GetPendingBabysitsByBabysitterId(int babysitterId);
        List<Babysit> GetUpcomingBabysitsByParentId(int parentId);
        void Update(Babysit babysit);
    }
}
