import { Routes } from "@angular/router";

import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserProfileV2Component } from "./user-profile-v2/user-profile-v2.component";
import { UserListComponent } from "./user-list/userlist.component";
import { SupplierListComponent } from "./supplier-list/supplier-list.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { SupplierDetailComponent } from "./supplier-list/supplier-detail/supplier-detail.component";
import { CustomerDetailComponent } from "./customer-list/customer-detail/customer-detail.component";
import { EmployeeDetailComponent } from "./employee-list/employee-detail/employee-detail.component";
import { CustomerEditComponent } from "./customer-list/customer-edit/customer-edit.component";

export const UserRoutes: Routes = [
  {
    path: "",
    redirectTo: "customer",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "customer",
        component: CustomerListComponent,
        children: [
          {
            path: "detail",
            component: CustomerDetailComponent,
          },
          {
            path: "edit",
            component: CustomerEditComponent,
          },
        ],
      },
      {
        path: "employee",
        component: EmployeeListComponent,
        children: [
          {
            path: "detail",
            component: EmployeeDetailComponent,
          },
        ],
      },
      {
        path: "supplier",
        component: SupplierListComponent,
        children: [
          {
            path: "detail",
            component: SupplierDetailComponent,
          },
        ],
      },
    ],
  },
];
