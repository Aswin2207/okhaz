import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class DashboardComponent implements OnInit {
  showChart: boolean;
  statsCards = [
    {
      "card_color": "primary-bg",
      "icon": "fa-user-plus",
      "title": "Visitors",
      "viewer": "+ 41",
      "trade": "30",
      "chartLabel": ["0", "1", "2", "3", "4"],
      "chartColors": [
        {
          "fill": false,
          "lineTension": 0,
          "fillOpacity": 0.3,
          "pointHoverBorderWidth": 4,
          "borderWidth": 4,
          "pointHoverRadius": 7,
          "pointBorderWidth": 3,
          "pointRadius": 6,
          "backgroundColor": "#FFFFFF",
          "borderColor": "#FFFFFF",
          "pointBackgroundColor": "#FFFFFF",
          "pointBorderColor": "#FFFFFF",
          "pointHoverBackgroundColor": "#FFFFFF",
          "pointHoverBorderColor": "#FFFFFF"
        }
      ],
      "chartData": [
        { "data": [30, 5, 26, 10, 30], "label": "Visitors" }
      ]
    },
    {
      "card_color": "success-bg",
      "icon": "fa-money",
      "title": "Revenue",
      "viewer": "+ 4381",
      "trade": "60",
      "chartLabel": ["0", "1", "2", "3", "4"],
      "chartColors": [
        {
          "fill": false,
          "lineTension": 0,
          "fillOpacity": 0.3,
          "pointHoverBorderWidth": 4,
          "borderWidth": 4,
          "pointHoverRadius": 7,
          "pointBorderWidth": 3,
          "pointRadius": 6,
          "backgroundColor": "#FFFFFF",
          "borderColor": "#FFFFFF",
          "pointBackgroundColor": "#FFFFFF",
          "pointBorderColor": "#FFFFFF",
          "pointHoverBackgroundColor": "#FFFFFF",
          "pointHoverBorderColor": "#FFFFFF"
        }
      ],
      "chartData": [
        { "data": [1, 26, 8, 22, 1], "label": "Revenue" }
      ]
    },
    {
      "card_color": "accent-bg",
      "icon": "fa-shopping-cart",
      "title": "Sales",
      "viewer": "+ 2611",
      "trade": "80",
      "chartLabel": ["0", "1", "2", "3", "4"],
      "chartColors": [
        {
          "fill": false,
          "lineTension": 0,
          "fillOpacity": 0.3,
          "pointHoverBorderWidth": 4,
          "borderWidth": 4,
          "pointHoverRadius": 7,
          "pointBorderWidth": 3,
          "pointRadius": 6,
          "backgroundColor": "#FFFFFF",
          "borderColor": "#FFFFFF",
          "pointBackgroundColor": "#FFFFFF",
          "pointBorderColor": "#FFFFFF",
          "pointHoverBackgroundColor": "#FFFFFF",
          "pointHoverBorderColor": "#FFFFFF"
        }
      ],
      "chartData": [
        { "data": [30, 5, 26, 10, 30], "label": "Sales" }
      ]
    },
    {
      "card_color": "warn-bg",
      "icon": "fa-handshake-o",
      "title": "Deals",
      "viewer": "+ 611",
      "trade": "40",
      "chartLabel": ["0", "1", "2", "3", "4"],
      "chartColors": [
        {
          "fill": false,
          "lineTension": 0,
          "fillOpacity": 0.3,
          "pointHoverBorderWidth": 4,
          "borderWidth": 4,
          "pointHoverRadius": 7,
          "pointBorderWidth": 3,
          "pointRadius": 6,
          "backgroundColor": "#FFFFFF",
          "borderColor": "#FFFFFF",
          "pointBackgroundColor": "#FFFFFF",
          "pointBorderColor": "#FFFFFF",
          "pointHoverBackgroundColor": "#FFFFFF",
          "pointHoverBorderColor": "#FFFFFF"
        }
      ],
      "chartData": [
        { "data": [1, 26, 8, 22, 1], "label": "Deals" }
      ]
    },
    {
      "card_color": "primary-bg",
      "icon": "fa-user-plus",
      "title": "Visitors",
      "viewer": "+ 41",
      "trade": "30",
      "chartLabel": ["0", "1", "2", "3", "4"],
      "chartColors": [
        {
          "fill": false,
          "lineTension": 0,
          "fillOpacity": 0.3,
          "pointHoverBorderWidth": 4,
          "borderWidth": 4,
          "pointHoverRadius": 7,
          "pointBorderWidth": 3,
          "pointRadius": 6,
          "backgroundColor": "#FFFFFF",
          "borderColor": "#FFFFFF",
          "pointBackgroundColor": "#FFFFFF",
          "pointBorderColor": "#FFFFFF",
          "pointHoverBackgroundColor": "#FFFFFF",
          "pointHoverBorderColor": "#FFFFFF"
        }
      ],
      "chartData": [
        { "data": [30, 5, 26, 10, 30], "label": "Visitors" }
      ]
    },
    {
      "card_color": "success-bg",
      "icon": "fa-money",
      "title": "Revenue",
      "viewer": "+ 4381",
      "trade": "60",
      "chartLabel": ["0", "1", "2", "3", "4"],
      "chartColors": [
        {
          "fill": false,
          "lineTension": 0,
          "fillOpacity": 0.3,
          "pointHoverBorderWidth": 4,
          "borderWidth": 4,
          "pointHoverRadius": 7,
          "pointBorderWidth": 3,
          "pointRadius": 6,
          "backgroundColor": "#FFFFFF",
          "borderColor": "#FFFFFF",
          "pointBackgroundColor": "#FFFFFF",
          "pointBorderColor": "#FFFFFF",
          "pointHoverBackgroundColor": "#FFFFFF",
          "pointHoverBorderColor": "#FFFFFF"
        }
      ],
      "chartData": [
        { "data": [1, 26, 8, 22, 1], "label": "Revenue" }
      ]
    },
    {
      "card_color": "accent-bg",
      "icon": "fa-shopping-cart",
      "title": "Sales",
      "viewer": "+ 2611",
      "trade": "80",
      "chartLabel": ["0", "1", "2", "3", "4"],
      "chartColors": [
        {
          "fill": false,
          "lineTension": 0,
          "fillOpacity": 0.3,
          "pointHoverBorderWidth": 4,
          "borderWidth": 4,
          "pointHoverRadius": 7,
          "pointBorderWidth": 3,
          "pointRadius": 6,
          "backgroundColor": "#FFFFFF",
          "borderColor": "#FFFFFF",
          "pointBackgroundColor": "#FFFFFF",
          "pointBorderColor": "#FFFFFF",
          "pointHoverBackgroundColor": "#FFFFFF",
          "pointHoverBorderColor": "#FFFFFF"
        }
      ],
      "chartData": [
        { "data": [30, 5, 26, 10, 30], "label": "Sales" }
      ]
    },
    {
      "card_color": "warn-bg",
      "icon": "fa-handshake-o",
      "title": "Deals",
      "viewer": "+ 611",
      "trade": "40",
      "chartLabel": ["0", "1", "2", "3", "4"],
      "chartColors": [
        {
          "fill": false,
          "lineTension": 0,
          "fillOpacity": 0.3,
          "pointHoverBorderWidth": 4,
          "borderWidth": 4,
          "pointHoverRadius": 7,
          "pointBorderWidth": 3,
          "pointRadius": 6,
          "backgroundColor": "#FFFFFF",
          "borderColor": "#FFFFFF",
          "pointBackgroundColor": "#FFFFFF",
          "pointBorderColor": "#FFFFFF",
          "pointHoverBackgroundColor": "#FFFFFF",
          "pointHoverBorderColor": "#FFFFFF"
        }
      ],
      "chartData": [
        { "data": [1, 26, 8, 22, 1], "label": "Deals" }
      ]
    }
  ];
  tableTabData = {
    "expenseCategory": [{
      "itmNo": "#itm001",
      "date": "19 Aug 2018",
      "type": "Hotel",
      "typeColor": "primary",
      "description": "Hotel charges",
      "amount": "$2000",
      "statusColor": "primary",
      "status": "paid"
    },
    {
      "itmNo": "#itm002",
      "date": "22 Mar 2018",
      "type": "Meal",
      "typeColor": "accent",
      "description": "food delivery charges",
      "amount": "$500",
      "statusColor": "primary",
      "status": "paid"
    },
    {
      "itmNo": "#itm003",
      "date": "30 Sep 2018",
      "type": "car rental",
      "typeColor": "primary",
      "description": "car service bill",
      "amount": "$1500",
      "statusColor": "warn",
      "status": "not paid"
    },
    {
      "itmNo": "#itm004",
      "date": "20 Aug 2018",
      "type": "Health",
      "typeColor": "accent",
      "description": "Hospital bill",
      "amount": "$1700",
      "statusColor": "primary",
      "status": "paid"
    },
    {
      "itmNo": "#itm005",
      "date": "13 Jan 2018",
      "type": "accommodation",
      "typeColor": "primary",
      "description": "House rent",
      "amount": "$1290",
      "statusColor": "warn",
      "status": "Not paid"
    },
    {
      "itmNo": "#itm006",
      "date": "24 Mar 2018",
      "type": "Meal",
      "typeColor": "accent",
      "description": "food delivery charges",
      "amount": "$500",
      "statusColor": "primary",
      "status": "paid"
    },
    {
      "itmNo": "#itm007",
      "date": "30 Jan 2019",
      "type": "accommodation",
      "typeColor": "primary",
      "description": "House rent",
      "amount": "$1290",
      "statusColor": "warn",
      "status": "Not paid"
    }
    ],
    "transactionList": [{
      "transid": "#trn001",
      "date": "19 Aug 2018",
      "account": "Citibank",
      "type": "Saving",
      "typeColor": "primary",
      "amount": "$2000",
      "debit": "$1,807.00",
      "credit": "$0.00",
      "balance": "$0.00"
    },
    {
      "transid": "#trn002",
      "date": "22 Mar 2018",
      "account": "Standard Chartered Bank",
      "type": "Income",
      "typeColor": "accent",
      "amount": "$500",
      "debit": "$1,307.00",
      "credit": "$0.00",
      "balance": "$0.00"
    },
    {
      "transid": "#trn003",
      "date": "30 Sep 2018",
      "account": "HSBC Bank",
      "type": "Expense",
      "typeColor": "warn",
      "amount": "$1500",
      "debit": "$2,307.00",
      "credit": "$0.00",
      "balance": "$0.00"
    },
    {
      "transid": "#trn004",
      "date": "20 Aug 2018",
      "account": "Deutsche Bank",
      "type": "Income",
      "typeColor": "accent",
      "amount": "$1700",
      "debit": "$3,307.00",
      "credit": "$0.00",
      "balance": "$0.00"
    },
    {
      "transid": "#trn005",
      "date": "13 Jan 2018",
      "account": "Bank of Scotland",
      "type": "Saving",
      "typeColor": "primary",
      "amount": "$1290",
      "debit": "$1,000.00",
      "credit": "$0.00",
      "balance": "$0.00"
    },
    {
      "transid": "#trn006",
      "date": "13 Jan 2018",
      "account": "Barclays Bank",
      "type": "Income",
      "typeColor": "accent",
      "amount": "$1290",
      "debit": "$1,500.00",
      "credit": "$0.00",
      "balance": "$0.00"
    },
    {
      "transid": "#trn007",
      "date": "13 Jan 2018",
      "account": "The Bank of America",
      "type": "Expense",
      "typeColor": "warn",
      "amount": "$1290",
      "debit": "$1,709.00",
      "credit": "$0.00",
      "balance": "$0.00"
    }
    ],
    "transferreport": [{
      "transid": "#trn001",
      "date": "19 Aug 2018",
      "account": "Citibank",
      "type": "Saving",
      "typeColor": "primary",
      "amount": "$2000",
      "balance": "$1,807.00",
      "statusColor": "primary",
      "status": "Send"
    },
    {
      "transid": "#trn002",
      "date": "22 Mar 2018",
      "account": "Standard Chartered Bank",
      "type": "Income",
      "typeColor": "accent",
      "amount": "$500",
      "balance": "$1,807.00",
      "statusColor": "warn",
      "status": "Not Send"
    },
    {
      "transid": "#trn003",
      "date": "30 Sep 2018",
      "account": "HSBC Bank",
      "type": "Expense",
      "typeColor": "warn",
      "amount": "$1500",
      "balance": "$1,807.00",
      "statusColor": "primary",
      "status": "Send"
    },
    {
      "transid": "#trn004",
      "date": "20 Aug 2018",
      "account": "Deutsche Bank",
      "type": "Income",
      "typeColor": "accent",
      "amount": "$1700",
      "balance": "$1,807.00",
      "statusColor": "primary",
      "status": "Send"
    },
    {
      "transid": "#trn005",
      "date": "13 Jan 2018",
      "account": "Bank of Scotland",
      "type": "Saving",
      "typeColor": "primary",
      "amount": "$1290",
      "balance": "$1,807.00",
      "statusColor": "warn",
      "status": "Not Send"
    },
    {
      "transid": "#trn006",
      "date": "13 Jan 2018",
      "account": "Barclays Bank",
      "type": "Income",
      "typeColor": "accent",
      "amount": "$1290",
      "balance": "$1,807.00",
      "statusColor": "primary",
      "status": "Send"
    },
    {
      "transid": "#trn007",
      "date": "13 Jan 2018",
      "account": "The Bank of America",
      "type": "Expense",
      "typeColor": "warn",
      "amount": "$1290",
      "balance": "$1,807.00",
      "statusColor": "warn",
      "status": "Not Send"
    }
    ]
  };
  liveChatSupport = [
    {
      "image": "assets/img/register-user-3.jpg",
      "name": "Devy Finn",
      "rating": 4,
      "chat": "Hi There! Recently I updated the latest version of your app, it crashed every time when i open.Please help me out as soon as possible.....Thanks",
      "time": "10 Min ago",
      "classSendBy": "sender"
    },
    {
      "image": "assets/img/register-user-1.jpg",
      "name": "Sam Brown",
      "rating": 2,
      "chat": "Hi Devy, Can you please tell us your mobile configuraion.So that We can help you better.Please Also specify Version of your phone....Thank You!",
      "time": "8 Min ago",
      "classSendBy": "sender"
    }
  ];
  team: Object[] = [{
    name: 'Isabela Phelaps',
    photo: 'assets/img/user-1.jpg',
    post: 'Sr.Manager',
    purchase: '4'
  }, {
    name: 'Trevor Hansen',
    photo: 'assets/img/user-2.jpg',
    post: 'Manager',
    purchase: '6'
  }, {
    name: 'Sandra Adams',
    photo: 'assets/img/user-3.jpg',
    post: 'Engineer',
    purchase: '5'
  }, {
    name: 'Sandy Smith',
    photo: 'assets/img/user-4.jpg',
    post: 'Engineer',
    purchase: '10'
  }];
  displayedTransactionColumns: string[] = ['transid', 'date', 'account', 'type', 'amount', 'debit', 'credit', 'balance'];
  displayedTransferColumns: string[] = ['transid', 'date', 'account', 'type', 'amount', 'balance', 'status'];
  displayedExpenseColumns: string[] = ['itmNo', 'date', 'type', 'description', 'amount', 'status'];
  //line chart options
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          display: false
        },
        gridLines: {
          display: false,
          drawBorder: false,
          drawTicks: false
        },
        display: false
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: true,
          drawBorder: false
        },
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: { enabled: false },
    hover: { mode: null }
  };
  chartOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      backgroundColor: 'rgba(245, 245, 245, 0.8)',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textStyle: {
        color: '#000'
      },
      position: function (pos, params, el, elRect, size) {
        var obj = { top: 10 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 10,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        realtime: true,
        start: 20,
        end: 70,
        top: 10,
        height: 30,
        onGap: true,
        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '120%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisTick: { onGap: true },
        splitLine: { show: false },
        data: [
          "2018/1/24", "2018/1/25", "2018/1/28", "2018/1/29", "2018/1/30",
          "2018/1/31", "2018/2/1", "2018/2/4", "2018/2/5", "2018/2/6",
          "2018/2/7", "2018/2/8", "2018/2/18", "2018/2/19", "2018/2/20",
          "2018/2/21", "2018/2/22", "2018/2/25", "2018/2/26", "2018/2/27",
          "2018/2/28", "2018/3/1", "2018/3/4", "2018/3/5", "2018/3/6",
          "2018/3/7", "2018/3/8", "2018/3/11", "2018/3/12", "2018/3/13",
          "2018/3/14", "2018/3/15", "2018/3/18", "2018/3/19", "2018/3/20",
          "2018/3/21", "2018/3/22"
        ]
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        boundaryGap: [0.01, 0.01]
      }
    ],
    series: [
      {
        type: 'k',
        name: 'Chart',
        itemStyle: {
          normal: {
            color: '#1565c0',
            color0: '#43a047',
            borderColor: '#1565c0',
            borderColor0: '#43a047'
          }
        },
        data: [
          [2320.26, 2302.6, 2287.3, 2362.94],
          [2300, 2291.3, 2288.26, 2308.38],
          [2295.35, 2346.5, 2295.35, 2346.92],
          [2347.22, 2358.98, 2337.35, 2363.8],
          [2360.75, 2382.48, 2347.89, 2383.76],
          [2383.43, 2385.42, 2371.23, 2391.82],
          [2377.41, 2419.02, 2369.57, 2421.15],
          [2425.92, 2428.15, 2417.58, 2440.38],
          [2411, 2433.13, 2403.3, 2437.42],
          [2432.68, 2434.48, 2427.7, 2441.73],
          [2430.69, 2418.53, 2394.22, 2433.89],
          [2416.62, 2432.4, 2414.4, 2443.03],
          [2441.91, 2421.56, 2415.43, 2444.8],
          [2420.26, 2382.91, 2373.53, 2427.07],
          [2383.49, 2397.18, 2370.61, 2397.94],
          [2378.82, 2325.95, 2309.17, 2378.82],
          [2322.94, 2314.16, 2308.76, 2330.88],
          [2320.62, 2325.82, 2315.01, 2338.78],
          [2313.74, 2293.34, 2289.89, 2340.71],
          [2297.77, 2313.22, 2292.03, 2324.63],
          [2322.32, 2365.59, 2308.92, 2366.16],
          [2364.54, 2359.51, 2330.86, 2369.65],
          [2332.08, 2273.4, 2259.25, 2333.54],
          [2274.81, 2326.31, 2270.1, 2328.14],
          [2333.61, 2347.18, 2321.6, 2351.44],
          [2340.44, 2324.29, 2304.27, 2352.02],
          [2326.42, 2318.61, 2314.59, 2333.67],
          [2314.68, 2310.59, 2296.58, 2320.96],
          [2309.16, 2286.6, 2264.83, 2333.29],
          [2282.17, 2263.97, 2253.25, 2286.33],
          [2255.77, 2270.28, 2253.31, 2276.22],
          [2269.31, 2278.4, 2250, 2312.08],
          [2267.29, 2240.02, 2239.21, 2276.05],
          [2244.26, 2257.43, 2232.02, 2261.31],
          [2257.74, 2317.37, 2257.42, 2317.86],
          [2318.21, 2324.24, 2311.6, 2330.81],
          [2321.4, 2328.28, 2314.97, 2332],
          [2334.74, 2326.72, 2319.91, 2344.89]
        ]
      }
    ]
  };
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showChart = true;
    }, 1000)
  }

}
