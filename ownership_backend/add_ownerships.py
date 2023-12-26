from faker import Faker
import requests

fake = Faker('th_TH')
__URL__ = 'http://localhost:8000/ownership/add'
size_of_data = 100


for _ in range(size_of_data):
    with requests.Session() as session:
        res = session.post(__URL__, json={
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "phone": fake.phone_number(),
            "email": fake.email(),
        })
        print(res.json())
        print("-" * 50)
