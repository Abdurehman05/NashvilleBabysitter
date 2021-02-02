using NashvilleBabysitter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleBabysitter.Repositories
{
    public interface IChildRepository
    {
        void Add(Child Child);
        List<Child> GetChildrenById(int id);
        List<Child> GetChildrenByParentId(int id);
    }
}
