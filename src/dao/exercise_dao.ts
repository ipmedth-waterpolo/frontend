export class exerciseDao {
  id: string;
  name: string;
  enabled: boolean;
  categorie: string;
  onderdeel: string;
  leeftijdsgroep: string;
  duur: number;
  minimum_aantal_spelers: number;
  benodigdheden: string;
  water_nodig: boolean;
  omschrijving: string;
  variatie: string | null;
  source: string | null;
  afbeeldingen: string | null;
  videos: string | null;
  rating: number | null;
  created_at: string;
  updated_at: string;

  constructor(
    id: string,
    name: string,
    enabled: boolean,
    categorie: string,
    onderdeel: string,
    leeftijdsgroep: string,
    duur: number,
    minimum_aantal_spelers: number,
    benodigdheden: string,
    water_nodig: boolean,
    omschrijving: string,
    variatie: string | null = null,
    source: string | null = null,
    afbeeldingen: string | null = null,
    videos: string | null = null,
    rating: number | null = null,
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
    this.name = name;
    this.enabled = enabled;
    this.categorie = categorie;
    this.onderdeel = onderdeel;
    this.leeftijdsgroep = leeftijdsgroep;
    this.duur = duur;
    this.minimum_aantal_spelers = minimum_aantal_spelers;
    this.benodigdheden = benodigdheden;
    this.water_nodig = water_nodig;
    this.omschrijving = omschrijving;
    this.variatie = variatie;
    this.source = source;
    this.afbeeldingen = afbeeldingen;
    this.videos = videos;
    this.rating = rating;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
