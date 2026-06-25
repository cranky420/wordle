# Read all words
with open("dictionary.txt", "r") as f:
    words = f.readlines()

# Keep only 5-letter alphabetic words
five_letter_words = sorted({
    word.strip().upper()
    for word in words
    if len(word.strip()) == 5 and word.strip().isalpha()
})

print(f"Found {len(five_letter_words)} five-letter words.")

# Save them
with open("words.txt", "w") as f:
    f.write("\n".join(five_letter_words))

print("Saved to words.txt")