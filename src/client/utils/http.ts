import Todo from "@client/models/Todo";

namespace BackEndRouter {
  enum BASE_URL {
    PRODUCTION = "https://bootstrap-todo-demo.herokuapp.com",
    DEVELOPMENT = "/api",
  }

  export const getBaseUrl = () => {
    switch (process.env.NODE_ENV) {
      case "production":
        return BASE_URL.PRODUCTION;
      case "development":
        return BASE_URL.DEVELOPMENT;
      default:
        return BASE_URL.DEVELOPMENT;
    }
  };

  export namespace RequestRouter {
    const BASE_URL = `${getBaseUrl()}`;

    const validateResponse = (response: Response) => {
      if (response.status !== 200) throw new Error("request failed");
      return response.json();
    };

    const list = <T>(path: string): Promise<T[]> => {
      return fetch(BASE_URL + path).then(validateResponse);
    };

    const create = <T>(path: string, body: T): Promise<T> => {
      return fetch(BASE_URL + path, {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(body),
      }).then(validateResponse);
    };
    const read = (id: number) => {};

    const update = <T>(path: string, id: number, body: T): Promise<T> => {
      return fetch(`${BASE_URL + path}/${id}`, {
        method: "PUT",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(body),
      }).then(validateResponse);
    };

    const remove = <T>(path: string, id: number): Promise<T> => {
      return fetch(`${BASE_URL + path}/${id}`, {
        method: "DELETE",
      }).then(validateResponse);
    };

    export const EndPoints = {
      LIST: list,
      CREATE: create,
      READ: read,
      UPDATE: update,
      DELETE: remove,
    };
  }
}

export default BackEndRouter;
