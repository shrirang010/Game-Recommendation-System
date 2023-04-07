import csv

count = 0
list = []

with open('test.txt', 'r', encoding='cp850') as file:
    data = file.read().splitlines()

    for i in data:
        if (count <= 400):
            i = i.replace('"', "")
            i = i.replace('\'', "")
            i = i.replace('[', "")
            i = i.replace(']', "")
            i1 = i.split(",")

            for j in i1:
                list.append(j)
            count += 1

list = set(list)
for i in list:
    print("\""+i+"\",")
