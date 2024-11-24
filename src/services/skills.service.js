import { http } from "./config";

export const skillsService = {
  layDanhSachSkills: () => {
    return http.get("/skill");
  },
};
