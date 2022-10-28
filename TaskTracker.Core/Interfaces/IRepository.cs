using System.Linq.Expressions;
using TaskTracker.Core.Entities;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.Core.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        IEnumerable<T> GetAll();
        Task<T> GetById(int id);
        Task Add(T entity);
        void Update(T entity);
        Task Delete(int id);

        IEnumerable<T> Find(Expression<Func<T, bool>> condition, params string[] includedProperties);
        IEnumerable<T> GetAll(params string[] includedProperties);
    }
}
