import pandas as pd

a = []

df2 = pd.read_excel(r'/Users/ds3k/Desktop/Webscraper/account.xlsx', sheet_name='Sheet1')
for index, row in df2.iterrows():
    
    a.append(row[0])

for n in range(len(a)):
    strings = str(a[n])    

    if (len(strings) == 11):
        print("00" + strings)
    elif (len(strings) == 12):
        print("0" + strings)
    elif (len(strings) == 13):
        print(strings)
    else:
        print("Not Valid")



