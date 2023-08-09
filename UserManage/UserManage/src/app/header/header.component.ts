import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{

  subMenuVisible: string | null = null;

  constructor() {}

  ngOnInit(): void {}

  toggleSubMenu(menuItem: string) {
    if (this.subMenuVisible === menuItem) {
      this.subMenuVisible = null;
    } else {
      this.subMenuVisible = menuItem;
    }
  }
}
