class ApiError extends Error {
  public readonly status: number;
  public readonly errors: unknown[] = [];

  constructor(status: number, message: string, errors = []) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  public static UnauthorizedError() {
    return new ApiError(401, "User unauthorized");
  }

  public static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
