using TaskTracker.Core.Entities;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.Core.Interfaces
{
    public interface ISecurityService
    {
        Task<Security> Get(Guid id);
        Task<Security> Get(string userName, string passWord);
        Task Insert(Security item);
        Task<bool> Update(Security item);
        Task<bool> Delete(Guid id);
    }
}
