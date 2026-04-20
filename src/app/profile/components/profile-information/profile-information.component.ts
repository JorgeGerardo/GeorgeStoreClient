import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserData } from '@profile/interfaces/user-data';
import { ProfileService } from '@profile/services/profile.service';

@Component({
  selector: 'app-profile-information',
  imports: [DatePipe],
  templateUrl: './profile-information.component.html',
  styleUrl: `./profile-information.component.css`
})
export class ProfileInformationComponent implements OnInit {
  profileService = inject(ProfileService);
  userData: UserData | undefined = undefined;

  ngOnInit() {
    this.profileService.GetProfile().subscribe(data => this.userData = data);
  }


}
