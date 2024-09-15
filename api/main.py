import httpx
import redis
import json
from fastapi import FastAPI
from pydantic_settings import BaseSettings, SettingsConfigDict
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Définir la classe Settings pour les variables d'environnement
class Settings(BaseSettings):
    redis_host: str = 'localhost'
    redis_port: int = 6379
    weather_api_key: str
    weather_api_url: str

    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

# Charger les paramètres depuis les variables d'environnement ou le fichier .env
settings = Settings()

# Initialiser Redis avec les variables d'environnement
r = redis.Redis(host=settings.redis_host, port=settings.redis_port, decode_responses=True)

@app.get('/current')
async def read_current(q: str):
    # Vérifier si les données sont déjà mises en cache
    existing_cached = r.get(q)

    if existing_cached is None:
        # print('Aucune donnée actuelle en cache pour', q)
        
        # Récupérer depuis l'API météo
        url = f"{settings.weather_api_url}current.json?key={settings.weather_api_key}&q={q}&aqi=no"
        response = httpx.get(url)

        # Stocker la réponse dans le cache avec une expiration de 12 heures (en secondes)
        stored_data = store_query_response(q,get_current_resume(response.json()))
        return {"current": stored_data}
    else:
        # print('Données en cache existantes pour', q, ":", existing_cached)
        # Retourner les données mises en cache après désérialisation
        return {"current": json.loads(existing_cached)}

# Fonction pour stocker la réponse de la requête dans Redis
def store_query_response(q: str, data):
    # Sérialiser les données en JSON et définir l'expiration à 12 heures (43200 secondes)
    r.setex(q, 43200, json.dumps(data))  # Définir l'expiration à 12 heures
    # Retourner les données stockées pour vérification (désérialiser)
    return json.loads(r.get(q))

def get_current_resume(data):
    location = data.get('location', {})
    current = data.get('current', {})

    return {
        "name": location.get('name', 'N/A'),
        "region": location.get('region', 'N/A'),
        "country": location.get('country', 'N/A'),
        "timezone": location.get('tz_id', 'N/A'),
        "current": {
            "time": location.get('localtime', 'N/A'),
            "temperature": current.get('temp_c', 'N/A'),
            "condition": current.get('condition', {}).get('text', 'N/A'),
            "is_day": current.get('is_day', 'N/A')
        }
    }