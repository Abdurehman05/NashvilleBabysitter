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
        List<Babysit> GetBabysitsByBabysitterId(int babysitterId);
        List<Babysit> GetUpcomingBabysitsByParentId(int parentId);
    }
}
