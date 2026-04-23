import { Routes } from "@angular/router";
import { OrderPageComponent } from "@order/order-page.component";
import { OrderListComponent } from "@order/components/order-list/order-list.component"
import { NotFoundComponent } from "@core/components/not-found/not-found.component";
import { OrderViewComponent } from "@order/components/order-view/order-view.component";

export const routes: Routes = [
    {
        path: '', component: OrderPageComponent,
        children: [
            { path: '', component:  OrderListComponent},
            { path: ':id', component:  OrderViewComponent},
            { path: '**', component: NotFoundComponent },
        ]
    }
]

export default routes;