import numpy as np
import sys
import json
from sklearn.decomposition import NMF
users_string = sys.argv[1]
products_string = sys.argv[2]
rates_string = sys.argv[3]
indexOfUser = sys.argv[4]
users = json.loads(users_string)
products = json.loads(products_string)
rates = json.loads(rates_string)  # {x,y,value:number}
m = len(users)
n = len(products)

data = np.zeros((m, n))

# update matrix data
for i in range(len(rates)):
    rate = rates[i]
    index_of_user = next((index for (index, d) in enumerate(
        users) if d["_id"] == rate["user_id"]), None)
    index_of_product = next((index for (index, d) in enumerate(
        products) if d["_id"] == rate["product_id"]), None)
    data[index_of_user][index_of_product] = rate["rate"]
    # data[rate["x"]][rate["y"]] = rate["value"]


num_users, num_items = data.shape
k = 2
model = NMF(n_components=k, init='random', random_state=0)
P = model.fit_transform(ratings)
Q = model.components_

print(P.dot(Q)[int(indexOfUser)].tolist())

