import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { ViewDashboardComponent } from "../view-dashboard/view-dashboard.component";

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule, RouterLink, ViewDashboardComponent],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss'
})
export class ViewUsersComponent implements OnInit {
  users: any[] = [];
  pagination: any = {};
  page: number = 1;
  limit: number = 50;
  sort: string = 'name';
  search: string = '';
  role: string = 'admin';
  userImage: string = '';
  constructor(private _AuthService: AuthService, private _UsersService: UsersService) { }

  getAllUsers() {
    this._UsersService.getAll(this.limit, this.page, this.sort, this.search, this.role).subscribe({
      next: (res) => {
        this.users = res.data;
        this.pagination = res.pagination;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  changeActive(userId: string, active: boolean) {
    this._UsersService.updateOne(userId, { active: !active }).subscribe({
      next: (res) => {
        this.getAllUsers();
        alert('user updated');
      },
      error: (err) => { }
    })
  }

  deleteUser(userId: string) {
    this._UsersService.deleteOne(userId).subscribe({
      next: (res) => {
        this.getAllUsers();
        alert('user deleted')
      }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.getAllUsers();
  }

  searchData(search: string) {
    this.search = search;
    this.getAllUsers();
  }

  filterUsers(role: string) {
    this.role = role;
    this.getAllUsers();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.userImage = this._UsersService.userImage;
    this.getAllUsers();
  }

}
