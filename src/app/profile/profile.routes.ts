import { Routes } from '@angular/router';
import { ProfilePageComponent } from '@profile/profile-page.component';
import { AddressListComponent } from '@profile/components/address-list/address-list.component';
import { CreateAddressComponent } from '@profile/components/create-address/create-address.component';
import { ProfileInformationComponent } from '@profile/components/profile-information/profile-information.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'information' },
      { path: 'information', component: ProfileInformationComponent },
      { path: 'address', component: AddressListComponent },
      { path: 'address/create', component: CreateAddressComponent },
    ],
  },
];

export default routes;