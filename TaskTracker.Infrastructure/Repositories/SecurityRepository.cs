using Microsoft.EntityFrameworkCore;
using TaskTracker.Core.Entities;
using TaskTracker.Core.Interfaces;
using TaskTracker.Infrastructure.Data;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.Infrastructure.Repositories
{
    public class SecurityRepository : ISecurityRepository
    {
        private readonly DatabaseContext _dbContext;

        public SecurityRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<Security> Get(Guid id)
        {
            var response = await _dbContext.Securities.FirstOrDefaultAsync(x => x.Id == id);
            return response;
        }


        public async Task<Security> Get(string userName, string password)
        {
            var response = await _dbContext.Securities.FirstOrDefaultAsync(x => x.Email == userName && x.Password == password);
            return response;
        }

        public async Task<Security> GetByEmail(string email)
        {
            var response = await _dbContext.Securities.FirstOrDefaultAsync(x => x.Email == email);
            return response;
        }


        public async Task Insert(Security item)
        {
            _dbContext.Securities.Add(item);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> Update(Security item)
        {
            var current = await Get(item.Id);
            _dbContext.Securities.Update(item);

            int rowAfected = await _dbContext.SaveChangesAsync();
            return rowAfected > 0;
        }

        public async Task<bool> Delete(Guid id)
        {
            var current = await Get(id);
            _dbContext.Securities.Remove(current);

            int rowAfected = await _dbContext.SaveChangesAsync();
            return rowAfected > 0;
        }
    }
}
