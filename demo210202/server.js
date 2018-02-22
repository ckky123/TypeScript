"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("./models/repository");
let genderRepository = new repository_1.Repository('Directory', 'Gender');
(() => __awaiter(this, void 0, void 0, function* () {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    yield genderRepository.createDocument({ name: 'Men', id: undefined });
    yield genderRepository.createDocument({ name: 'Women', id: undefined });
    yield genderRepository.createDocument({ name: 'None', id: undefined });
    let results = yield genderRepository.getDocuments({ query: 'SELECT * FROM root r', parameters: [] });
    console.log('Results');
    console.log(results);
    yield genderRepository.updateDocument(results[0].id, { id: results[0].id, name: 'Updated' });
    let updated = yield genderRepository.getDocument(results[0].id);
    console.log('First item after an update');
    console.log(updated);
    yield genderRepository.deleteDocument(results[0].id);
    console.log('Item deleted');
    let resultsAfterDelete = yield genderRepository.getDocuments({ query: 'SELECT * FROM root r', parameters: [] });
    console.log('Results after a delete');
    console.log(resultsAfterDelete);
}))();
