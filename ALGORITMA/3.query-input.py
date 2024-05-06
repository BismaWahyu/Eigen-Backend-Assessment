def count_words(input, query):
    word_counts = {}

    for word in input:
        if word in word_counts:
            word_counts[word] += 1
        else:
            word_counts[word] = 1

    result = []

    for word in query:
        if word in word_counts:
            result.append(word_counts[word])
        else:
            result.append(0)

    return result

input = ['xc', 'dz', 'bbb', 'dz']
query = ['bbb', 'ac', 'dz']

print(count_words(input, query))