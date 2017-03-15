import selenium
import time
import simplejson

from selenium import webdriver
from bs4 import BeautifulSoup

browser = webdriver.Safari()
url = "http://www.chinafilm.org.cn/Item/list.asp?id=1727"
browser.get(url)
browser.execute_script("$('#CYear').html(2016)")

data = []
for m in range(1,13):
	browser.execute_script("$('#mVal').val(" + str(m) + ")")
	browser.execute_script("$('#M"+ str(m) + "').addClass('active').siblings('#CMonth a').removeClass('active')")
	browser.execute_script("FilmList()")
	html = browser.page_source
	soup = BeautifulSoup(html,'lxml')
	table = soup.find(attrs={'id':'FilmList'})
	table_body = table.find('tbody')
	rows = table_body.find_all('tr')
	for row in rows:
		cols = row.find_all('td')
		cols = [ele.text.strip() for ele in cols]
		data.append([ele for ele in cols if ele])
	time.sleep(1)

f = open('output.txt', 'w')
simplejson.dump(data,f,ensure_ascii=False)
f.close()