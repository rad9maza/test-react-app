import { makeObservable } from "mobx";

/**
 * Interface for user
 */
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * variable with default user to seed registredUsers list
 */
const seedUser: IUser = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@gmail.com",
  password: "12345",
};

/**
 * mobx store witch contains all login logic and sore users in localStorage
 */
export default class Store {
  registredUsers: IUser[] = [];
  user = {} as IUser;
  isAuthenticated = false;

  constructor() {
    makeObservable(this);
    this.registredUsers = JSON.parse(
      localStorage.getItem("registredUsers") || "[]",
    );
    if (this.registredUsers?.length === 0) {
      this.registredUsers.push(seedUser);
      localStorage.setItem(
        "registredUsers",
        JSON.stringify(this.registredUsers),
      );
    }

    this.user = JSON.parse(localStorage.getItem("user") || "{}");
    this.isAuthenticated =
      JSON.parse(localStorage.getItem("isAuthenticated") || "false") === true;
  }

  setUser(user: IUser) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  setIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
    localStorage.setItem(
      "isAuthenticated",
      JSON.stringify(this.isAuthenticated),
    );
  }

  login(email: string, password: string): boolean {
    let existedUser = this.registredUsers.find(
      (user) =>
        user.email === email?.toLowerCase() && user.password === password,
    );
    if (existedUser) {
      this.setUser(existedUser);
      this.setIsAuthenticated(true);
    }
    return this.isAuthenticated;
  }

  register(user: IUser): boolean {
    console.log("user", user);
    console.log("!!user.email", !!user.email);
    console.log(
      `!this.registredUsers.some(
        (user) => user.email === user?.email?.toLowerCase(),
      )`,
      !this.registredUsers.some(
        (user) => user.email === user?.email?.toLowerCase(),
      ),
    );
    if (
      !!user.email &&
      !!user.password &&
      !!user.firstName &&
      !!user.lastName &&
      !this.registredUsers.some(
        (regUser) => regUser.email === user?.email?.toLowerCase(),
      )
    ) {
      console.log("is");
      this.registredUsers.push(user);
      localStorage.setItem(
        "registredUsers",
        JSON.stringify(this.registredUsers),
      );
      return true;
    }
    return false;
  }

  logout(): void {
    this.setUser({} as IUser);
    this.setIsAuthenticated(false);
  }
}
