import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ResultComponent } from './pages/admin/result/result.component';
import { SetTimeComponent } from './pages/admin/set-time/set-time.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { UserdetailComponent } from './pages/admin/userdetail/userdetail.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuestionComponent } from './pages/admin/view-question/view-question.component';
import { ViewQuizesComponent } from './pages/admin/view-quizes/view-quizes.component';
import { ViewrankComponent } from './pages/admin/viewrank/viewrank.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
   path:'signup',
   component: SignupComponent,
   pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'quizes',
        component: ViewQuizesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'update-quiz/:qid',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qid/:title',
        component: ViewQuestionComponent,
      },
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'set-time',
        component: SetTimeComponent,
      },
      {
        path: 'user',
        component: UserdetailComponent,
      },
      {
        path: 'result/:id',
        component: ResultComponent,
      },
      {
        path: 'rank',
        component: ViewrankComponent,
      },
    ],
  },

  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children:[
      {
        path:':catId',
        component: LoadQuizComponent
      },
      {
        path:'instructions/:qid',
        component: InstructionsComponent
      },
      
    ]
  },
  {
    path:'start',
    component: StartComponent,
    canActivate: [NormalGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
