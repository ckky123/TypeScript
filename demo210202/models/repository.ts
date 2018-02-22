/// <reference path="../node_modules/@types/documentdb/index.d.ts" />
import { UniqueId } from 'documentdb';
import { DocumentClient } from 'documentdb';
import { SqlQuerySpec } from 'documentdb';
import { DatabaseMeta } from 'documentdb';
import { QueryError } from 'documentdb';
import { CollectionMeta } from 'documentdb';
import { RetrievedDocument } from 'documentdb';

export class Repository<T extends UniqueId> {
    private db: DocumentClient;
    constructor(private database: string, private collection: string) {
        var configuration = require('../configuration.json');     
        this.db = new DocumentClient(configuration.host, { masterKey: configuration.auth });
    }

    private getQuery(id: string): SqlQuerySpec {
        return {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                name: '@id',
                value: id
            }]
        };
    }

    private getDatabase(): Promise<DatabaseMeta> {

        return new Promise<DatabaseMeta>((resolve, reject) => {
            let query = this.getQuery(this.database);
            let results = this.db.queryDatabases(query);
            results.toArray((error: QueryError, results: any[]) => {
        if (error)
            reject(error);
        else
            resolve(results.length === 0 ? null : results[0]);
        });

        });

    }

    private getCollection(): Promise<CollectionMeta> {
        return new Promise<CollectionMeta>((resolve, reject) => {
            this.getDatabase().then((databaseMeta) => {
                let query = this.getQuery(this.collection);
                let results = this.db.queryCollections(databaseMeta._self, query);
                results.toArray((error: QueryError, results: any[]) => {
                if (error)
                    reject(error);
                else
                    resolve(results.length === 0 ? null : results[0]);
            });

                
            });
        });

    }

    public getDocuments(query : SqlQuerySpec): Promise<RetrievedDocument[]> {
        return new Promise<RetrievedDocument[]>((resolve, reject) => {
            this.getCollection().then((collectionMeta) => {
            let results = this.db.queryDocuments<T>(collectionMeta._self, query);
            results.toArray((error: QueryError, results: RetrievedDocument []) => {
            if (error)
                reject(error);
            else
                resolve(results);
                });

            });
        });
    }

    public getDocument(id: string): Promise<RetrievedDocument> {

        return new Promise<RetrievedDocument>((resolve, reject) => {
            this.getCollection().then((collectionMeta) => {
                let query = this.getQuery(id);
                let results = this.db.queryDocuments<T>(collectionMeta._self, query);
                    results.toArray((error: QueryError, results: RetrievedDocument[]) => {
                        if (error)
                            reject(error);
                        else
                            resolve(results.length === 0 ? null : results[0]);
                    });

            });
        });

    }

    public createDocument(document: T): Promise<string> {

        return new Promise<string>((resolve, reject) => {
            this.getCollection().then((collectionMeta) => {
                this.db.createDocument(collectionMeta._self, document, {}, (error: QueryError, item: RetrievedDocument) => {
                    if (error)
                        reject(error);
                    else
                        resolve(item.id);

                });
                
            });
        });

    }

    public updateDocument(id : string, document: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.getDocument(id).then((d) => {
                this.db.replaceDocument(d._self, document, {}, (error: QueryError) => {
                    if (error)
                        reject(error);
                    else
                        resolve();
                });             
            });
        });
    }

    public deleteDocument(id : string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.getDocument(id).then((d) => {
                this.db.deleteDocument(d._self, {}, (error: QueryError) => {
                    if (error)
                        reject(error);
                    else
                        resolve();                              
                });
            });
        });
    }

}






