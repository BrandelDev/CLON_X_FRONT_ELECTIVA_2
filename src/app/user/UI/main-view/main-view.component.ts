import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FeedComponent } from '../../../components/feed/feed.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, FeedComponent  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

}
