const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export interface ApiUser {
  id: string;
  email: string;
  created_at: string;
}

export interface LoginResponse {
  token: string;
  user: ApiUser;
}

export interface RegisterResponse {
  message: string;
  user: ApiUser;
}

export interface ResumeMeta {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface SaveResumeResponse {
  message: string;
  resume: ResumeMeta;
}

export interface GetResumeResponse extends ResumeMeta {
  data: unknown;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null,
  secretKey?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (secretKey) {
    headers["X-Secret-Key"] = secretKey;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || data.message || `Request failed with status ${response.status}`;
    throw new ApiError(errorMsg, response.status);
  }

  return data as T;
}

export const api = {
  auth: {
    login: (email: string, password: string): Promise<LoginResponse> =>
      request<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    register: (email: string, password: string): Promise<RegisterResponse> =>
      request<RegisterResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
  },

  resumes: {
    save: (
      title: string,
      rawJson: unknown,
      token: string,
      secretKey: string
    ): Promise<SaveResumeResponse> =>
      request<SaveResumeResponse>(
        "/resumes",
        {
          method: "POST",
          body: JSON.stringify({
            title: title || "رزومه من",
            raw_json: rawJson,
            secret_key: secretKey,
          }),
        },
        token,
        secretKey
      ),

    list: (token: string): Promise<{ resumes: ResumeMeta[] }> =>
      request<{ resumes: ResumeMeta[] }>("/resumes", { method: "GET" }, token),

    get: (
      id: string,
      token: string,
      secretKey: string
    ): Promise<GetResumeResponse> =>
      request<GetResumeResponse>(
        `/resumes/${id}`,
        { method: "GET" },
        token,
        secretKey
      ),
  },
};
