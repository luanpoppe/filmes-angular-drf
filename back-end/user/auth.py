import requests
def check_token(token):
    response = requests.post("http://127.0.0.1:8000/api/token/refresh/", {"refresh": token})
    if (response.status_code == 200):
        access_token = response.json()["access"]
        return access_token
    return "Something went wrong!"

hue = check_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTA2NzI1OCwiaWF0IjoxNzIwOTgwODU4LCJqdGkiOiI3ZWRjOTNmZWNhODI0ZmMyYmIzNWNiMWRhNzFlNGE3YyIsInVzZXJfaWQiOjF9.coEozbamWcRkF_GmY9ThF-8-pwSv4UjRe90ptzVNK_Q")

print('hue', hue)