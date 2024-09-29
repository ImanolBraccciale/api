import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { StarshipsService } from '../starships/starships.service';
import { PlanetsService } from '../planets/planets.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SyncService implements OnModuleInit {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly peopleService: PeopleService,
    private readonly starshipsService: StarshipsService,
    private readonly planetsService: PlanetsService,
  ) {}

  async onModuleInit() {
    // Llama a todas las funciones cuando la aplicación inicie
    await this.fetchAndStoreFilms();
    await this.fetchAndStorePeople();
    await this.fetchAndStoreStarships();
    await this.fetchAndStorePlanets();
  }

  @Cron('0 * * * *') // Cada hora
  async handleCron() {
    await this.fetchAndStoreFilms();
    await this.fetchAndStorePeople();
    await this.fetchAndStoreStarships();
    await this.fetchAndStorePlanets();
  }

  private async fetchAndStoreFilms() {
    try {
      const response = await axios.get('https://swapi.dev/api/films/');
      const films = response.data.results;

      for (const film of films) {
        await this.filmsService.create(film); 
      }
    } catch (error) {
      console.error('Error al obtener películas:', error);
    }
  }

  private async fetchAndStorePeople() {
    try {
      const response = await axios.get('https://swapi.dev/api/people/');
      const people = response.data.results;

      for (const person of people) {
        await this.peopleService.create(person); 
      }
    } catch (error) {
      console.error('Error al obtener personas:', error);
    }
  }

  private async fetchAndStoreStarships() {
    try {
      const response = await axios.get('https://swapi.dev/api/starships/');
      const starships = response.data.results;

      for (const starship of starships) {
        await this.starshipsService.create(starship); 
      }
    } catch (error) {
      console.error('Error al obtener naves estelares:', error);
    }
  }

  private async fetchAndStorePlanets() {
    try {
      const response = await axios.get('https://swapi.dev/api/planets/');
      const planets = response.data.results;

      for (const planet of planets) {
        await this.planetsService.create(planet); 
      }
    } catch (error) {
      console.error('Error al obtener planetas:', error);
    }
  }
}
