import { RouterModule, Routes } from "@angular/router";
import { ReportSalesComponent } from "./components/report-sales/report-sales.component";
import { IRoleAccount } from "../interfaces/role";
import { ReportUrl } from "./report.url";
import { ReportProductsalesComponent } from "./components/report-productsales/report-productsales.component";

const RouteLists: Routes = [
    { path: '', redirectTo: ReportUrl.ReportSales, pathMatch: 'full' },
    { 
        path: ReportUrl.ReportSales, 
        component: ReportSalesComponent,
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: ReportUrl.ReportProductSales,
        component: ReportProductsalesComponent ,
        data: { role: [IRoleAccount.Admin] }
    },
];
export const ReportRouting = RouterModule.forChild(RouteLists);