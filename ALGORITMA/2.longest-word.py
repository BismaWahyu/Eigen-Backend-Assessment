def longest_word(sentence):
    words = sentence.split()
    longest_word = ''

    for word in words:
        if len(word) > len(longest_word):
            longest_word = word
    
    return longest_word

sentence = input("Input the sentence: ")

result = longest_word(sentence)

print(f"Kata terpanjang: {result}: {len(result)} karakter")