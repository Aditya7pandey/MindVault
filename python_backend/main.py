import uvicorn
import os

from dotenv import load_dotenv

load_dotenv()

PORT = os.getenv("PORT")

if __name__ == "__main__":
    uvicorn.run("app.app:app",host="0.0.0.0",port=8000,reload=True)

# ,reload=True i removed as it is not sutable for production