using TaskTracker.Core.Entities;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.Core.Interfaces
{
    public interface ISecurityRepository
    {
        Task<Security> GetByEmail(string email);
        Task<Security> Get(Guid id);
        Task<Security> Get(string userName, string password);
        Task Insert(Security item);
        Task<bool> Update(Security item);
        Task<bool> Delete(Guid id);
    }
}
