from sentence_transformers import SentenceTransformer
from transformers import pipeline
import faiss
import numpy as np
import torch

# Step 1: Load documents from .txt file
with open("documents1.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Each document is separated by a blank line
documents = [doc.strip() for doc in text.split("\n\n") if doc.strip()]

# Step 2: Load embedding model (Sentence-Transformer) for document embeddings
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
doc_embeddings = embedding_model.encode(documents)

# Step 3: Build FAISS index for fast search
dimension = doc_embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(doc_embeddings))

# Step 4: Load FLAN-T5 model for Q&A
qa_pipeline = pipeline("text2text-generation", model="google/flan-t5-base", tokenizer="google/flan-t5-base",
                       device=0 if torch.cuda.is_available() else -1)

# Step 5: Interactive loop for questions and answers
while True:
    query = input("\nAsk a question (or type 'exit'): ")
    if query.lower() == "exit":
        break

    # Find closest documents to the query
    query_embedding = embedding_model.encode([query])
    D, I = index.search(np.array(query_embedding), k=2)
    context = "\n".join([documents[i] for i in I[0]])

    # Format the context and query for FLAN-T5 Q&A
    prompt = f"Context: {context}\n\nQuestion: {query}\nAnswer:"

    # Run the FLAN-T5 model to generate the answer
    result = qa_pipeline(prompt, max_length=200, num_return_sequences=1)

    # Output the answer
    print("\nAnswer:")
    print(result[0]['generated_text'].strip())

