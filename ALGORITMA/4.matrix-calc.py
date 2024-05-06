def diagocal_calc(matrix):
    calc_1 = 0
    calc_2 = 0

    for i in range(len(matrix)):
        calc_1 += matrix[i][i]
        calc_2 += matrix[i][len(matrix) - 1 - i]

    diff = abs(calc_1 - calc_2)

    return diff

matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

result = diagocal_calc(matrix)

print("Hasil pengurangan diagonal matriks:", result)