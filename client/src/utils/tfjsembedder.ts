/* eslint-disable @typescript-eslint/no-explicit-any */
import { UniversalSentenceEncoder } from "@tensorflow-models/universal-sentence-encoder";

export default async function getTextEmbedding(
  sentences: string[], 
  model: UniversalSentenceEncoder
): Promise<{ sentence: string, embedding: number[] }[]> {
  const embeddings: number[][] = await model.embed(sentences).then((e) => e.arraySync());
  
  const embeddedSentences = embeddings.map((embedding, index) => ({
    sentence: sentences[index],
    embedding
  }));
  
  return embeddedSentences;
}
