# from sentence_transformers import SentenceTransformer
# from transformers import pipeline
# import faiss
# import numpy as np
#
# with open("documents.txt", "r", encoding="utf-8") as f:
#     text = f.read()
#
# documents = [doc.strip() for doc in text.split("\n\n") if doc.strip()]
#
# model = SentenceTransformer('all-MiniLM-L6-v2')
# doc_embeddings = model.encode(documents)
#
# dimension = doc_embeddings.shape[1]
# index = faiss.IndexFlatL2(dimension)
# index.add(np.array(doc_embeddings))
#
# gen_pipeline = pipeline("text-generation", model="gpt2")
#
# while True:
#     query = input("\nAsk a question (or type 'exit'): ")
#     if query.lower() == "exit":
#         break
#
#     query_embedding = model.encode([query])
#     D, I = index.search(np.array(query_embedding), k=2)
#
#     context = "\n".join([documents[i] for i in I[0]])
#
#     prompt = f"Context:\n{context}\n\nQuestion: {query}\nAnswer:"
#     output = gen_pipeline(prompt, max_new_tokens=100, do_sample=True)[0]['generated_text']
#
#     print("\n Answer:")
#     print(output.replace(prompt, "").strip())

from sentence_transformers import SentenceTransformer
from transformers import pipeline
import faiss
import numpy as np
import os

# Step 1: Load documents from .txt file
with open("documents1.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Each document is separated by a blank line
documents = [doc.strip() for doc in text.split("\n\n") if doc.strip()]

# Step 2: Load embedding model (free & cached locally)
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
doc_embeddings = embedding_model.encode(documents)

# Step 3: Build FAISS index for fast search
dimension = doc_embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(doc_embeddings))

# Step 4: Load Q&A model (free & cached locally)
qa_pipeline = pipeline("question-answering", model="deepset/roberta-base-squad2")

# Step 5: Interactive loop
while True:
    query = input("\nAsk a question (or type 'exit'): ")
    if query.lower() == "exit":
        break

    # Find closest documents
    query_embedding = embedding_model.encode([query])
    D, I = index.search(np.array(query_embedding), k=2)
    context = "\n".join([documents[i] for i in I[0]])

    # Run Q&A model
    result = qa_pipeline(question=query, context=context)
    print("\nAnswer:")
    print(result["answer"])