
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {

   userList  = [
    {
      "img":"assets/img/user-1.jpg",
      "firstName" : "Steven",
       "lastName" : "Gonzalez",
      "isNewUser":"New",
       "email": "StevenAGonzalez@dayrep.com",
        "status": "Active",
       "statusTime":"Since 1 hour",  
       "accountTypeColor":"primary",
       "accountType": "Platinum",
       "dateCreated": "13 Aug 2018"
    },
    {
      "img":"assets/img/user-2.jpg",
       "firstName" : "Josephine",
       "lastName" : "Goodman",
       "isNewUser":"New",
      "email": "JosephineKGoodman@jourrapide.com",
      "status": "Inactive",
       "statusTime":"Since 30 min",
       "accountType": "Gold",
       "accountTypeColor":"accent",
       "dateCreated": "22 Aug 2018"
     },
    {
     "img":"assets/img/user-3.jpg",
       "firstName" : "Mario",
       "lastName" : "Harmon",
     "email": "MarioCHarmon@armyspy.com",
     "status": "Active",
       "statusTime":"Since 2 hour",
     "accountType": "Silver",
       "accountTypeColor":"warn",
     "dateCreated": "13 Aug 2018"
    },
    {
     "img":"assets/img/user-4.jpg",
       "firstName" : "Aleta",
       "lastName" : "Goodell",
     "email": "AletaDGoodell@teleworm.us",
     "status": "Inactive",
       "statusTime":"Since 24 min",
     "accountType": "Platinum",
       "accountTypeColor":"primary",
     "dateCreated": "22 Aug 2018"
    },
    {
     "img":"assets/img/user-5.jpg",
       "firstName" : "Florence",
       "lastName" : "Smith",
     "email": "FlorenceJSmith@rhyta.com",
     "status": "Active",
       "statusTime":"Since 10 hour",
       "accountType":"Gold",
       "accountTypeColor":"accent",
     "dateCreated": "13 Aug 2018"
    },
    {
     "img":"assets/img/user-6.jpg",
       "firstName" : "Helen",
       "lastName" : "Moronta",
     "email": "HelenLMoronta@teleworm.us",
     "status": "Inactive",
       "statusTime":"Since 5 hour",
       "accountType": "Silver",
       "accountTypeColor":"warn",
     "dateCreated": "22 Aug 2018"
    },
    {
     "img":"assets/img/user-7.jpg",
       "firstName" : "Leanora",
       "lastName" : "Reed",
     "email": "LeanoraTReed@rhyta.com",
     "status": "Active",
       "statusTime":"Since 10 min",
     "accountType": "Platinum",
       "accountTypeColor":"primary",
     "dateCreated": "13 Aug 2018"
    },
    {
     "img":"assets/img/user-8.jpg",
       "firstName" : "Judy",
       "lastName" : "Gallardo",
     "email": "JudyPGallardo@dayrep.com",
     "status": "Inactive",
       "statusTime":"Since 4 hour",
       "accountType": "Gold", 
       "accountTypeColor":"accent", 
     "dateCreated": "22 Aug 2018"
    },
    {
     "img":"assets/img/user-9.jpg",
       "firstName" : "Goldie",
       "lastName" : "Carlson",
     "email": "GoldieJCarlson@teleworm.us", 
     "status": "Active",
       "statusTime":"Since 9 hour",
       "accountType": "Silver",
       "accountTypeColor":"warn",
     "dateCreated": "13 Aug 2018"
    },
    {
     "img":"assets/img/user-3.jpg",
       "firstName" : "Bradley",
       "lastName" : "Bannon",
     "email": "BradleyDBannon@teleworm.us",
     "status": "Inactive",
       "statusTime":"Since 5 min",
     "accountType": "Platinum",
       "accountTypeColor":"primary",
     "dateCreated": "22 Aug 2018"
    }
 ]
//table data
userTableData: any = {
  tableHeader:'User Table',
  columns:[] = [
    {
      name:'User',
      type:'img',
      id:'img'
    },
    {
      name:'First Name',
      type:'string',
      id:'firstName'
    },
    {
      name:'Last Name',
      type:'string',
      id:'lastName'
    },
    {
      name:'Email',
      type:'string',
      id:'email'
    },
    {
      name:'Status',
      type:'string',
      id:'status'
    },
    {
      name:'Status Time',
      type:'string',
      id:'statusTime'
    },
    {
      name:'Date Created',
      type:'progress-bar',
      id:'dateCreated',
      ariaVal:'25',
      ariaType:'bg-success'
    }
  ],
  data:[] = [
    {
      "img":"assets/img/user-1.jpg",
      "firstName" : "Steven",
       "lastName" : "Gonzalez",
       "email": "StevenAGonzalez@dayrep.com",
        "status": "Active",
       "statusTime":"Since 1 hour",
       "dateCreated": "13 Aug 2018"
    },
    {
      "img":"assets/img/user-2.jpg",
       "firstName" : "Josephine",
       "lastName" : "Goodman",
      "email": "JosephineKGoodman@jourrapide.com",
      "status": "Inactive",
       "statusTime":"Since 30 min",
       "dateCreated": "22 Aug 2018"
     },
    {
     "img":"assets/img/user-3.jpg",
       "firstName" : "Mario",
       "lastName" : "Harmon",
     "email": "MarioCHarmon@armyspy.com",
     "status": "Active",
       "statusTime":"Since 2 hour",
     "dateCreated": "13 Aug 2018"
    },
    {
     "img":"assets/img/user-4.jpg",
       "firstName" : "Aleta",
       "lastName" : "Goodell",
     "email": "AletaDGoodell@teleworm.us",
     "status": "Inactive",
       "statusTime":"Since 24 min",
     "dateCreated": "22 Aug 2018"
    },
    {
     "img":"assets/img/user-5.jpg",
       "firstName" : "Florence",
       "lastName" : "Smith",
     "email": "FlorenceJSmith@rhyta.com",
     "status": "Active",
       "statusTime":"Since 10 hour",
     "dateCreated": "13 Aug 2018"
    },
    {
     "img":"assets/img/user-6.jpg",
       "firstName" : "Helen",
       "lastName" : "Moronta",
     "email": "HelenLMoronta@teleworm.us",
     "status": "Inactive",
       "statusTime":"Since 5 hour",
     "dateCreated": "22 Aug 2018"
    },
    {
     "img":"assets/img/user-7.jpg",
       "firstName" : "Leanora",
       "lastName" : "Reed",
     "email": "LeanoraTReed@rhyta.com",
     "status": "Active",
     "statusTime":"Since 10 min",
     "dateCreated": "13 Aug 2018"
    }
  
 ]
}
  constructor ( ) { }

  ngOnInit () { 
     
 }

  
}
