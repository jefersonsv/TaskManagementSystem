namespace TMS.Domain.Constants
{
    public static class Messages
    {
        public const string TaskNotFound = "Task not found";
        public const string UnexpectedError = "An unexpected error occurred";
        public const string MustProvideTaskTitle = "You must provide the task title";
        public const string TitleShouldBe256 = "The title should maximum of 256 characters";
        public const string DescriptionShouldBe1024 = "The description should maximum of 1024 characters";
        public const string MustProvideTaskDescription = "You must provide the task description";
        public const string MustProvideTaskDate = "You must provide the task date";
        public const string MustProvideTaskPriority = "You must provide the task priority";
        public const string MustProvideTaskStatus = "You must provide the task status";
        public const string InvalidTaskPriority = "Task priority is invalid";
        public const string InvalidTaskStatus = "Task status is invalid";
    }
}
