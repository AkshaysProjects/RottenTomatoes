import { Model, Schema, model, models } from "mongoose";

// Define the media type enum
export enum MediaType {
  MOVIE = "Movie",
  TV_SHOW = "TV Show",
}

// Define the type for the media schema
export interface IMedia {
  title: string;
  rating: number;
  language: string;
  runtime?: string;
  releaseDate?: Date;
  trailerUrl?: string;
  firstAirDate?: Date;
  lastAirDate?: Date;
  status: string;
  genres: string[];
  summary: string;
  homepage: string;
  posterUrl: string;
  cast: string[];
  bannerUrl: string;
  type: MediaType;
  imdbId: string;
}

// Define the schema
const MediaSchema = new Schema<IMedia>({
  title: { type: String, required: true, index: true },
  rating: { type: Number, required: true },
  language: { type: String, required: true },
  runtime: String,
  releaseDate: { type: Date, validate: [isValidDate, "Invalid release date"] },
  trailerUrl: String,
  firstAirDate: {
    type: Date,
    validate: [isValidDate, "Invalid first air date"],
  },
  lastAirDate: { type: Date, validate: [isValidDate, "Invalid last air date"] },
  status: { type: String, default: "Unknown" },
  genres: { type: [String], required: true },
  summary: { type: String, required: true },
  homepage: { type: String, required: true },
  posterUrl: { type: String, required: true },
  cast: { type: [String], required: true },
  bannerUrl: { type: String, required: true },
  type: {
    type: String,
    enum: ["movie", "tv_show"],
    required: true,
    index: true,
  },
  imdbId: { type: String, required: true, unique: true },
});

// Define the model
const existingModel: Model<IMedia> = models.Media;
export default existingModel || model<IMedia>("Media", MediaSchema, "media");

// Custom function to validate dates
function isValidDate(value: Date): boolean {
  return value instanceof Date && !isNaN(value.getTime());
}
