from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import pandas as pd
from openpyxl import load_workbook
from time import sleep

# EXCEL PART

account_list = [] # array to store excel data

df2 = pd.read_excel(r'/Users/ds3k/Desktop/Webscraper/Houses100.xlsx', sheet_name='Sheet1') # open the excel data

for index, row in df2.iterrows():
    
    account_list.append(row[0])


# WEB PART
df = pd.DataFrame(columns=['Account No.','Prior Year','Prior Year Tax Due','Total Amount Due For Current Month', 'Notes']) # creates master dataframe

driver = webdriver.Chrome('/Users/ds3k/Downloads/chromedriver') # locate webdriver

driver.get("https://www.hctax.net/Property/PropertyTax") # open website

for a in range(len(account_list)): 
    # locate search bar and parse in the account number
    search = driver.find_element_by_id("txtSearchValue") 
    search.clear()
    account = account_list[a]
    excel_file = str(account)
    
    if (len(excel_file) == 11):
        correct_account_no = "00" + excel_file
    elif (len(excel_file) == 12):
        correct_account_no = "0" + excel_file
    elif (len(excel_file) == 13):
        correct_account_no = excel_file
    else:
        correct_account_no = excel_file

    search.send_keys(correct_account_no)
    
    #current account
    account_list2 = []
    account_list2.append(correct_account_no)
    search.send_keys(Keys.RETURN)

    sleep(5)
    
    # click account number link
    try: 
        account_link = driver.find_element_by_link_text(correct_account_no)
        account_link.click()

        sleep(5)

        # locate datas to be scraped
        # py = prior year
        try:
            py = driver.find_element_by_class_name("dYears")
        except:
            py_list = []
            py_list.append("null")
        else:
            py_list = []
            py_list.append(py.text)

        try:
            py_tax_due = driver.find_element_by_xpath("//*[@id='CurrentStatement']/table[4]/tbody/tr[4]/td[2][contains(text(), '$')]")
        except:
            py_tax_due_list = []
            py_tax_due_list.append("null")
        else:
            py_tax_due_list = []
            py_tax_due_list.append(py_tax_due.text)

        try:
            total_tax_due = driver.find_element_by_xpath("//*[@id='CurrentStatement']/table[4]/tbody/tr[5]/td[2]")
        except:
            total_tax_due_list = []
            total_tax_due_list.append("null")
        else:
            total_tax_due_list = []
            total_tax_due_list.append(total_tax_due.text)

        try:
            notes = driver.find_element_by_xpath("//*[@id='CurrentStatement']/table[2]/tbody/tr[2]/td[3]")
        except:
            notes_list = []
            notes_list.append("null")
        else:
            notes_list = []
            notes_list.append(notes.text)
     
        sleep(2)

        data_tuples = list(zip(account_list2,py_list,py_tax_due_list,total_tax_due_list,notes_list)) # list of all scraped datas paired together
        temp_df = pd.DataFrame(data_tuples, columns=['Account No.','Prior Year','Prior Year Tax Due','Total Amount Due For Current Month', 'Notes']) # creates dataframe of each tuple in list
        df = df.append(temp_df) # appends to master dataframe

        driver.back()

        sleep(2)
    
    except:
        pass


df.to_excel(r'/Users/ds3k/Desktop/Webscraper/houses100.xlsx', index = False, header=True) # convert dataframe to excel
df.to_csv('houses100.csv')

driver.quit() # close browser
  