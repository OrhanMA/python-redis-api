"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CurrentWeather } from "@/lib/types";
import Weather, { SkeletonWeather } from "@/components/ui/Weather";

// Définition du schéma de validation du formulaire avec Zod
const formSchema = z.object({
  query: z
    .string() // Le champ 'query' doit être une chaîne de caractères
    .min(1, { message: "La requête doit comporter entre 1 et 20 caractères" }) // La chaîne doit contenir au moins 1 caractère
    .max(20, { message: "La requête ne peut pas dépasser 20 caractères" }), // La chaîne ne peut pas dépasser 20 caractères
});

// Définition du composant principal de la page d'accueil
export default function Home() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null); // État pour stocker les données météorologiques ou null
  const [loading, setLoading] = useState(false); // État pour indiquer si les données sont en cours de chargement

  // Initialisation du formulaire avec React Hook Form et validation Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Résolveur pour la validation du schéma
    defaultValues: {
      query: "", // Valeur par défaut pour le champ 'query'
    },
  });

  // Fonction appelée lors de la soumission du formulaire
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const query = values.query; // Récupération de la valeur du champ 'query'
    setLoading(true); // Activation de l'état de chargement
    try {
      // Envoi de la requête pour récupérer les données météorologiques
      const response = await fetch("http://localhost:8000/current?q=" + query);
      if (!response.ok) {
        throw new Error("Échec de la récupération des données météorologiques"); // Gestion des erreurs en cas de réponse non OK
      }
      const weather: CurrentWeather = await response.json(); // Analyse des données JSON de la réponse
      setWeather(weather); // Mise à jour de l'état avec les données météorologiques
      console.log(weather); // Affichage des données dans la console
    } catch (error) {
      console.error(error); // Affichage de l'erreur dans la console
    } finally {
      setLoading(false); // Désactivation de l'état de chargement une fois la requête terminée
    }
  }

  // Fonction pour réinitialiser la recherche
  function resetSearch() {
    setWeather(null); // Réinitialisation des données météorologiques
    setLoading(false); // Réinitialisation de l'état de chargement
    form.reset(); // Réinitialisation du formulaire
  }
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-6">
      <h1 className="text-3xl font-bold">Weather App</h1>
      <Card className="flex flex-col md:flex-row">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="w-[350px] border-none shadow-none">
              <CardHeader>
                <CardTitle>Weather request</CardTitle>
                <CardDescription>
                  You query can be a city name, zip code, IP address,
                  latitude/longitude (decimal degree)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Query</FormLabel>
                      <FormControl>
                        <Input placeholder="London" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Search"}
                </Button>
                <Button
                  onClick={resetSearch}
                  type="button"
                  variant={"secondary"}
                >
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
        {weather == null && loading && <SkeletonWeather />}
        {!loading && weather != null && <Weather weather={weather} />}
      </Card>
    </div>
  );
}
