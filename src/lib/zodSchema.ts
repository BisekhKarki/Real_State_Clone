import validator from "validator";
import { unknown, z } from "zod";

export const AddPropertyFormSchema = z.object({
  name: z.string().min(1, "Please enter a name"),
  description: z.string().min(2, "Enter the description"),
  typeId: z
    .string()
    .min(1, "Select the type of your property")
    .transform((data: unknown) => Number(data)),
  statusId: z
    .string()
    .min(1, "Select the statu of your property")
    .transform((data: unknown) => Number(data)),
  price: z
    .string()
    .min(1, "Enter the price")
    .regex(new RegExp("^[0-9]+$"), "Please enter a number")
    .transform((data: unknown) => Number(data)),
  location: z.object({
    streetAddress: z.string().min(1, "Enter the street address"),
    city: z.string().min(1, "Enter the city name"),
    state: z.string().min(1, "Enter the state name"),
    zip: z.string().refine((data) => validator.isPostalCode(data, "any")),
    region: z.string().min(1, "Enter the region"),
    landmark: z.string(),
  }),
  propertFeature: z.object({
    bedrooms: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter number of bedrooms")
      .transform((data: unknown) => Number(data)),
    bathrooms: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter number of bathroom")
      .transform((data: unknown) => Number(data)),
    parkingSpots: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter number of parking spot")
      .transform((data: unknown) => Number(data)),
    area: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter area")
      .transform((data: unknown) => Number(data)),
    hasSwimmingPool: z.boolean(),
    hasGardenYard: z.boolean(),
    hasBalcony: z.boolean(),
  }),
  contact: z.object({
    name: z.string().min(1, "Please enter the contact name"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    email: z.string().email(),
  }),
});
