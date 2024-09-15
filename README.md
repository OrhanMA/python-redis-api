# Mini API Météo avec FastAPI, Python et Redis

## Description

Ce projet est une API REST créée avec FastAPI en Python, utilisant Redis pour la mise en cache des données météorologiques et HTTPX pour interagir avec un service météo tiers. L'API fournit des informations sur la météo actuelle pour des villes spécifiées par les utilisateurs.

## Technologies Utilisées

- **FastAPI** : Un framework moderne, rapide (high-performance) pour construire des API avec Python 3.7+ basé sur des annotations de type.
- **Python** : Le langage de programmation principal utilisé pour développer l'API.
- **Redis** : Un système de gestion de base de données en mémoire utilisé pour la mise en cache des réponses afin de réduire les appels répétitifs au service météo et améliorer les performances.
- **HTTPX** : Une bibliothèque pour faire des requêtes HTTP asynchrones vers le service météo tiers.

## Fonctionnalités

- **Récupération des données météorologiques actuelles** : Permet aux utilisateurs de demander des informations météorologiques actuelles pour une ville donnée.
- **Mise en cache avec Redis** : Stocke les réponses des requêtes pour éviter des appels répétés au service météo, avec une expiration des données mise en cache après 12 heures.
- **Une web app Next.js pour utiliser l'API** (présente dans le dossier `client`)

## Apports du Projet

Ce mini-projet m'a permis d'apprendre à utiliser :

- **Python avec FastAPI** : J'ai acquis des compétences pratiques dans la création d'API RESTful, en utilisant FastAPI pour gérer les requêtes HTTP et structurer les réponses.
- **Redis pour la mise en cache** : J'ai découvert comment utiliser Redis pour stocker et récupérer des données mises en cache, ce qui améliore la performance de l'API en réduisant les appels aux services externes.
- **HTTPX pour les appels API asynchrones** : J'ai appris à utiliser HTTPX pour effectuer des requêtes HTTP asynchrones et gérer les réponses JSON, facilitant l'intégration avec des services tiers.
- **Les méthodes de configuration de variables d'environnement dans une application Python** : J'ai utilisé des variables d'environnement pour gérer les configurations et les clés API, ce qui permet une gestion sécurisée et flexible des paramètres de l'application.

## Documentation et Liens Utiles

- [API Météo utilisée](https://www.weatherapi.com/api-explorer.aspx)
- [Documentation FastAPI](https://fastapi.tiangolo.com/)
- [Variables d'environnement avec FastAPI](https://fastapi.tiangolo.com/advanced/settings/#reading-a_env-file)
- [Configuration du client Redis](https://redis.io/docs/latest/develop/connect/clients/python/redis-py/)
- [Mise en cache côté client avec Redis](https://redis.io/docs/latest/develop/use/client-side-caching/)
- [Documentation HTTPX](https://www.python-httpx.org/quickstart/)
- [Next.js](https://nextjs.org/)
- [Shadcn components](https://ui.shadcn.com/)
- [zod](https://zod.dev/)
- [react-hook-form](https://react-hook-form.com/)
