import { Component, OnInit } from '@angular/core'
import { DataStorageService } from '../data-storage.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private dataService: DataStorageService) { }
  profileData: any

  ngOnInit(): void {
    this.dataService.getProfileData().subscribe((res: any) => {
      this.profileData = res.data.businesses.nodes[0]
    })
  }
}
