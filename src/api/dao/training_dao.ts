export class trainingDao {
  id: string;
  name: string;
  enabled: boolean;
  beschrijving: string;
  oefeningIDs: number[]; // Array of exercise IDs
  userID: string;
  ratings: number | null; // Optional field
  totale_duur: number;
  created_at: string;
  updated_at: string;

  constructor(
    id: string,
    name: string,
    enabled: boolean,
    beschrijving: string,
    oefeningIDs: number[],
    userID: string,
    totale_duur: number,
    created_at: string,
    updated_at: string,
    ratings: number | null = null
  ) {
    this.id = id;
    this.name = name;
    this.enabled = enabled;
    this.beschrijving = beschrijving;
    this.oefeningIDs = oefeningIDs;
    this.userID = userID;
    this.ratings = ratings;
    this.totale_duur = totale_duur;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
