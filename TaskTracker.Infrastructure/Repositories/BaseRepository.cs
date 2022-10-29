using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Linq.Expressions;
using TaskTracker.Core.Entities;
using TaskTracker.Core.Interfaces;
using TaskTracker.Infrastructure.Data;
using TaskTracker.Infrastructure.DataExtensions;
using Task = System.Threading.Tasks.Task;

namespace TaskTracker.Infrastructure.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly DatabaseContext _context;
        protected readonly DbSet<T> _entities;

        public BaseRepository(DatabaseContext context)
        {
            _context = context;
            _entities = context.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return _entities.AsEnumerable();
        }

        public IEnumerable<T> GetAll(params string[] includedProperties)
        {
            IQueryable<T> result = this.All();
            foreach (var item in includedProperties)
            {
                result = result.Include(item);
            }

            return result.AsEnumerable();
        }


        public IEnumerable<T> Find(Expression<Func<T, bool>> condition, params string[] includedProperties)
        {
            IQueryable<T> result = this.Find(condition);
            foreach (var item in includedProperties)
            {
                result = result.Include(item);
            }

            return result.AsEnumerable();
        }

        public async Task<T> GetById(Guid id)
        {
            return await _entities.FindAsync(id);
        }

        public async Task Add(T entity)
        {
            await _entities.AddAsync(entity);
        }

        public void Update(T entity)
        {
            _entities.Update(entity);
        }

        public async Task Delete(Guid id)
        {
            T entity = await GetById(id);
            _entities.Remove(entity);
        }


        private IQueryable<T> Find(Expression<Func<T, bool>> condition)
        {
            return _entities.Where(condition);
        }

        private IQueryable<T> All()
        {
            return _entities;
        }

        public IEnumerable<T> ExecuteProcedure<T>(string storeProcedure, SqlParameter[] parameters = null) where T : class, new()
        {
            IEnumerable<T> response = new List<T>();
            DataSet data = ExecuteProcedure(storeProcedure, parameters);

            if (data != null && data.Tables.Count > 0)
            {
                response = data.Tables[0].DataTableToList<T>();
                response = null;
            }

            return response;
        }

        public DataSet ExecuteProcedure(string storeProcedure, SqlParameter[] parameters = null)
        {
            DataSet data = new DataSet();

            using (SqlConnection connection = new SqlConnection(""))
            {
                using (SqlCommand command = new SqlCommand(storeProcedure, connection))
                {
                    using (SqlDataAdapter adapter = new SqlDataAdapter())
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        if (parameters != null)
                        {
                            command.Parameters.AddRange(parameters);
                        }

                        connection.Open();

                        adapter.SelectCommand = command;
                        adapter.Fill(data);
                    }
                }
            }

            return data;
        }
    }
}