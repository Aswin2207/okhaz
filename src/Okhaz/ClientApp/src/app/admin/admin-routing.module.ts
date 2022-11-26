import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";

export const adminRouteConfig: Routes = [
  {
    path: "",
    component: AdminHomeComponent,
    children: [
      {
        path: "",
        redirectTo: "adminHome",
        pathMatch: "full",
      },
      { path: "adminHome", component: AdminHomeComponent },
      { path: "userManagement", component: ManageUsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRouteConfig)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
