"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documentdb_1 = require("documentdb");
class Repository {
    constructor(database, collection) {
        this.database = database;
        this.collection = collection;
        var configuration = require('../configuration.json');
        this.db = new documentdb_1.DocumentClient(configuration.host, { masterKey: configuration.auth });
    }
    getQuery(id) {
        return {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                    name: '@id',
                    value: id
                }]
        };
    }
    getDatabase() {
        return new Promise((resolve, reject) => {
            let query = this.getQuery(this.database);
            let results = this.db.queryDatabases(query);
            results.toArray((error, results) => {
                if (error)
                    reject(error);
                else
                    resolve(results.length === 0 ? null : results[0]);
            });
        });
    }
    getCollection() {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((databaseMeta) => {
                let query = this.getQuery(this.collection);
                let results = this.db.queryCollections(databaseMeta._self, query);
                results.toArray((error, results) => {
                    if (error)
                        reject(error);
                    else
                        resolve(results.length === 0 ? null : results[0]);
                });
            });
        });
    }
    getDocuments(query) {
        return new Promise((resolve, reject) => {
            this.getCollection().then((collectionMeta) => {
                let results = this.db.queryDocuments(collectionMeta._self, query);
                results.toArray((error, results) => {
                    if (error)
                        reject(error);
                    else
                        resolve(results);
                });
            });
        });
    }
    getDocument(id) {
        return new Promise((resolve, reject) => {
            this.getCollection().then((collectionMeta) => {
                let query = this.getQuery(id);
                let results = this.db.queryDocuments(collectionMeta._self, query);
                results.toArray((error, results) => {
                    if (error)
                        reject(error);
                    else
                        resolve(results.length === 0 ? null : results[0]);
                });
            });
        });
    }
    createDocument(document) {
        return new Promise((resolve, reject) => {
            this.getCollection().then((collectionMeta) => {
                this.db.createDocument(collectionMeta._self, document, {}, (error, item) => {
                    if (error)
                        reject(error);
                    else
                        resolve(item.id);
                });
            });
        });
    }
    updateDocument(id, document) {
        return new Promise((resolve, reject) => {
            this.getDocument(id).then((d) => {
                this.db.replaceDocument(d._self, document, {}, (error) => {
                    if (error)
                        reject(error);
                    else
                        resolve();
                });
            });
        });
    }
    deleteDocument(id) {
        return new Promise((resolve, reject) => {
            this.getDocument(id).then((d) => {
                this.db.deleteDocument(d._self, {}, (error) => {
                    if (error)
                        reject(error);
                    else
                        resolve();
                });
            });
        });
    }
}
exports.Repository = Repository;
