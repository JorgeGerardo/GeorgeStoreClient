import { Routes } from "@angular/router";
import { ProfilePageComponent } from "./profile-page.component";
import { AddressesComponent as AddressesComponent } from "./components/addresses/addresses.component";
import { CreateAddressComponent } from "./components/create-address/create-address.component";

export const routes: Routes = [
    {
        path: '',
        component: ProfilePageComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'address'}, //TODO: Change to information
            {path: 'address', component: AddressesComponent},
            {path: 'address/create', component: CreateAddressComponent},
        ]
    }
]

export default routes;