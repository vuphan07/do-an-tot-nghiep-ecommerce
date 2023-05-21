import numpy as np
import sys
import json
import pymongo
import time
from sklearn.metrics import mean_squared_error
import csv
import pandas as pd
import os


def connectDb():
    client = pymongo.MongoClient("mongodb://localhost:27017")
    return client


def rmse(data, U, V, lamda):
    mask = data != 0
    diff = data - U.dot(V)
    return np.sqrt((diff ** 2)[mask].mean() + lamda * (np.sum(np.square(U)) + np.sum(np.square(V))))


def train_test_split(matrix, test_ratio=0.2):
    test = np.zeros(matrix.shape)
    train = matrix.copy()
    for user in range(matrix.shape[0]):
        non_zero_ratings = matrix[user, :].nonzero()[0]
        test_ratings = np.random.choice(non_zero_ratings,
                                        size=int(test_ratio *
                                                 len(non_zero_ratings)),
                                        replace=False)
        train[user, test_ratings] = 0
        test[user, test_ratings] = matrix[user, test_ratings]
    return train, test


def matrix_factorization(R, K, steps=5000, alpha=0.0002, beta=0.02, verbose=False):
    
    s = np.count_nonzero(R) if np.count_nonzero(R) > 0 else 1
    num_users, num_items = R.shape
    U = np.random.randn(num_users, K)
    V = np.random.randn(K, num_items)
    prev_error = 0
    for i in range(steps):
        
        for u in range(num_users):
            mask = R[u] != 0
            V_masked = V[:, mask]
            data_masked = R[u, mask]
            U[u] -= alpha * \
                ((data_masked - U[u].dot(V_masked)
                  ).dot(V_masked.T) * (-1/s) + beta*U[u])
    
        for v in range(num_items):
            mask = R[:, v] != 0
            U_masked = U[mask, :]
            data_masked = R[mask, v]
            V[:, v] -= alpha * \
                (((U_masked.T.dot(data_masked -
                                  U_masked.dot(V[:, v])))) * (-1/s) + beta*V[:, v])
    return U, V


def initValueMatrix(matrix, rates, users, products):
    for i in range(len(rates)):
        rate = rates[i]
        matrix[rate["user_index"]][rate["product_index"]] = rate["rate"]
    return matrix

def rmseMatrix(test, U, V):
    test_pred = np.dot(U, V)
    test_pred_round = np.round(test_pred * 2) / 2
    mask = test != 0
    return mean_squared_error(test_pred_round[mask], test[mask])

# start training


indexOfUser = sys.argv[1]


def runScript():
    client = connectDb()
    startTime = time.time()
    db = client["test"]
    collectionUsers = db["users"]
    collectionProducts = db["products"]
    collectionRates = db["rates"]

    users = collectionUsers.find({}, {"_id": 1})
    products = collectionProducts.find({}, {"_id": 1})
    rates = collectionRates.find({})

    countUsers = collectionUsers.count_documents({})

    countProducts = collectionProducts.count_documents({})

    m = countUsers
    n = countProducts

    users = list(users)
    products = list(products)
    rates = list(rates)

    
    data = np.zeros((m, n))
    data = initValueMatrix(data, rates, users=users, products=products)
    train, test = train_test_split(data)
    endTime = time.time()
    U, V = matrix_factorization(
        R=data, K=20, steps=5000, alpha=0.002, beta=0.002, verbose=True)
    mtrx = np.dot(U, V)
    writeMatrixToCsv(U, "matrixU.csv")
    writeMatrixToCsv(V, "matrixV.csv")
    writeMatrixToCsv(mtrx, "matrix.csv")
    return mtrx


def writeMatrixToCsv(matrix, path):
    with open(path, mode='w', newline='') as file:
        writer = csv.writer(file)
        for row in matrix:
            writer.writerow(row)


def readMatrixFromCsv(path):
    df = pd.read_csv(path, header=None,encoding='utf-8')
    matrix = df.to_numpy()
    return matrix

if indexOfUser == "updatematrix" :
    runScript()
    exit()

if os.path.exists("matrix.csv"):
    matrix = readMatrixFromCsv("matrix.csv")
    if len(matrix) > int(indexOfUser):
        sys.stdout.write(str(matrix[int(indexOfUser)].tolist()))
    else:
        sys.stdout.write("null")
else:
    sys.stdout.write("null")
    # runScript()
exit()

# print(rmseMatrix(test, U, V))
