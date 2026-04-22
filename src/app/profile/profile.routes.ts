import { Routes } from '@angular/router';
import { ProfilePageComponent } from '@profile/profile-page.component';
import { AddressListComponent } from '@profile/components/address-list/address-list.component';
import { CreateAddressComponent } from '@profile/components/create-address/create-address.component';
import { ProfileInformationComponent } from '@profile/components/profile-information/profile-information.component';
import { PaymentMethodListComponent } from '@profile/components/payment-method-list/payment-method-list.component';
import { PaymentMethodCreateComponent } from '@profile/components/payment-method-create/payment-method-create.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'information' },
      { path: 'information', component: ProfileInformationComponent },
      { path: 'address', component: AddressListComponent },
      { path: 'address/create', component: CreateAddressComponent },
      { path: 'payment-methods', component: PaymentMethodListComponent },
      { path: 'payment-methods/create', component: PaymentMethodCreateComponent },
    ],
  },
];

export default routes;