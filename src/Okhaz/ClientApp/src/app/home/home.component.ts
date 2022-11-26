import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HelperService } from '../service/helper.service';
import { MenuItems } from '../shared/menu/menu-items/menu-items';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  currentUrl: any;
  root: any = 'ltr';
  layout: any = 'ltr';
  currentLang: any = 'en';
  customizerIn: boolean = false;
  showSettings: boolean = false;
  chatpanelOpen: boolean = false;
  sidenavOpen: boolean = true;
  isMobile: boolean = false;
  isFullscreen: boolean = false;
  collapseSidebarStatus: boolean = false;
  header: string = "OKHAZ";
  dark: boolean = false;
  compactSidebar: boolean = false;
  isMobileStatus: boolean = false;
  sidenavMode: string = 'side';
  popupDeleteResponse: any;
  sidebarColor: any;

  sideBarFilterClass: any = [
    {
      sideBarSelect: "sidebar-color-1",
      colorSelect: "sidebar-color-dark"
    },
    {
      sideBarSelect: "sidebar-color-2",
      colorSelect: "sidebar-color-primary",
    },
    {
      sideBarSelect: "sidebar-color-3",
      colorSelect: "sidebar-color-accent"
    },
    {
      sideBarSelect: "sidebar-color-4",
      colorSelect: "sidebar-color-warn"
    },
    {
      sideBarSelect: "sidebar-color-5",
      colorSelect: "sidebar-color-green"
    }
  ]

  headerFilterClass: any = [
    {
      headerSelect: "header-color-1",
      colorSelect: "header-color-dark"
    },
    {
      headerSelect: "header-color-2",
      colorSelect: "header-color-primary"
    },
    {
      headerSelect: "header-color-3",
      colorSelect: "header-color-accent"
    },
    {
      headerSelect: "header-color-4",
      colorSelect: "header-color-warning"
    },
    {
      headerSelect: "header-color-5",
      colorSelect: "header-color-green"
    }
  ]

  chatList: any[] = [
    {
      image: "assets/img/user-1.jpg",
      name: "John Smith",
      chat: "Lorem ipsum simply dummy",
      mode: "online"
    },
    {
      image: "assets/img/user-2.jpg",
      name: "Amanda Brown",
      chat: "Lorem ipsum simply dummy",
      mode: "online"
    },
    {
      image: "assets/img/user-3.jpg",
      name: "Justin Randolf",
      chat: "Lorem ipsum simply dummy",
      mode: "offline"
    },
    {
      image: "assets/img/user-4.jpg",
      name: "Randy SunSung",
      chat: "Lorem ipsum simply dummy",
      mode: "online"
    },
    {
      image: "assets/img/user-5.jpg",
      name: "Lisa Myth",
      chat: "Lorem ipsum simply dummy",
      mode: "online"
    },
  ]
  menuList: any[] = [];
  branchInfo: any;
  constructor(
    public menuItems: MenuItems,
    private router: Router,
    private authService: AuthService,
    private routes: Router, private helper: HelperService) {
    var data = this.helper.getDataFromStorageDetails("BranchInfo");
    if (data) {
      data = JSON.parse(data);
      this.branchInfo = data.BranchInfo;
      this.branchInfo.BranchAvatar ="https://localhost:5001/assets/img/logo.jpeg"
    }
    this.menuList = menuItems.getAll();
  }

  ngOnInit() {
  // this.header = this.menuList[1].name;
  }

  ngOnDestroy() {
  }

  /**
    *As router outlet will emit an activate event:any any time a new component is being instantiated.
    */
  onActivate(e: any, scrollContainer: any) {
  }

  /**
    * toggleFullscreen method is used to show a template in fullscreen.
    */
  toggleFullscreen() {

  }

  /**
    * customizerFunction is used to open and close the customizer.
    */
  customizerFunction() {
  }

  /**
    * addClassOnBody method is used to add a add or remove class on body.
    */
  addClassOnBody(event: any) {

  }

  /**
    * changeRTL method is used to change the layout of template.
    */
  changeRTL(isChecked: any) {

  }

  /**
    * toggleSidebar method is used a toggle a side nav bar.
    */
  toggleSidebar() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  /**
    * logOut method is used to log out the  template.
    */
  logOut() {
  }

  /**
    * onDelete function is used to open the delete dialog.
    */
  onDelete(cart: any) {

  }

  /**
    * getPopupDeleteResponse is used to delete the cart item when reponse is yes.
    */
  getPopupDeleteResponse(response: any, cart: any) {

  }

  /**
    * sidebarFilter function filter the color for sidebar section.
    */
  sidebarFilter(selectedFilter: any) {

  }

  /**
    * headerFilter function filter the color for header section.
    */
  headerFilter(selectedFilter: any) {

  }

  /**
    *chatMenu method is used to toggle a chat menu list.
    */
  chatMenu() {
  }

  /**
    * onChatOpen method is used to open a chat window.
    */
  onChatOpen() {
  }

  /**
    * onChatWindowClose method is used to close the chat window.
    */
  chatWindowClose() {
  }

  collapseSidebar(event: any) {

  }

  //onResize method is used to set the side bar according to window width.
  onResize(event: any) {

  }

  //customizeSidebar method is used to change the side bar behaviour.
  customizeSidebar() {

  }

  //To resize the side bar according to window width.
  resizeSideBar() {

  }
}
