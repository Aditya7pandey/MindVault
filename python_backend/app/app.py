from fastapi import FastAPI
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel

app = FastAPI()

# model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2",device="cpu") 
#In production

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


class EmbedRequest(BaseModel):
    text: list[str]

@app.post("/embed")
def embed(req: EmbedRequest):
    vectors = model.encode(req.text).tolist()
    return {"vectors": vectors}

@app.get('/')
def root():
    return {"message":"embedding api is running"}