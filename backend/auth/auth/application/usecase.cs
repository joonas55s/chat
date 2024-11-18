public interface UseCase<Input,T> {
    Task<T> Handle(Input input);
}

