using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Repositories
{
    public interface IBabysitRepository
    {
        List<Babysit> GetUpcomingBabysitsByParentId(int parentId);
    }
}
