import { Routes } from '@angular/router';
import { WheelGameComponent } from './wheel-game/wheel-game.component';
import { WheelGameDetailComponent } from './wheel-game-detail/wheel-game-detail.component';
import { CouponcodeComponent } from './couponcode/couponcode.component';
import { ReelComponent } from './reel/reel.component';

export const markettingRouters : Routes = [
	{
		path : '',
		redirectTo : 'wheel-game',
		pathMatch : 'full'
	},
	{
		path : '',
		children : [
			{
				path: "wheel-game",
				component : WheelGameComponent,
                children: [
                    {
                      path: 'detail',
                      component: WheelGameDetailComponent
                    }
                  ]
			},
			{
				path: "reel",
				component : ReelComponent
			},
			{
				path: "coupon-code",
				component : CouponcodeComponent
			}
		]
	}	
]