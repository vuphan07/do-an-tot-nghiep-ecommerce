# -*- coding: utf-8 -*-
import numpy as np
import sys
import json

users_string = sys.argv[1]
products_string = sys.argv[2]
rates_string = sys.argv[3]
indexOfUser = sys.argv[4]
users = json.loads(users_string)
products = json.loads(products_string)
rates = json.loads(rates_string)  # {x,y,value:number}
m = len(users)
n = len(products)
# Tạo ma trận data, mỗi hàng đại diện cho một user và mỗi cột đại diện cho một item
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

s = np.count_nonzero(data) if np.count_nonzero(data) > 0 else 1
# Khởi tạo kích thước của ma trận latent factors U và V
num_users, num_items = data.shape
num_latent_factors = 2
num_iterations = 100
learning_rate = 0.01
lamda = 0.002
# Khởi tạo ma trận latent factors U và V
U = np.random.randn(num_users, num_latent_factors)
V = np.random.randn(num_latent_factors, num_items)

# Hàm tính toán độ lỗi RMSE


def rmse(data, U, V):
    mask = data != 0
    diff = data - U.dot(V)
    return np.sqrt((diff ** 2)[mask].mean() + lamda * (np.sum(np.square(U)) + np.sum(np.square(V))))

# Thực hiện training


for i in range(num_iterations):
    # Cập nhật ma trận U
    for u in range(num_users):
        mask = data[u] != 0
        V_masked = V[:, mask]
        data_masked = data[u, mask]
        # U[u] -= learning_rate * \
        #     ((U[u].dot(V_masked) - data_masked) * V_masked).sum(axis=1)
        U[u] -= learning_rate * \
            ((data_masked - U[u].dot(V_masked)
              ).dot(V_masked.T) * (-1/s) + lamda*U[u])
    # Cập nhật ma trận V
    for i in range(num_items):
        mask = data[:, i] != 0
        U_masked = U[mask, :]
        data_masked = data[mask, i]
        # V[:, i] -= learning_rate * \
        #     (U_masked.T.dot(U_masked.dot(V[:, i]) - data_masked))
        V[:, i] -= learning_rate * \
            (((U_masked.T.dot(data_masked -
             U_masked.dot(V[:, i])))) * (-1/s) + lamda*V[:, i])

    error = rmse(data, U, V)
    # if i % 100 == 0:
    #     print("Iteration: %d, RMSE = %0.4f" % (i, error))

print(U.dot(V)[int(indexOfUser)].tolist())
