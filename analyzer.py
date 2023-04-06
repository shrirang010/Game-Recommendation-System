import csv

final_reviews = []
text = ""

with open('metrics.csv', 'r') as file:
    reader = csv.reader(file)
    count1 = 0
    count2 = 0
    count3 = 0
    count4 = 0
    count5 = 0
    count6 = 0
    count7 = 0
    for document in reader:
        print(document[0], document[1])
        if (float(document[1]) >= 0 and float(document[1]) < 0.1):  # very negative
            text = "very negative"
            count1 += 1
        elif (float(document[1]) >= 0.1 and float(document[1]) < 0.2):  # negative
            text = "negative"
            count2 += 1
        elif (float(document[1]) >= 0.2 and float(document[1]) < 0.25):  # partially negative
            text = "partially negative"
            count3 += 1
        elif (float(document[1]) >= 0.25 and float(document[1]) < 0.3):  # mixed
            text = "mixed"
            count7 += 1
        elif (float(document[1]) >= 0.3 and float(document[1]) < 0.4):  # partially positive
            text = "partially positive"
            count4 += 1
        elif (float(document[1]) >= 0.4 and float(document[1]) < 0.5):  # positive
            text = "positive"
            count5 += 1
        else:  # very positive
            text = "very positive"
            count6 += 1

        final_reviews.append([document[0], document[1], text])

print(count1, count2, count3, count7, count4, count5, count6)


with open('metrics.csv', 'w') as file:
    writer = csv.writer(file)
    for val in final_reviews:
        writer.writerow([val[0], val[1], val[2]])
