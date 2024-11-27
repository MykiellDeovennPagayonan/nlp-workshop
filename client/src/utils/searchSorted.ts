import cosineSimilarity from './cosineSimilarity';
import getTextEmbedding from './tfjsembedder';
import { UniversalSentenceEncoder } from "@tensorflow-models/universal-sentence-encoder";

export default async function searchSorted(
  searchWord: string, 
  words: string[], 
  model: UniversalSentenceEncoder
): Promise<string[]> {
  const sentences = [searchWord, ...words];
  
  const embeddedSentences = await getTextEmbedding(sentences, model);
  
  const searchEmbedding = embeddedSentences[0].embedding;
  const wordEmbeddings = embeddedSentences.slice(1);

  const wordSimilarities = wordEmbeddings.map(({ sentence, embedding }) => {
    const similarity = cosineSimilarity(searchEmbedding, embedding);
    return { word: sentence, similarity };
  });

  wordSimilarities.sort((a, b) => b.similarity - a.similarity);

  return wordSimilarities.map(item => item.word);
}
