import { API_ENDPOINT } from "@/types/Constants";
import { EPriority } from "@/types/EPriority";
import { EStatus } from "@/types/EStatus";
import { IAPIResponse } from "@/types/IAPIResponse";
import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = API_ENDPOINT;

export async function GetTasks(
  token: string,
  page: number = 1,
  status: string = "",
  priority: string = ""
) {
  const params = {
    page,
    status: status ? EStatus[status as any] : undefined,
    priority: priority ? EPriority[priority as any] : undefined,
  };
  
  const querystring = qs.stringify(params);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.get(`/api/tasks?${querystring}`, { headers });
    if (res.status === 200) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: "Cannot load the tasks",
      };
    }
  } catch {
    return {
      success: false,
      message: "Error loading tasks",
    };
  }
}

export async function GetTask(token: string, id: number) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.get(`/api/tasks/${id}`, { headers });
    if (res.status === 200) {
      return {
        success: true,
        data: res.data,
      };
    } else if (res.status === 404) {
      return {
        success: false,
        message: "Task not found",
      };
    } else {
      return {
        success: false,
        message: "Cannot load the task",
      };
    }
  } catch {
    return {
      success: false,
      message: "Error when loading the task",
    };
  }
}

export async function CreateTask(token: string, data: any) {
  const json = JSON.stringify(data);

  let config = {
    method: "post",
    url: `/api/tasks`,
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: json,
  };

  try {
    const res = await axios.request(config);

    if (res.status === 200) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: res.statusText,
      };
    }
  } catch {
    return {
      success: false,
      message: "Cannot create the task",
    };
  }
}

export async function UpdateTask(token: string, id: number, data: any) {
  const json = JSON.stringify(data);

  let config = {
    method: "put",
    url: `/api/tasks/${id}`,
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: json,
  };

  try {
    const res = await axios.request(config);

    if (res.status === 200) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.statusText,
      };
    }
  } catch {
    return {
      success: false,
      message: "Cannot update the task",
    };
  }
}

export async function DeleteTask(token: string, id: number) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.delete(`/api/tasks/${id}`, { headers });
    if (res.status === 204) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: "Cannot delete the task",
      };
    }
  } catch {
    return {
      success: false,
      message: "Error deleting task",
    };
  }
}

export async function GetProgress(token: string): Promise<IAPIResponse> {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await axios.get(`/api/tasks/progress`, { headers });
    if (res.status === 200) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: "Cannot load the progress",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Error loading the progress",
    };
  }
}

export async function GetToken(
  username: string,
  password: string
): Promise<IAPIResponse> {
  const obj = {
    username,
    password,
  };

  try {
    const res = await axios.post(`/api/user/token`, {
      ...obj,
    });

    if (res.status === 200) {
      return {
        success: true,
        data: { token: res.data },
      };
    } else {
      return {
        success: false,
        data: "Cannot generate token",
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message:
        err?.response?.status === 401
          ? "Invalid Login Credentials"
          : "Failure on authentication",
    };
  }
}
