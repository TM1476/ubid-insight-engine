from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Stateless Engine Online"}

@app.get("/api/insight/{query}")
async def get_insight(query: str):
    # Logic: Simulates merging records from disparate depts
    confidence = random.uniform(0.75, 0.98)
    
    return {
        "ubid": f"KA-BLR-{random.randint(1000, 9999)}",
        "primary_name": f"{query.upper()} Industrial Solutions",
        "trust_score": round(confidence, 2),
        "status": "Active" if confidence > 0.85 else "Dormant",
        "location": "Plot 42, Electronic City Phase 1, Bengaluru",
        "activity_pulse": [random.randint(10, 100) for _ in range(12)],
        "conflicts": ["Address mismatch: Fire Dept vs GST"] if confidence < 0.9 else []
    }
