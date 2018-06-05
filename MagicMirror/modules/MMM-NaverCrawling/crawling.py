import requests
from bs4 import BeautifulSoup

req = requests.get("https://www.naver.com/") # connection
html = req.text 

soup = BeautifulSoup(html,'html.parser')
sillsigan = soup.select('div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li')

b = []
for sill in sillsigan:
    b.append(sill.text) 

k = 1;
list_sillsigan=[]

f1 = open("news/news.js", 'w', encoding='utf8')
for i in b: 

    if k>9 :
        list_sillsigan.append(i[5:-2])
    else :
        list_sillsigan.append(i[4:-2])
    k += 1

for s, list in enumerate(list_sillsigan):
    f1.write("%d:"%(s+1)+list+",")
f1.close()



