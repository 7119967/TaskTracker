namespace TaskTracker.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IProjectRepository ProjectRepository { get; }

        void Commit();
        Task CommitAsync();

    }
}
