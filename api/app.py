import logging
import os
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from requests import get
from dotenv import load_dotenv

load_dotenv()
UNSPLASH_KEY_LOCAL = os.environ.get("UNSPLASH_KEY", "")
UNSPLASH_URL = "https://api.unsplash.com/photos/random"
DEBUG = os.environ.get("DEBUG", "False").lower() == "true"

# Fetch key from Databricks secrets
def get_key_from_secrets():
    try:
        import dbutils
        return dbutils.secrets.get(scope="image-search-app", key="unsplash_key")
    except Exception as e:
        logging.error(f"Error fetching key from Databricks secrets: {e}")
        return None


UNSPLASH_KEY = get_key_from_secrets() or UNSPLASH_KEY_LOCAL


app = Flask(__name__, static_url_path='', static_folder="public")
CORS(app)

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    header = {
        "Authorization" : f"Client-ID {UNSPLASH_KEY}",
        "Accept-Version" : "v1"
    }
    params = {
        "query" : word
    }
    response =  get(url=UNSPLASH_URL, headers=header, params=params)
    data = response.json()
    return {"data" : data}


if __name__ == "__main__":
    app.run()