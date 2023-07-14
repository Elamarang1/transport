import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { Test4Component } from './test4/test4.component';
import { Test5Component } from './test5/test5.component';
import { Test6Component } from './test6/test6.component';
import { Test7Component } from './test7/test7.component';
import { Test8Component } from './test8/test8.component';
import { Test9Component } from './test9/test9.component';
import { Test10Component } from './test10/test10.component';
import { HomepageComponent } from './homepage/homepage.component';






import { TestComponent } from './test/test.component'
const routes: Routes = [


  { path: '', component: Test3Component },
  { path: 'Homepage', component: HomepageComponent },
  { path: 'test1', component: Test1Component },
  { path: 'test2', component: Test2Component },
  { path: 'test4', component: Test4Component },
  { path: 'test5', component: Test5Component },
  { path: 'test6', component: Test6Component },
  { path: 'test7', component: Test7Component },
  { path: 'test8', component: Test8Component },
  { path: 'test9', component: Test9Component },
  { path: 'test10', component: Test10Component },


  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
