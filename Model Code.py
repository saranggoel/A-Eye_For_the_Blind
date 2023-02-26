import geocoder
geo = geocoder.ip('me')
lat1 = geo.lat
lng1 = geo.lng
print(lat1, lng1)