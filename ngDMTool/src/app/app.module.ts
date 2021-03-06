import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GridstackModule } from '@libria/gridstack';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { TimerComponent } from './timer/timer.component';
import { BeastiaryComponent } from './beastiary/beastiary.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { LibraryComponent } from './library/library.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PartyComponent } from './party/party.component';
import { ItemComponent } from './item/item.component';
import { MonsterComponent } from './monster/monster.component';
import { SpellComponent } from './spell/spell.component';
import { EncounterComponent } from './encounter/encounter.component';
import { PopoverTriggersComponent } from './popover-triggers/popover-triggers.component';
import { NameFilterPipe } from './name-filter.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material';
import { GeneralComponent } from './general/general.component';
import { CapitalizePipe } from './capitalize.pipe';
import { FractionizerPipe } from './fractionizer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DiceRollerComponent,
    TimerComponent,
    BeastiaryComponent,
    AdminComponent,
    LibraryComponent,
    AuthenticationComponent,
    PartyComponent,
    ItemComponent,
    MonsterComponent,
    SpellComponent,
    EncounterComponent,
    PopoverTriggersComponent,
    NameFilterPipe,
    GeneralComponent,
    CapitalizePipe,
    FractionizerPipe
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    GridstackModule.forRoot(),
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [NameFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
