from firebase import Firebase
import sys
from datetime import datetime
import geocoder
g = geocoder.ip('me')
print(g.latlng)
config = {
    "apiKey": "AIzaSyBkQ5z8Rs5IRP4lHoiWyXV9XVQHjAh-sEI",
    "authDomain": "a-eye-for-the-blind.firebaseapp.com",
    "storageBucket": "a-eye-for-the-blind.appspot.com",
    "databaseURL": "https://a-eye-for-the-blind-default-rtdb.firebaseio.com/",
}
uid = "EUzyQOAmWJY7F3IuZrajTUOp1aE3" #unique user ID, must set before running
email = 'saranggoel06@gmail.com'
password = 'XXXX'
firebase = Firebase(config)
db = firebase.database()
auth = firebase.auth()
storage = firebase.storage()

def time():
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    return current_time

if uid == "" or email == "" or password == "":
    print("Please set user UID, email, or password in the lines above!")
    sys.exit()

user = auth.sign_in_with_email_and_password(email, password)
user = auth.refresh(user['refreshToken'])
data = {"3": "Joe Tilsed"}
db.child(f"users/{uid}").child("images").update(data)
storage.child(f"images/{uid} {time()}.jpg").put("D:/A-Eye For The Blind/2dtodepth/outfile/test_image.jpg", user['idToken'])
storage.child("images/example1.jpg").put("D:/A-Eye For The Blind/2dtodepth/outfile/test_image.jpg", user['idToken'])



