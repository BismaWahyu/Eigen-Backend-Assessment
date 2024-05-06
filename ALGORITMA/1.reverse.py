def reverse_string(string):
    letters = [char for char in string if char.isalpha()]
    numbers = [char for char in string if char.isdigit()]
    reverse_string = ''.join(reversed(letters))
    return reverse_string + ''.join(numbers)

input_string = input("Input the string: ")

result = reverse_string(input_string)

print("Result = ", result)