namespace TaskTracker.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IProjectRepository ProjectRepository { get; }
        ITaskRepository TaskRepository { get; }
        void Commit();
        Task CommitAsync();

    }
}
