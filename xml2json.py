# javascript doesn't let us iterate over the file structure
# so we have to run this script every time we want to turn the xml files to json
# from there, the json is loaded into mongodb in startup.js

# don't forget to pip install xmltodict

import os
import xmltodict, json

path = 'voxml/'
listing = os.listdir(path)
with open('server/lib/voxemes-json.js','w') as f1:
	f1.write('voxjson = [')
	with open('server/lib/voxemes-xml.js','w') as f2:
		f2.write('voxxml = [')
		for file in listing:
			xml = open(path+file,'r').read()

			f1.write(json.dumps(xmltodict.parse(xml))+',')
			
			f2.write(str({'voxeme':file[:-4],'xml':xml})+',')
			
		f2.write(']')
		f1.write(']')