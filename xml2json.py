# javascript doesn't let us iterate over the file structure
# so we have to run this script every time we want to turn the xml files to json
# from there, the json is loaded into mongodb in startup.js

# don't forget to pip install xmltodict

import os
import xmltodict, json

path = 'voxml/objects/'
listing = os.listdir(path)
with open('server/lib/objects.js','w') as f1:
	f1.write('voxjson = [')

	for file in listing:
		xml = open(path+file,'r').read()
		j = json.dumps(xmltodict.parse(xml))
		j = j[0:-1]
		j += ",'name':'"+file[:-4]+"'}"
		print(j)
		
		f1.write(j+',')

	f1.write(']')