import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserGroupsComponent } from "./user-groups/user-groups.component";
import { UserPermissionComponent } from "./user-permission/user-permission.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { GroupManagementComponent } from './groups/group-management/group-management.component';
import { GroupDetailsComponent } from './groups/group-details/group-details.component';
import { GroupPermissionDetailsComponent } from './groups/group-permission-details/group-permission-details.component';
import { GroupOrganizationDetailsComponent } from './groups/group-organization-details/group-organization-details.component';
import { GroupUserManagementComponent } from './groups/group-user-management/group-user-management.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    ManageUsersComponent,
    UserDetailsComponent,
    UserGroupsComponent,
    UserPermissionComponent,
    GroupManagementComponent,
    GroupDetailsComponent,
    GroupPermissionDetailsComponent,
    GroupOrganizationDetailsComponent,
    GroupUserManagementComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
