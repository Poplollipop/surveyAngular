import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/user/user-homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateSurveyComponent } from './pages/admin/create-survey/create-survey.component';
import { MemberPageComponent } from './pages/user/member-page/member-page.component';
import { SurveyPageComponent } from './pages/user/survey-page/survey-page.component';
import { AdminHomepageComponent } from './pages/admin/admin-homepage/admin-homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StatisticsComponent } from './pages/admin/statistics/statistics.component';
import { AnswerPreviewComponent } from './pages/user/survey-page/answer-preview/answer-preview.component';
import { ReplyThanksComponent } from './pages/user/survey-page/reply-thanks/reply-thanks.component';
// import { SearchComponent } from './component/search/search.component';

export const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'admin-homepage', component: AdminHomepageComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-survey', component: CreateSurveyComponent },
  { path: 'survey-page', component: SurveyPageComponent },
  { path: 'preview-page', component: AnswerPreviewComponent },
  { path: 'member-page', component: MemberPageComponent },
  { path: 'thanks-reply', component: ReplyThanksComponent },


    // 測試組件區域
    // { path: 'search', component: SearchComponent },
  { path: '**', component: NotFoundComponent },
];
