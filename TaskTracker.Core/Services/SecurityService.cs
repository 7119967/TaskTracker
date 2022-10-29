using TaskTracker.Core.Entities;
using TaskTracker.Core.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.Core.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly ISecurityRepository _securityRepository;

        public SecurityService(ISecurityRepository userRepository)
        {
            _securityRepository = userRepository;
        }

        public async Task<Security> Get(Guid id)
        {
            return await _securityRepository.Get(id);
        }

        public async Task<Security> Get(string userName, string password)
        {
            var res = await _securityRepository.GetByEmail(userName);

            var validate = !BCrypt.Net.BCrypt.Verify(password, res.Password);
            if (validate)
            {
                throw new System.Exception("Error user or password");

            }

            var user = await _securityRepository.Get(userName, res.Password);
            return user;
        }

        private async Task<Security> Get(string email)
        {
            var res = await _securityRepository.GetByEmail(email);
            return res;
        }

        public async Task Insert(Security item)
        {
            var validateUser = await Get(item.Email);

            if (validateUser != null)
            {
                throw new System.Exception("User exit");
            }

            item.Password = BCrypt.Net.BCrypt.HashPassword(item.Password);
            await _securityRepository.Insert(item);
        }

        public async Task<bool> Update(Security item)
        {
            if (!string.IsNullOrEmpty(item.Password))
            {
                item.Password = BCrypt.Net.BCrypt.HashPassword(item.Password);
            }

            var user = await _securityRepository.Get(item.Id);

            if (user == null)
            {
                throw new System.Exception("User not exit");
            }

            return await _securityRepository.Update(user);
        }

        public async Task<bool> Delete(Guid id)
        {
            return await _securityRepository.Delete(id);
        }

    }
}
