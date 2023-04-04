from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from datetime import datetime
from nltk.stem import PorterStemmer
import csv
import nltk
import re
import pandas as pd
# import matplotlib.pyplot as plt
import string

nltk.download('stopwords')


# from nltk.sentiment import Sentim1entIntensityAnalyzer

nltk.download('punkt')
nltk.download('wordnet')
# nltk.download()


# defs
contractions = {
    "ain't": "am not",
    "aren't": "are not",
    "can't": "cannot",
    "can't've": "cannot have",
    "'cause": "because",
    "could've": "could have",
    "couldn't": "could not",
    "couldn't've": "could not have",
    "didn't": "did not",
    "doesn't": "does not",
    "don't": "do not",
    "hadn't": "had not",
    "hadn't've": "had not have",
    "hasn't": "has not",
    "haven't": "have not",
    "he'd": "he would",
    "he'd've": "he would have",
    "he'll": "he will",
    "he'll've": "he will have",
    "he's": "he is",
    "how'd": "how did",
    "how'd'y": "how do you",
    "how'll": "how will",
    "how's": "how is",
    "i'd": "i would",
    "i'd've": "i would have",
    "i'll": "i will",
    "i'll've": "i will have",
    "i'm": "i am",
    "i've": "i have",
    "isn't": "is not",
    "it'd": "it would",
    "it'd've": "it would have",
    "it'll": "it will",
    "it'll've": "it will have",
    "it's": "it is",
    "let's": "let us",
    "ma'am": "madam",
    "mayn't": "may not",
    "might've": "might have",
    "mightn't": "might not",
    "mightn't've": "might not have",
    "must've": "must have",
    "mustn't": "must not",
    "mustn't've": "must not have",
    "needn't": "need not",
    "needn't've": "need not have",
    "o'clock": "of the clock",
    "oughtn't": "ought not",
    "oughtn't've": "ought not have",
    "shan't": "shall not",
    "sha'n't": "shall not",
    "shan't've": "shall not have",
    "she'd": "she would",
    "she'd've": "she would have",
    "she'll": "she will",
    "she'll've": "she will have",
    "she's": "she is",
    "should've": "should have",
    "shouldn't": "should not",
    "shouldn't've": "should not have",
    "so've": "so have",
    "so's": "so is",
    "that'd": "that had",
    "that'd've": "that would have",
    "that's": "that is",
    "there'd": "there would",
    "there'd've": "there would have",
    "there's": "there is",
    "they'd": "they would",
    "they'd've": "they would have",
    "they'll": "they will",
    "they'll've": "they will have",
    "they're": "they are",
    "they've": "they have",
    "to've": "to have",
    "wasn't": "was not",
    "we'd": "we would",
    "we'd've": "we would have",
    "we'll": "we will",
    "we'll've": "we will have",
    "we're": "we are",
    "we've": "we have",
    "weren't": "were not",
    "what'll": "what will",
    "what'll've": "what will have",
    "what're": "what are",
    "what's": "what is",
    "what've": "what have",
    "when's": "when is",
    "when've": "when have",
    "where'd": "where did",
    "where's": "where is",
    "where've": "where have",
    "who'll": "who will",
    "who'll've": "who will have",
    "who's": "who has",
    "who've": "who have",
    "why's": "why is",
    "why've": "why have",
    "will've": "will have",
    "won't": "will not",
    "won't've": "will not have",
    "would've": "would have",
    "wouldn't": "would not",
    "wouldn't've": "would not have",
    "y'all": "you all",
    "y'all'd": "you all would",
    "y'all'd've": "you all would have",
    "y'all're": "you all are",
    "y'all've": "you all have",
    "you'd": "you would",
    "you'd've": "you would have",
    "you'll": "you will",
    "you'll've": "you will have ",
    "you're": "you are",
    "you've": "you have"
}


def tokenizer(document):

    # define regular expression patterns
    #     punctuation_pattern = re.compile(r'\w+|[^\w\s]') # matches all punctuations
    words = re.findall(r"[a-zA-Z]+(?:'[a-zA-Z]+)*", document)
    tokens = []
    for word in words:
        # Normalize clitics
        if "'" in word and word in contractions:
            tokens.extend(contractions[word.lower()].split())
        # Convert word-ending apostrophe
        elif word.endswith("'"):
            tokens.append(word[:-1] + " 's")
        # Otherwise, add the word as a token
        else:
            tokens.append(word)
    return tokens


def lemmatize_tokens(tokens):
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = []
    for token in tokens:
        lemmatized_token = lemmatizer.lemmatize(token)
        lemmatized_tokens.append(lemmatized_token)
    return lemmatized_tokens


def remove_punctuations(text):
    # get a string of all punctuation characters
    punctuations = string.punctuation

    # iterate over each character in the text and check if it's a punctuation mark
    # if it's not a punctuation mark, add it to the result string
    result = ''
    for char in text:
        if char not in punctuations:
            result += char

    return result


custom_stopwords = set(stopwords.words('english')) - set(
    ['not', 'no', 'never', 'nothing', 'nobody', 'nowhere', 'neither', 'nor', 'none', 'but', 'except', 'without', 'hardly'])
print(custom_stopwords)


def remove_stopwords(sents, sw):
    filtered_tokens = [w for w in sents if w not in sw]
    return filtered_tokens


# def get_sentiment_scores(tokens):
#     scores = []
#     for token in tokens:
#         score = sia.polarity_scores(token)
#         scores.append(score['compound'])
#     return scores


hashmap = {}


def increase_count(token):
    if token in hashmap:
        hashmap[token] = hashmap[token] + 1
    else:
        hashmap[token] = 1


def sentiment_analyzer(array):
    negative_words = ["abysmal", "appalling", "atrocious", "awful", "bad", "catastrophic", "deplorable", "disappointing", "disastrous", "dreadful", "faulty", "frustrating", "garbage", "horrible", "inadequate", "inferior", "junk", "lousy", "mediocre", "miserable", "nasty", "not recommended", "offensive", "overpriced",
                      "pathetic", "poor", "rancid", "repulsive", "scam", "shoddy", "terrible", "trash", "unacceptable", "unappealing", "unbearable", "unimpressive", "unpleasant", "unsatisfactory", "unusable", "useless", "wasteful", "weak", "worthless", "abominable", "disgusting", "vile", "grotesque", "shocking", "rip-off", "fraudulent"]

    positive_words = ["amazing", "awesome", "beautiful", "brilliant", "delightful", "excellent", "exceptional", "fabulous", "fantastic", "flawless", "great", "incredible", "impressive", "joyful", "lovely", "magnificent", "marvelous", "outstanding", "perfect", "phenomenal", "pleasurable", "remarkable", "sensational", "splendid", "spectacular",
                      "stellar", "stunning", "superb", "terrific", "top-notch", "tremendous", "wonderful", "admirable", "awe-inspiring", "breathtaking", "captivating", "charismatic", "charming", "commendable", "dazzling", "enchanting", "extraordinary", "fascinating", "glorious", "impressive", "inspiring", "majestic", "masterful", "mesmerizing", "radiant", "good", "best", "epic", "legendary"]

    positive_count = 0
    negative_count = 0

    for word in array:
        if word in positive_words:
            positive_count += 1

        if word in negative_words:
            negative_count += 1

    return [positive_count, negative_count]


with open('reviews.csv', 'r') as file:
    reader = csv.reader(file)
    i = 0
    for document in reader:
        if i % 2 == 0:
            sents = tokenizer(document[1])
            sents = [token for token in sents if token not in string.punctuation]
            lt = lemmatize_tokens(sents)
            st = remove_stopwords(lt, custom_stopwords)
            for word in st:
                word = word.lower()
            print(word) 
            break
        break; 
            # processed = [increase_count(token) for token in st]
            # res = sentiment_analyzer(st)
            # print(res[0], res[1])
        i = i + 1

# def sentiment(review,positive_words,negative_words):
#     positive_counter=0
#     negative_counter=0
#     words_count=len(review)
#     for word in review:
#         if word in positive_words:
#             positive_counter=positive_counter+1
#         elif word in negative_words:
#             negative_counter=negative_counter+1
#     pos = positive_counter/words_count
#     neg = negative_counter/words_count

#     positive_counts=(round(pos + 0.005, 2))
#     negative_counts=(round(neg + 0.005, 2))        
#     return [positive_counts,negative_counts]

# reviews=[]

# pos_sent = open("positive.txt").read()
# positive_words=pos_sent.split('\n')

# neg_sent = open("negative.txt").read()
# negative_words=neg_sent.split('\n')

# csv_header=["positive","negative"]
# for review in reviews:
#     array_sentiment=sentiment(review,positive_words,negative_words)
#     with open("review.csv", 'a') as csvfile: 
#         csvwriter = csv.writer(csvfile) 
#         csvwriter.writerow(csv_header)         
#         csvwriter.writerow(array_sentiment)

# sorted_counts = sorted(hashmap.items(), key=lambda x: x[1], reverse=True)

# # get the top 100 tokens by count
# top_tokens = dict(sorted_counts[:100])

# # create a list of colors for the top 100 tokens
# colors = ["r"] * len(top_tokens)

# # create a bar chart with the top 100 tokens by count
# plt.bar(top_tokens.keys(), top_tokens.values(), color=colors)
# plt.xticks(rotation=90)
# plt.xlabel("Token")
# plt.ylabel("Count")
# plt.title("Top 100 Tokens by Count")
# plt.savefig('my_plot.png')
# plt.show()
