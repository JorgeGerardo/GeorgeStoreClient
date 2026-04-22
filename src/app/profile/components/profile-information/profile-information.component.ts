import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserData } from '@profile/interfaces/user-data';
import { ProfileService } from '@profile/services/profile.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile-information',
  imports: [DatePipe, RouterLink],
  templateUrl: './profile-information.component.html',
  styleUrl: `./profile-information.component.css`
})
export class ProfileInformationComponent implements OnInit {
  profileService = inject(ProfileService);
  userData: UserData | undefined = undefined;

  ngOnInit() {
    this.profileService.Get().subscribe(data => this.userData = data);
  }


}
