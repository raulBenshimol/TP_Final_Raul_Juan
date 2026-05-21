import { ResponseObject } from '../../../../core/models/response-object.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { JourneyApiResponse } from '../model/journey-api.interface';
import { JourneyViewModel } from '../model/journey-view-model.interface';

@Injectable({ providedIn: 'root' })
export class JourneyService extends BaseApiService {

  private readonly pageState: JourneyViewModel = {
    lang: 'es',
    loading: false,
    errorMessage: '',
    showNoSimulationState: false,
    selectedTeamLabel: '',
    journey: null,
  };

  private hasInitialized = false;

  getViewModel(): JourneyViewModel {
    return this.pageState;
  }

  initialize(): void {
    if (this.hasInitialized) {
      this.loadJourney().subscribe();
      return;
    }

    this.hasInitialized = true;
    this.pageState.lang = this.getCurrentLang();

    this.appContextService.currentTeamId$
      .pipe(
        tap(() => (this.pageState.lang = this.getCurrentLang())),
        switchMap(() => this.loadJourney()),
      )
      .subscribe();
  }

private loadJourney(): Observable<void> {
    const lang = this.getCurrentLang();
    this.pageState.lang = lang;
    this.pageState.loading = true;
    this.pageState.errorMessage = '';

    return this.get<JourneyApiResponse>('/world-cup/team-journey', { lang })
      .pipe(
        tap((response: any) => {
          const data = response.data || response;
          this.pageState.journey = data;
          this.pageState.selectedTeamLabel = data?.teamName ?? '';
          this.pageState.showNoSimulationState = false;
        }),
        map(() => undefined),
        catchError((error: HttpErrorResponse) => {
          this.pageState.journey = null;
          if (this.isJourneyUnavailableError(error)) {
            this.pageState.showNoSimulationState = true;
            this.pageState.errorMessage = '';
          } else {
            this.pageState.showNoSimulationState = false;
            this.pageState.errorMessage = 'No se pudo cargar el camino del equipo.';
          }
          return of(undefined);
        }),
        finalize(() => (this.pageState.loading = false)),
      );
  }

  private isJourneyUnavailableError(error: HttpErrorResponse): boolean {
    const messageCode = (error?.error as { responseMessage?: { messageCode?: string } } | undefined)
      ?.responseMessage?.messageCode;

    return messageCode === 'WC_JOURNEY_UNAVAILABLE';
  }
}